"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface AboutMeProps {
  isDarkMode: boolean;
}

const AboutMe: React.FC<AboutMeProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('profile');

  // Skills data with categories
  const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'HTML5/CSS3', 'JavaScript ES6+'],
    backend: ['Node.js', 'Express', 'MongoDB', 'GraphQL', 'REST API', 'Firebase'],
    tools: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Webpack', 'Figma']
  };

  // Experience data
  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Led the development of responsive web applications using React and Next.js. Implemented state management with Redux and integrated with RESTful APIs. Collaborated with UX/UI designers to create intuitive user interfaces.'
    },
    {
      title: 'Full Stack Developer',
      company: 'WebSolutions',
      period: '2020 - 2022',
      description: 'Developed and maintained full-stack applications using the MERN stack. Designed and implemented database schemas and RESTful APIs. Optimized application performance and implemented security best practices.'
    },
    {
      title: 'Junior Web Developer',
      company: 'Digital Creations',
      period: '2019 - 2020',
      description: 'Assisted in the development of web applications using JavaScript and React. Collaborated with senior developers to implement new features and fix bugs.'
    }
  ];

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* TextEdit-like toolbar */}
      <div className={`h-10 flex items-center px-4! border-b ${isDarkMode ? 'bg-[#3c3c3c] border-gray-700' : 'bg-[#f5f5f5] border-gray-200'}`}>
        <div className="flex space-x-1!">
          <button
            className={`px-3! py-1! rounded-md text-xs font-medium ${activeTab === 'profile' ? (isDarkMode ? 'bg-[#5a5a5a]' : 'bg-[#e0e0e0]') : 'hover:bg-opacity-50'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`px-3! py-1! rounded-md text-xs font-medium ${activeTab === 'skills' ? (isDarkMode ? 'bg-[#5a5a5a]' : 'bg-[#e0e0e0]') : 'hover:bg-opacity-50'}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`px-3! py-1! rounded-md text-xs font-medium ${activeTab === 'experience' ? (isDarkMode ? 'bg-[#5a5a5a]' : 'bg-[#e0e0e0]') : 'hover:bg-opacity-50'}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-6!">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto!"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8!">
              {/* Profile image */}
              <div className={`w-32 h-32 rounded-full overflow-hidden mb-4! md:mb-0! md:mr-6! flex-shrink-0 border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="relative w-full h-full">
                  <Image
                    src="/Aryan_Profile_Picture.jpeg"
                    alt="Aryan Kumar"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name and title */}
              <div>
                <h1 className="text-3xl font-bold mb-2!">Aryan Kumar</h1>
                <h2 className={`text-xl mb-4! ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>MERN Stack Developer</h2>
                <div className="flex flex-wrap items-center mb-4!">
                  <div className="flex items-center mr-4! mb-2!">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1! ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center mr-4! mb-2!">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1! ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">aryan.kumar@example.com</span>
                  </div>
                  <div className="flex items-center mb-2!">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1! ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About section */}
            <div className={`p-6! rounded-lg mb-6! ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4! flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About Me
              </h3>
              <p className="leading-relaxed">
                Passionate MERN stack developer with 4 years of experience building scalable web applications.
                Specialized in creating responsive, user-friendly interfaces with React and implementing
                robust backend solutions with Node.js, Express, and MongoDB.
              </p>
              <p className="leading-relaxed mt-4!">
                I thrive in collaborative environments and enjoy solving complex problems with elegant solutions.
                My approach combines technical expertise with a strong focus on user experience, ensuring that
                the applications I build are not only functional but also intuitive and enjoyable to use.
              </p>
            </div>

            {/* Education section */}
            <div className={`p-6! rounded-lg ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4! flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education
              </h3>
              <div className="border-l-2 border-gray-300 pl-4! ml-2!">
                <div className="mb-4!">
                  <h4 className="font-medium">Bachelor of Science in Computer Science</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>University of Technology • 2016 - 2020</p>
                  <p className="mt-2! text-sm">
                    Graduated with honors. Specialized in web development and software engineering.
                    Completed a capstone project building a full-stack e-commerce platform.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Full Stack Web Development Certification</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tech Bootcamp • 2019</p>
                  <p className="mt-2! text-sm">
                    Intensive 12-week program focused on modern web development technologies and practices.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto!"
          >
            <h2 className="text-2xl font-bold mb-6!">Technical Skills</h2>

            {/* Frontend skills */}
            <div className={`p-6! rounded-lg mb-6! ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4! flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Frontend Development
              </h3>
              <div className="flex flex-wrap gap-2!">
                {skills.frontend.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3! py-1! rounded-md text-sm font-medium ${
                      isDarkMode
                        ? 'bg-blue-900/30 text-blue-200 border border-blue-800/50'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend skills */}
            <div className={`p-6! rounded-lg mb-6! ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4! flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                Backend Development
              </h3>
              <div className="flex flex-wrap gap-2!">
                {skills.backend.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3! py-1! rounded-md text-sm font-medium ${
                      isDarkMode
                        ? 'bg-green-900/30 text-green-200 border border-green-800/50'
                        : 'bg-green-50 text-green-700 border border-green-100'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools and technologies */}
            <div className={`p-6! rounded-lg ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
              <h3 className="text-lg font-semibold mb-4! flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-2!">
                {skills.tools.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3! py-1! rounded-md text-sm font-medium ${
                      isDarkMode
                        ? 'bg-purple-900/30 text-purple-200 border border-purple-800/50'
                        : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto!"
          >
            <h2 className="text-2xl font-bold mb-6!">Professional Experience</h2>

            <div className="space-y-6!">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className={`p-6! rounded-lg ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4!">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{job.company}</p>
                    </div>
                    <div className={`mt-2! sm:mt-0! px-3! py-1! rounded-full text-xs font-medium inline-block sm:text-right ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      {job.period}
                    </div>
                  </div>
                  <p className="leading-relaxed">{job.description}</p>
                </div>
              ))}
            </div>

            {/* Projects section */}
            <div className="mt-8!">
              <h2 className="text-2xl font-bold mb-6!">Featured Projects</h2>

              <div className={`p-6! rounded-lg mb-6! ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                <h3 className="text-lg font-semibold">E-commerce Platform</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3!`}>Full-stack MERN application</p>
                <p className="mb-4!">
                  Developed a complete e-commerce solution with user authentication, product catalog, shopping cart, and payment processing.
                  Implemented responsive design and optimized for performance across devices.
                </p>
                <div className="flex flex-wrap gap-2!">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API'].map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2! py-1! rounded-md text-xs ${
                        isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-6! rounded-lg ${isDarkMode ? 'bg-[#2c2c2c] border border-gray-700' : 'bg-white border border-gray-200'} shadow-sm`}>
                <h3 className="text-lg font-semibold">Task Management Dashboard</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3!`}>React application with GraphQL</p>
                <p className="mb-4!">
                  Built a real-time task management system with drag-and-drop functionality, user roles, and analytics.
                  Implemented GraphQL for efficient data fetching and WebSockets for real-time updates.
                </p>
                <div className="flex flex-wrap gap-2!">
                  {['React', 'GraphQL', 'Apollo', 'TypeScript', 'Material UI', 'Chart.js'].map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2! py-1! rounded-md text-xs ${
                        isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutMe;
