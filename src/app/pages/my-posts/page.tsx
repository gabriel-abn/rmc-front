"use client";

import { Post, PostProps } from "@/app/feed/components/Post";
import fetch from "@/fetch/http";
import * as React from "react";

export default function MyPostsPage() {
  const [post, setPost] = React.useState<PostProps[]>(undefined!);
  const username = localStorage.getItem("username")!;

  React.useEffect(() => {
    fetch({
      url: `/user/${username}/posts`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .GET()
      .then((res) => {
        console.log(res);
        const posts = res.map((post: any) => {
          return {
            post: post.content,
            ...post,
          };
        });

        setPost(posts);
      });
  }, [username]);

  return post ? (
    <div className="flex flex-col m-5 space-y-2">
      {post.map((post, index) => (
        <Post
          key={index}
          username={username}
          avatarUrl={""}
          post={post.post}
          averageRating={123}
          tags={post.tags}
          feedbackCount={0}
        />
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
