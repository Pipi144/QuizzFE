export type TRegister = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export type TLogin = {
  email: string;
  password: string;
};
