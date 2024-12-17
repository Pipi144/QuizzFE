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
  UserList: "/api/users",
  Logout: "/api/logout",
};
export default QuizAppRoutes;
