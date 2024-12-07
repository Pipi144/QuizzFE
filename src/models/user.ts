export enum USER_ROLES {
  Admin = "Admin",
  Member = "Member",
}

export type TUserRole = {
  roleId: string;
  roleName: USER_ROLES;
  roleDescription: string;
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
  pictureUrl: string;
};

export type TUserDetail = TBasicUser & {
  gender?: string;
  birthDate?: string;
  phoneNumber?: number;
  phoneNumberVerified?: boolean;

  userRoles: TUserRole[];
};
