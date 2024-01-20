import { faker } from "@faker-js/faker";

const TrendingTopic = (props: {
  title: string;
  description: string;
  link: string;
}) => {
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
};

export default function TrendingTopics() {
  return (
    <div className="flex flex-col space-y-2 p-4 bg-slate-500 rounded-lg">
      <h3 className="text-lg font-bold">Trending Topics</h3>
      {Array.from({ length: 5 }).map((_, index) => (
        <TrendingTopic
          key={index}
          title={"#" + faker.lorem.word()}
          description={faker.lorem.lines(1)}
          link={faker.internet.url()}
        />
      ))}
    </div>
  );
}
