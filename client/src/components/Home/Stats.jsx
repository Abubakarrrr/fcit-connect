import { useEffect } from "react";
import Layout from "../shared/Layout";
import NumberTicker from "../ui/number-ticker";
import { useProjectStore } from "@/store/projectStore";

const Stats = () => {
  const { getStatistics, statistics } = useProjectStore();
  
  useEffect(() => {
    const get = async () => {
      await getStatistics();
    };
    get();
  }, []);

  const stats = [
    {
      title: "Users",
      value: statistics.totalUsers,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Projects",
      value: statistics.totalProjects,
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Views",
      value: statistics.totalViews,
      gradient: "from-pink-500 to-red-600",
    },
    {
      title: "Likes",
      value: statistics.totalLikes,
      gradient: "from-red-500 to-orange-600",
    },
  ];

  return (
    <Layout>
      <div className="pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Statistics
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Track our growing community and impact
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                relative overflow-hidden rounded-2xl
                bg-gradient-to-r from-gray-900 to-gray-800
                border border-gray-800
                p-8
                group hover:shadow-lg hover:shadow-blue-500/5
                transition-all duration-300
                hover:scale-[1.02]
              `}
            >
              {/* Gradient Orb */}
              <div className={`
                absolute -top-10 -right-10 w-32 h-32
                bg-gradient-to-r ${stat.gradient}
                rounded-full opacity-20 blur-2xl
                group-hover:opacity-30 transition-opacity duration-300
              `} />

              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  {stat.title}
                </h3>
                <div className="flex items-baseline">
                  <p className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    <NumberTicker value={stat.value} />
                  </p>
                  <span className="ml-1 text-2xl text-gray-500">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Stats;