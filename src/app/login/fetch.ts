import fetch from "@/fetch/http";

export const login = async (params: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> => {
  try {
    const response = await fetch({
      url: "/account/login",
      data: params,
    }).POST();

    return {
      accessToken: response.accessToken,
    };
  } catch (error) {
    console.log(error);
    return { accessToken: "" };
  }
};
