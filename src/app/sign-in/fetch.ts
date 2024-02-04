import fetch from "@/fetch/http";

export const signIn = async (params: {
  email: string;
  password: string;
  role: string;
  username: string;
  tags: string[];
}): Promise<{ accessToken: string }> => {
  try {
    const { email, password, role, username, tags } = params;

    console.log(params);
    const response = await fetch({
      url: "/account/sign-in",
      data: {
        email,
        password,
        role,
        username,
        tags,
      },
    }).POST();

    console.log(response);

    return {
      accessToken: response.accessToken,
    };
  } catch (error) {
    return { accessToken: "" };
  }
};
