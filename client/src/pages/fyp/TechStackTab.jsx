import { Layout, Server, Database, Brain, Cloud, TestTube } from 'lucide-react';

const userTechStack = {
    frontend: ['React', 'Next.js', 'Tailwind CSS'],
    backend: ['Node.js', 'Express'],
    database: ['MongoDB', 'PostgreSQL'],
    aiLibraries: ['TensorFlow', 'PyTorch'],
    devOps: ['Docker', 'Kubernetes'],
    testing: ['Jest', 'Cypress']
  };
  
export default function TechStack() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TechCategory title="Frontend" Icon={Layout} technologies={userTechStack.frontend} />
        <TechCategory title="Backend" Icon={Server} technologies={userTechStack.backend} />
        <TechCategory title="Database" Icon={Database} technologies={userTechStack.database} />
        <TechCategory title="AI Libraries" Icon={Brain} technologies={userTechStack.aiLibraries} />
        <TechCategory title="DevOps" Icon={Cloud} technologies={userTechStack.devOps} />
        <TechCategory title="Testing" Icon={TestTube} technologies={userTechStack.testing} />
      </div>
    </div>
  );
}


function TechCategory({ title, Icon, technologies }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 mr-2 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {technologies.map((tech, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

