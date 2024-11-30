export const AUTHORIZED_PREFIX = "/authorized";

const QuizAppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",

  // authorized paths
  CreateQuestion: AUTHORIZED_PREFIX + "/create-question",
  QuestionList: AUTHORIZED_PREFIX + "/questions",
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
