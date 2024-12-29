export type TLoginState = {
  email?: string;
  password?: string;
  emailErrors?: string[];
  passwordErrors?: string[];
  serverErrors?: string[];
  success?: boolean;
};
export type TRegisterState = TLoginState & {
  firstName?: string;
  givenName?: string;
  lastName?: string;
  nickName?: string;
};
