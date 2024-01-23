import fetch from "@/fetch/http";

export type FeedData = {
  posts: {
    author: {
      username: string;
      avatar: string;
    };
    post: {
      content: string;
      feedbacks: number;
      tags: string[];
    };
  }[];
  user: {
    username: string;
    avatar: string;
    feedbacks: number;
    rating: number;
  };
  tags: string[];
};

export const fetchFeed = async (token: string): Promise<FeedData> => {
  const response = await fetch({
    url: "/user/feed",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).GET();

  return response;
};
