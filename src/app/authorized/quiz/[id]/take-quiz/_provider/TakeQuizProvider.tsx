"use client";
import { TQuizFullQuestions } from "@/models/quiz";

import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LOCAL_STORAGE_KEY_QUIZ = "quiz-session";
type TQuizSession = {
  timeCountdown: number | null; // saving the countdown time in seconds
  currentQuestionIdx: number;
  quizId: string;
  answers: TAnswer[]; // saving the answers of the user
};
type TAnswer = {
  questionId: string;
  selectedOptionId: string | null; // null represents unanswered
};
interface ITakeQuizContext {
  currentQuestionIdx: number;
  setCurrentQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
  isQuizStart: boolean;
  setIsQuizStart: React.Dispatch<React.SetStateAction<boolean>>;
  timeCountDown: number | null;
  setTimeCountDown: React.Dispatch<React.SetStateAction<number | null>>;
  quizInfo: TQuizFullQuestions;
  switchQuestion: (action: "prev" | "next") => void;
  setAnswers: React.Dispatch<React.SetStateAction<TAnswer[]>>;
  answers: TAnswer[];
}
type Props = PropsWithChildren & {
  quizInfo: TQuizFullQuestions;
};

const TakeQuizProvider = createContext<ITakeQuizContext | null>(null);
const TakeQuizProviderWrapper = ({ quizInfo, children }: Props) => {
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState<number | null>(
    quizInfo.timeLimit ? quizInfo.timeLimit * 60 : null //convert to seconds
  );
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<TAnswer[]>(
    quizInfo.questions.map((q) => ({
      questionId: q.id,
      selectedOptionId: null, // Initialize with null
    }))
  );
  const saveQuizSession = (quizSessionPayload: TQuizSession) => {
    // Save the updated session to local storage
    localStorage.setItem(
      LOCAL_STORAGE_KEY_QUIZ,
      JSON.stringify(quizSessionPayload)
    );
  };

  const initializeQuizSession = () => {
    const quizSessionStorage = localStorage.getItem(LOCAL_STORAGE_KEY_QUIZ);
    if (quizSessionStorage) {
      const quizSession = JSON.parse(quizSessionStorage) as TQuizSession;
      if (quizInfo.quizId !== quizSession.quizId) {
        localStorage.removeItem(LOCAL_STORAGE_KEY_QUIZ);
        return;
      }

      setTimeCountDown(quizSession.timeCountdown);
      setCurrentQuestionIdx(quizSession.currentQuestionIdx);
      setAnswers(quizSession.answers);
      setIsQuizStart(true);
    }
  };

  const switchQuestion = useCallback(
    (action: "prev" | "next") => {
      setCurrentQuestionIdx((prev) => {
        if (prev === 0 && action === "prev") return prev;
        if (prev === quizInfo.numberOfQuestions - 1 && action === "next")
          return prev;
        const newIdx = action === "prev" ? prev - 1 : prev + 1;
        return newIdx;
      });
    },
    [quizInfo.numberOfQuestions]
  );
  useEffect(() => {
    initializeQuizSession();
  }, []);

  useEffect(() => {
    if (isQuizStart) {
      const quizSession: TQuizSession = {
        timeCountdown: timeCountDown,
        currentQuestionIdx: currentQuestionIdx,
        quizId: quizInfo.quizId,
        answers,
      };
      saveQuizSession(quizSession);
    }
  }, [timeCountDown, currentQuestionIdx, answers, isQuizStart]);
  const contextVal: ITakeQuizContext = useMemo(
    () => ({
      isQuizStart,
      setIsQuizStart,
      timeCountDown,
      setTimeCountDown,
      currentQuestionIdx,
      setCurrentQuestionIdx,
      answers,
      setAnswers,
      quizInfo,
      switchQuestion,
    }),
    [
      isQuizStart,
      timeCountDown,
      currentQuestionIdx,
      answers,
      quizInfo,
      switchQuestion,
    ]
  );
  return (
    <TakeQuizProvider.Provider value={contextVal}>
      {children}
    </TakeQuizProvider.Provider>
  );
};

export const useTakeQuizContext = () => {
  if (!TakeQuizProvider)
    throw new Error(
      "useTakeQuizContext must be used within a TakeQuizProvider"
    );
  return useContext(TakeQuizProvider) as ITakeQuizContext;
};
export default TakeQuizProviderWrapper;
