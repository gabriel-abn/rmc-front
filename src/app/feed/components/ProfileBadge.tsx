import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@radix-ui/react-icons";

export default function ProfileBadge(props: {
  username: string;
  avatarUrl: string;
  averageRating: number;
  feedbacksCount: number;
}) {
  return (
    <a href="/pages/profile">
      <div className="flex flex-col space-x-4 bg-slate-500 rounded-lg">
        <div className="flex flex-row justify-start space-x-2 space-y-2 p-3">
          <Avatar>
            <AvatarImage src={props.avatarUrl} />
            <AvatarFallback>{props.username[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-bold">{props.username}</h1>
        </div>
        <div className="flex items-center justify-end space-x-1 pb-3 pr-3">
          <span className="text-sm font-semibold text-white">
            {props.averageRating}
          </span>
          <StarIcon className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-semibold text-white pl-4">
            {props.feedbacksCount}
          </span>
        </div>
      </div>
    </a>
  );
}
