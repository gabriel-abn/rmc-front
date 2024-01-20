import fetch from "@/fetch/http";

export const signIn = async (params: {
  email: string;
  password: string;
  role: string;
}): Promise<{ accessToken: string }> => {
  try {
    const { email, password, role } = params;

    const response = await fetch({
      url: "/account/sign-in",
      data: { email, password, role },
    }).POST();

    return {
      accessToken: response.accessToken,
    };
  } catch (error) {
    return { accessToken: "" };
  }
};
