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
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Chrome-like website header */}
      <header className={`py-6 px-8 border-b ${isDarkMode ? 'border-gray-700 bg-[#292a2d]' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-3">
                P
              </div>
              <h1 className="text-2xl font-bold">Portfolio</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className={`font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Home</a>
              <a href="#" className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projects</a>
              <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>About</a>
              <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Contact</a>
            </nav>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-3">My Projects</h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Here are some of the projects I&apos;ve worked on as a MERN stack developer with 4 years of experience.
            </p>
          </div>
        </div>
      </header>

      <div className="py-10 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-xl overflow-hidden shadow-lg ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)' }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="h-52 bg-gray-300 dark:bg-gray-700 relative"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/20' : 'bg-white/10'}`}></div>

              {/* Project type badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode
                    ? 'bg-blue-500/80 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  Web App
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className={`text-sm mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>

              <div className="mb-5">
                <h4 className={`text-xs uppercase font-semibold mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        isDarkMode
                          ? 'bg-gray-700 text-blue-300'
                          : 'bg-gray-100 text-blue-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    2023
                  </span>
                </div>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}>
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Website footer */}
      <footer className={`py-8 px-8 mt-10 border-t ${isDarkMode ? 'border-gray-700 bg-[#292a2d]' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-2">
                  P
                </div>
                <h3 className="font-bold">Portfolio</h3>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showcasing my work as a MERN stack developer with 4 years of experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Projects</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Technologies</h4>
              <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#" className="hover:underline">React</a></li>
                <li><a href="#" className="hover:underline">Node.js</a></li>
                <li><a href="#" className="hover:underline">MongoDB</a></li>
                <li><a href="#" className="hover:underline">Express</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2023 Portfolio. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Terms of Service</a>
                </li>
                <li>
                  <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Projects;
