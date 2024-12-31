export const AUTHORIZED_PREFIX = "/authorized";
const QuizAppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",

  // authorized paths
  QuestionList: AUTHORIZED_PREFIX + "/questions",
  Users: AUTHORIZED_PREFIX + "/users",
  Quiz: AUTHORIZED_PREFIX + "/quiz",
  AddQuiz: AUTHORIZED_PREFIX + "/quiz/create",
};

export const Unauthorized_Routes = [
  QuizAppRoutes.Login,
  QuizAppRoutes.Register,
  QuizAppRoutes.Home,
];

export const QuizAPIRoutes = {
  UserList: process.env.URL + "/api/user",
  Logout: "/api/logout",
  DeleteUser: "/api/user/delete",
  Questions: process.env.URL + "/api/question",
  CurrentUser: process.env.URL + "/api/user/current-info",
  AddQuestion: "api/question",
};
export default QuizAppRoutes;
