"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TBasicQuestion } from "@/models/question";
import { TPaginatedResponse } from "@/models/ServerResponse";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { produce } from "immer";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import { getQuestionsWithFilter } from "../actions";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  selectedQuestions: TBasicQuestion[];
  setSelectedQuestions: React.Dispatch<React.SetStateAction<TBasicQuestion[]>>;
};

const SelectQuestions = ({
  selectedQuestions,
  setSelectedQuestions,
}: Props) => {
  const [openSelectQuestions, setOpenSelectQuestions] = useState(false);
  const [questionResponse, setQuestionResponse] = useState<
    TPaginatedResponse<TBasicQuestion> | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const fetchQuestions = useCallback(async () => {
    setIsFetching(true);
    try {
      const questionListResp = await getQuestionsWithFilter({
        search: searchText,
        page: 0,
      });
      if (questionListResp) {
        console.log("SEARCH:", searchText);
        console.log("questionListResp", questionListResp);

        setQuestionResponse(questionListResp);
      }
    } catch (error) {
      console.log("ERROR FAILED fetchQuestions:", error);
    } finally {
      setIsFetching(false);
    }
  }, [searchText]);

  const totalPage = questionResponse
    ? Math.ceil(questionResponse.totalCount / questionResponse.pageSize)
    : undefined;
  const hasMore =
    questionResponse && totalPage ? questionResponse?.page < totalPage : false;

  const handleLoadmore = async () => {
    try {
      if (!questionResponse?.page || !hasMore) return;
      const questionListResp = await getQuestionsWithFilter({
        search: searchText,
        page: questionResponse?.page,
      });
      if (questionListResp) {
        setQuestionResponse(
          produce((draft) => {
            if (draft) {
              draft.items = draft.items.concat(questionListResp.items);
              draft.page = questionListResp.page;
              return draft;
            }
          })
        );
      }
    } catch (error) {
      console.log("ERROR FAILED handleLoadmore:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuestionResponse(undefined);
      fetchQuestions();
    }, 200);
    return () => clearTimeout(timeout);
  }, [fetchQuestions]);

  return (
    <div className="flex-col flex space-y-1.5">
      <Label className="">Questions</Label>

      <Popover open={openSelectQuestions} onOpenChange={setOpenSelectQuestions}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openSelectQuestions}
            className="w-full justify-between bg-transparent"
          >
            Select questions...
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 max-w-xs">
          <Command className="!max-w-sm w-full min-w-56 p-0">
            <div className="w-full flex flex-row items-center p-3">
              <Search className="mr-2 text-slate-400 text-sm" />
              <Input
                placeholder="Search framework..."
                className="h-9 font-concert text-sm text-black p-0 border-none !outline-none !ring-0 !focus:ring-0 !focus:outline-none shadow-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {isFetching && <Spinner className="size-2 text-slate-400" />}
            </div>

            <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <CommandEmpty>No question found.</CommandEmpty>
              <CommandGroup>
                {questionResponse?.items.map((q) => (
                  <CommandItem
                    key={q.id}
                    value={q.id}
                    onSelect={(currentValue) => {}}
                    className="w-full cursor-pointer hover:font-medium text-sm font-normal truncate"
                  >
                    {q.questionText}
                    <Check
                      className={cn(
                        "ml-auto",
                        Boolean(
                          selectedQuestions.find(
                            (selectedQ) => q.id === selectedQ.id
                          )
                        )
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Button
                      className="rounded-full text-xs px-2 py-1 h-fit"
                      onClick={handleLoadmore}
                    >
                      Load more
                    </Button>
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectQuestions;
