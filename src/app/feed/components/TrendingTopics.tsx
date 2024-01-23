interface TrendingTopicProps {
  title: string;
  description: string;
  link: string;
}

export default function TrendingTopic(props: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <div className="flex flex-col space-y-1 bg-slate-800 rounded-md p-2">
      <a
        href={props.link}
        className="text-sm font-extrabold text-white hover:underline"
      >
        {props.title}
      </a>
      <p className="text-sm text-white">{props.description}</p>
    </div>
  );
}
