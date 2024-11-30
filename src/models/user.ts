export enum USER_ROLES {
  Admin = "Admin",
  Member = "Member",
}

export type TUserRole = {
  id: string;
  name: USER_ROLES;
  description: string;
};

export type TBasicUser = {
  userId: string;
  name?: string;
  nickName?: string;
  familyName?: string;
  givenName?: string;
  email?: string;
  emailVerified: boolean;
  updatedAt?: string;
  pictureUrl?: string;
};

export type TUserDetail = TBasicUser & {
  gender?: string;
  birthDate?: string;
  phoneNumber?: number;
  phoneNumberVerified?: boolean;

  userRoles: TUserRole[];
};
