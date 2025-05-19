import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { ChartContainer, ChartTooltipContent } from "./chart";
import { Bar, Cell, Pie } from "recharts";
import {
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useProjectStore } from "@/store/projectStore";

// Dummy data based on the provided JSON structure
// const generateDummyProjects = () => {
//   const campuses = ["OC", "NC"];
//   const departments = [
//     "Software Engineering",
//     "Computer Science",
//     "Data Science",
//     "Artificial Intelligence",
//     "Cybersecurity",
//   ];
//   const categories = [
//     "Web Development",
//     "Mobile Development",
//     "AI/ML",
//     "IoT",
//     "Blockchain",
//     "Game Development",
//   ];
//   const years = ["2020", "2021", "2022", "2023", "2024"];

//   const projects = [];

//   // Generate 100 random projects
//   for (let i = 0; i < 100; i++) {
//     const year = years[Math.floor(Math.random() * years.length)];
//     const campus = campuses[Math.floor(Math.random() * campuses.length)];
//     const department =
//       departments[Math.floor(Math.random() * departments.length)];
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     const likes = Math.floor(Math.random() * 50);
//     const views = Math.floor(Math.random() * 100) + 20;

//     projects.push({
//       _id: { $oid: `project_${i}` },
//       title: `Project ${i}`,
//       description: `Description for project ${i}`,
//       campus,
//       department,
//       year,
//       category,
//       supervisor: `Dr. ${String.fromCharCode(
//         65 + Math.floor(Math.random() * 26)
//       )}`,
//       githubLink: "http://github.com/example",
//       thumbnail: "https://example.com/thumbnail.jpg",
//       likes: { $numberInt: likes.toString() },
//       views: { $numberInt: views.toString() },
//       createdByAdmin: Math.random() > 0.5,
//       status: Math.random() > 0.3 ? "Approved" : "Pending",
//       created_at: { $date: { $numberLong: Date.now().toString() } },
//     });
//   }

//   return projects;
// };

// const dummyProjects = generateDummyProjects();

