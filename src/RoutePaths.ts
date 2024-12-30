export const AUTHORIZED_PREFIX = "/authorized";
export const USERS_BASE_ROUTE = AUTHORIZED_PREFIX + "/users";
const QuizAppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",

  // authorized paths
  CreateQuestion: AUTHORIZED_PREFIX + "/create-question",
  QuestionList: AUTHORIZED_PREFIX + "/questions",

  //User routes
  Users: USERS_BASE_ROUTE,
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
};
export default QuizAppRoutes;
