type Profile = {
  firstName: string;
  lastName: string;
  avatar: string;
};

type User = {
  userId: string;
  profile: Profile;
  email: string;
  password: string;
  username: string;
  emailVerified: boolean;
  role: string;
  roleId?: string;
  tags: string[];
};

export type { Profile, User };