const AdminDashboard = () => {
  const { allProjects, sudo_getAllProjects } = useProjectStore();
  const { toast } = useToast();

  const [selectedYear, setSelectedYear] = useState("2025");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const availableYears = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
  ];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true);
      try {
        await sudo_getAllProjects();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Fetching Projects",
          description: "",
        });
      }
    };
    getProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on selected year
    if (!isLoading && allProjects?.length > 0) {
      const filtered = allProjects.filter(
        (project) => project.year === selectedYear
      );
      setFilteredProjects(filtered);
    }
  }, [selectedYear]);

  // Calculate statistics
  const totalProjects = filteredProjects.length;
  const totalLikes = filteredProjects.reduce(
    (sum, project) => sum + Number.parseInt(project.likes || 0),
    0
  );
  const totalViews = filteredProjects.reduce(
    (sum, project) => sum + Number.parseInt(project.views || 0),
    0
  );

  // Campus-wise data
  const campusData = filteredProjects.reduce((acc, project) => {
    const campus = project.campus;
    acc[campus] = (acc[campus] || 0) + 1;
    return acc;
  }, {});

  const campusChartData = Object.keys(campusData).map((campus) => ({
    name: campus,
    value: campusData[campus],
  }));

  // Department-wise data
  const departmentData = filteredProjects.reduce((acc, project) => {
    const dept = project.department;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const departmentChartData = Object.keys(departmentData).map((dept) => ({
    name: dept,
    value: departmentData[dept],
  }));

  // Category-wise data
  const categoryData = filteredProjects.reduce((acc, project) => {
    const category = project.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Top supervisors data
  const supervisorData = filteredProjects.reduce((acc, project) => {
    const supervisor = project.supervisor;
    if (!acc[supervisor]) {
      acc[supervisor] = {
        count: 0,
        likes: 0,
        views: 0,
      };
    }
    acc[supervisor].count++;
    acc[supervisor].likes += Number.parseInt(project.likes || 0);
    acc[supervisor].views += Number.parseInt(project.views || 0);
    return acc;
  }, {});

  // Sort supervisors by project count and take top 5
  const topSupervisors = Object.entries(supervisorData)
    .map(([name, data]) => ({
      name,
      projects: data.count,
      likes: data.likes,
      views: data.views,
    }))
    .sort((a, b) => b.projects - a.projects)
    .slice(0, 5);

  // COLORS for pie charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard Statistics</h1>

        {/* Year Selector */}
        <div className="mb-8">
          <Tabs
            defaultValue={selectedYear}
            onValueChange={setSelectedYear}
            className="w-full"
          >
            <TabsList className="grid md:grid-cols-7 grid-cols-4 h-fit">
              {availableYears.map((year) => (
                <TabsTrigger key={year} value={year}>
                  {year}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                For year {selectedYear}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalLikes}</div>
              <p className="text-xs text-muted-foreground">
                Across all projects in {selectedYear}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalViews}</div>
              <p className="text-xs text-muted-foreground">
                Across all projects in {selectedYear}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Campus Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Campus Distribution</CardTitle>
              <CardDescription>
                Projects by campus in {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Projects",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <RechartsPieChart>
                  <Pie
                    data={campusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {campusChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>
                Projects by department in {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Projects",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <RechartsBarChart data={departmentChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(" ")[0]}
                  />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>
                Projects by category in {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Projects",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <RechartsPieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </RechartsPieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Engagement by Department */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement by Department</CardTitle>
              <CardDescription>
                Average likes and views per project by department in{" "}
                {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  avgLikes: {
                    label: "Avg. Likes",
                    color: "hsl(var(--chart-4))",
                  },
                  avgViews: {
                    label: "Avg. Views",
                    color: "hsl(var(--chart-7))",
                  },
                }}
              >
                <RechartsBarChart
                  data={Object.keys(departmentData).map((dept) => {
                    const deptProjects = filteredProjects.filter(
                      (p) => p.department === dept
                    );
                    const totalLikes = deptProjects.reduce(
                      (sum, p) =>
                        sum + Number.parseInt(p.likes || 0),
                      0
                    );
                    const totalViews = deptProjects.reduce(
                      (sum, p) =>
                        sum + Number.parseInt(p.views || 0),
                      0
                    );
                    const count = deptProjects.length;

                    return {
                      name: dept.split(" ")[0], // Abbreviate department name
                      avgLikes: count
                        ? Math.round((totalLikes / count) * 10) / 10
                        : 0,
                      avgViews: count
                        ? Math.round((totalViews / count) * 10) / 10
                        : 0,
                      fullName: dept, // Store full name for tooltip
                    };
                  })}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="font-medium">{data.fullName}</div>
                            <div className="grid gap-1 mt-2">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-[var(--color-avgLikes)]" />
                                  <div className="text-xs text-muted-foreground">
                                    Avg. Likes
                                  </div>
                                </div>
                                <div className="text-xs font-medium">
                                  {data.avgLikes}
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1">
                                  <div className="h-2 w-2 rounded-full bg-[var(--color-avgViews)]" />
                                  <div className="text-xs text-muted-foreground">
                                    Avg. Views
                                  </div>
                                </div>
                                <div className="text-xs font-medium">
                                  {data.avgViews}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="avgLikes"
                    fill="var(--color-avgLikes)"
                    radius={4}
                  />
                  <Bar
                    dataKey="avgViews"
                    fill="var(--color-avgViews)"
                    radius={4}
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Supervisors */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Supervisors</CardTitle>
              <CardDescription>
                Supervisors with the most projects in {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  projects: {
                    label: "Projects",
                    color: "hsl(var(--chart-7))",
                  },
                  likes: {
                    label: "Likes",
                    color: "hsl(var(--chart-5))",
                  },
                }}
              >
                <RechartsBarChart data={topSupervisors} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="projects"
                    fill="var(--color-projects)"
                    radius={4}
                  />
                  <Bar dataKey="likes" fill="var(--color-likes)" radius={4} />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Status Distribution */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
              <CardDescription>
                Approved vs Pending projects in {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  approved: {
                    label: "Approved",
                    color: "hsl(var(--chart-5))",
                  },
                  pending: {
                    label: "Pending",
                    color: "hsl(var(--chart-6))",
                  },
                  rejected: {
                    label: "Rejected",
                    color: "hsl(var(--chart-8))",
                  },
                }}
              >
                <RechartsBarChart
                  data={[
                    {
                      name: "Status",
                      approved: filteredProjects.filter(
                        (p) => p.status === "Approved"
                      ).length,
                      pending: filteredProjects.filter(
                        (p) => p.status === "Pending"
                      ).length,
                      rejected: filteredProjects.filter(
                        (p) => p.status === "Rejected"
                      ).length,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="approved"
                    fill="var(--color-approved)"
                    radius={4}
                  />
                  <Bar
                    dataKey="pending"
                    fill="var(--color-pending)"
                    radius={4}
                  />
                  <Bar
                    dataKey="rejected"
                    fill="var(--color-rejected)"
                    radius={4}
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
