const QuizAppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  CreateQuestion: "/create-question",
  QuestionList: "/questions",
};

export const QuizAPIRoutes = {
  login: "/api/auth/login",
  logout: "api/auth/logout",
  userProfile: "api/auth/me",
};
export const Authorized_Routes = [
  QuizAppRoutes.QuestionList,
  QuizAppRoutes.CreateQuestion,
];
export default QuizAppRoutes;
