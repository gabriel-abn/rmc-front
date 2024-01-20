import { ScrollArea } from "@/components/ui/scroll-area";
import { faker } from "@faker-js/faker";
import { Post } from "./components/Post";
import ProfileBadge from "./components/ProfileBadge";
import TrendingTopics from "./components/TrendingTopics";

const posts = Array.from({ length: 10 }).map((_, index) => ({
  username: faker.internet.userName(),
  avatarUrl: faker.internet.avatar(),
  post: faker.lorem.paragraph(),
  averageRating: Math.floor(Math.random() * 5) + 1,
  feedbackCount: Math.floor(Math.random() * 100) + 1,
  tags: Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map(() => {
    return faker.lorem.word();
  }),
}));

export default function FeedPage() {
  return (
    <div className="flex flex-row justify-between p-5 space-x-4">
      <div className="w-1/4">
        <ProfileBadge
          username={faker.internet.userName()}
          avatarUrl={faker.internet.avatar()}
          averageRating={Math.floor(Math.random() * 5) + 1}
          feedbacksCount={Math.floor(Math.random() * 100) + 1}
        />
      </div>

      <ScrollArea className="w-1/2 space-y-2 h-144 rounded-lg bg-slate-400 p-4">
        <div className="space-y-2">
          {posts.map((post, index) => (
            <Post
              key={index}
              username={post.username}
              avatarUrl={post.avatarUrl}
              post={post.post}
              averageRating={post.averageRating}
              feedbackCount={post.feedbackCount}
              tags={post.tags}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="w-1/4">
        <TrendingTopics />
      </div>
    </div>
  );
}
