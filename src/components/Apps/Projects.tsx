"use client";

import { motion } from 'framer-motion';

interface ProjectsProps {
  isDarkMode: boolean;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart functionality, user authentication, and payment processing.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe"],
      image: "/projects/ecommerce.jpg"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, task assignment, and progress tracking.",
      technologies: ["React", "Socket.io", "Express", "MongoDB", "Redux"],
      image: "/projects/taskmanager.jpg"
    },
    {
      title: "Social Media Dashboard",
      description: "A dashboard for managing and analyzing social media accounts across multiple platforms.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
      image: "/projects/dashboard.jpg"
    },
    {
      title: "Real Estate Listing Platform",
      description: "A platform for listing and searching real estate properties with advanced filtering and map integration.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Google Maps API"],
      image: "/projects/realestate.jpg"
    }
  ];
  
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden shadow-md ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="h-40 bg-gray-300 dark:bg-gray-700"
              style={{ 
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`px-2 py-1 rounded-full text-xs ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-200' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
