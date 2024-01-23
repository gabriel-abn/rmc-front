"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./components/Post";
import ProfileBadge from "./components/ProfileBadge";
import TrendingTopic from "./components/TrendingTopics";
import { FeedData, fetchFeed } from "./fetch";

export default function FeedPage() {
  const [feed, setFeed] = useState<FeedData>(undefined!);
  let token = sessionStorage.getItem("accessToken")!;

  useEffect(() => {
    if (!token) return;

    fetchFeed(token).then((res) => {
      setFeed(res);
      console.log(res);
    });
  }, [token]);

  return feed ? (
    <div className="flex flex-row justify-between p-5 space-x-4">
      <div className="w-1/4">
        <ProfileBadge
          username={feed.user.username}
          avatarUrl={feed.user.avatar}
          averageRating={feed.user.rating}
          feedbacksCount={feed.user.feedbacks}
        />
        <div className="flex flex-row justify-between mt-1">
          <Button className="w-full mr-1">
            <Link href="/my-posts">My Posts</Link>
          </Button>

          <Button className="w-full ml-1">
            <Link href="/my-feedbacks">My Feedbacks</Link>
          </Button>
        </div>

        <Button className="w-full mt-1">
          <Link href="/make-post">Make Post</Link>
        </Button>
      </div>

      <ScrollArea className="w-1/2 space-y-2 h-144 rounded-lg bg-slate-400 p-4">
        <div className="space-y-2">
          {feed.posts.map(({ author, post }, index) => (
            <Post
              key={index}
              username={author.username}
              avatarUrl={author.avatar}
              post={post.content}
              averageRating={123}
              feedbackCount={post.feedbacks}
              tags={post.tags}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="w-1/4">
        <div className="flex flex-col space-y-2 p-4 bg-slate-500 rounded-lg">
          <h3 className="text-lg font-bold">Trending Topics</h3>
          {feed.tags.map((tag, index) => (
            <TrendingTopic
              key={index}
              description={faker.lorem.sentence()}
              link={"https://www.google.com/search?q=" + tag.replace("-", "+")}
              title={tag}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
