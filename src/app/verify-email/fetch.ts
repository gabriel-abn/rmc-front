import fetch from "@/fetch/http";

export const verifyEmail = async (params: {
  email: string;
  code: string;
}): Promise<{ isVerified: boolean; message: string }> => {
  try {
    const { email, code } = params;

    const response = await fetch({
      url: "/account/verify-email",
      data: { email, token: code },
    }).POST();

    if (response.isVerified) {
      return { isVerified: true, message: response.message };
    }

    return { isVerified: false, message: response.error };
  } catch (error) {
    return { isVerified: false, message: "Unknown error." };
  }
};
