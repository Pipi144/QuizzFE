export type TRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type TLoginState = {
  email?: string;
  password?: string;
  emailErrors?: string[];
  passwordErrors?: string[];
  serverErrors?: string[];
};
