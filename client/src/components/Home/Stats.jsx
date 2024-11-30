import Layout from "../shared/Layout";
import NumberTicker from "../ui/number-ticker";

function NumberTickerDemo() {
  return (
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={100} />
    </p>
  );
}
const statsData = [
  {
    title: "Users",
    value: 100,
  },
  {
    title: "Projects",
    value: 10,
  },
  {
    title: "Views",
    value: 279,
  },
  {
    title: "Likes",
    value: 91,
  },
];

const Stats = () => {
  return (
    <Layout>
      <div >
        <h2 className="text-5xl text-center font-bold text-gray-900 dark:text-white">
          Statistics
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        {statsData.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[#06B6D4] p-6 dark:bg-gray-800"
          >
            <h2 className="text-2xl font-bold text-white">{stat.title}</h2>
            <p className="whitespace-pre-wrap text-5xl font-medium tracking-tighter text-white dark:text-white te">
              <NumberTicker value={stat.value} className={"text-white"} />+
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Stats;
