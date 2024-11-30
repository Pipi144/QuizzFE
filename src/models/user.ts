export enum USER_ROLES {
  Admin = "Admin",
  Member = "Member",
}

export type TUserRole = {
  id: string;
  name: USER_ROLES;
  description: string;
};

export type TUser = {
  name?: string;
  nickName?: string;
  familyName?: string;
  givenName?: string;
  middleName?: string;
  email?: string;
  emailVerified: boolean;
  gender?: string;
  birthDate?: string;
  phoneNumber?: number;
  phoneNumberVerified?: boolean;
  updateAt?: string;
  userRoles: TUserRole[];
};
