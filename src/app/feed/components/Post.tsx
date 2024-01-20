import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export type PostProps = {
  username: string;
  avatarUrl: string;
  post: string;
  averageRating: number;
  feedbackCount: number;
  tags: string[];
};

const StarRating = (props: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < props.rating) {
      stars.push(
        <span key={i} className="text-yellow-500">
          &#9733;
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          &#9733;
        </span>
      );
    }
  }
  return <div>{stars}</div>;
};

export const Post = (props: PostProps) => {
  return (
    <div className="bg-slate-800 rounded-lg p-3 space-y-1">
      <div className="flex items-center mb-2">
        <Avatar>
          <AvatarImage src={props.avatarUrl} />
          <AvatarFallback>{props.username[0]}</AvatarFallback>
        </Avatar>
        <h3 className="text-white ml-2">{props.username}</h3>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-gray-800">{props.post}</p>
      </div>
      <div className="flex justify-between">
        <div className="space-x-1">
          {props.tags.map((tag, index) => {
            return (
              <Badge key={index} className="mt-2">
                {tag}
              </Badge>
            );
          })}
        </div>
        <div className="flex flex-row mt-2 space-x-4">
          <StarRating rating={props.averageRating} />
          <span className="text-white">
            {props.feedbackCount}
            <ChatBubbleIcon className="inline-block w-4 h-4 ml-1 text-white" />
          </span>
        </div>
      </div>
    </div>
  );
};
