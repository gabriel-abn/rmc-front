import fetch from "@/fetch/http";

export type ProfileProps = {
  username: string;
  email: string;
  tags: string[];
  bio: string;
};

export const fetchUser = async (token: string) => {
  try {
    const profile = await fetch({
      url: "/account/profile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).GET();

    return profile;
  } catch (e) {
    console.log(e);
  }
};
