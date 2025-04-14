"use client";

import { motion } from 'framer-motion';

interface AboutMeProps {
  isDarkMode: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ isDarkMode }) => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold mb-4">John Doe</h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-6">MERN Stack Developer</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">About Me</h3>
        <p className="mb-4">
          Passionate MERN stack developer with 4 years of experience building scalable web applications.
          Specialized in creating responsive, user-friendly interfaces with React and implementing
          robust backend solutions with Node.js, Express, and MongoDB.
        </p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 
            'Redux', 'Tailwind CSS', 'GraphQL', 'REST API', 'Git', 'AWS', 'Docker'].map((skill, index) => (
            <span 
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        <div className="mb-4">
          <h4 className="font-medium">Senior Frontend Developer</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">TechCorp Inc. • 2022 - Present</p>
          <p className="mt-2">
            Led the development of responsive web applications using React and Next.js.
            Implemented state management with Redux and integrated with RESTful APIs.
          </p>
        </div>
        <div className="mb-4">
          <h4 className="font-medium">Full Stack Developer</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">WebSolutions • 2020 - 2022</p>
          <p className="mt-2">
            Developed and maintained full-stack applications using the MERN stack.
            Designed and implemented database schemas and RESTful APIs.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        <div>
          <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">University of Technology • 2016 - 2020</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutMe;
