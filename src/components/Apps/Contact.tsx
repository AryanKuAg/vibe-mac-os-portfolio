"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contacts = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', role: 'Frontend Developer', favorite: true },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', role: 'UI/UX Designer', favorite: false },
    { id: 3, name: 'Alex Johnson', email: 'alex.j@example.com', phone: '+1 (555) 456-7890', role: 'Project Manager', favorite: true },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <motion.div
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toolbar */}
      <div className={`h-12 flex flex-wrap items-center px-4! border-b ${isDarkMode ? 'bg-[#3c3c3c] border-gray-700' : 'bg-[#f5f5f5] border-gray-200'}`}>
        <div className="flex space-x-2!">
          <button className={`px-2! sm:px-3! py-1! rounded-md text-xs font-medium ${activeTab === 'all' ? (isDarkMode ? 'bg-[#5a5a5a]' : 'bg-[#e0e0e0]') : 'hover:bg-opacity-50'}`} onClick={() => setActiveTab('all')}>
            All
          </button>
          <button className={`px-2! sm:px-3! py-1! rounded-md text-xs font-medium ${activeTab === 'favorites' ? (isDarkMode ? 'bg-[#5a5a5a]' : 'bg-[#e0e0e0]') : 'hover:bg-opacity-50'}`} onClick={() => setActiveTab('favorites')}>
            Favorites
          </button>
        </div>
        <div className="ml-auto! flex items-center space-x-2!">
          <div className={`relative rounded-md overflow-hidden ${isDarkMode ? 'bg-[#2c2c2c]' : 'bg-white'}`}>
            <input
              type="text"
              placeholder="Search"
              className={`pl-8! pr-3! py-1! text-sm w-24 sm:w-32 md:w-48 outline-none ${isDarkMode ? 'bg-[#2c2c2c] text-white' : 'bg-white text-gray-900'}`}
            />
            <div className="absolute left-2! top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className={`p-1! rounded-md ${isDarkMode ? 'hover:bg-[#5a5a5a]' : 'hover:bg-[#e0e0e0]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className={`sm:w-64 md:w-72 lg:w-80 border-r overflow-y-auto ${isDarkMode ? 'bg-[#2c2c2c] border-gray-700' : 'bg-[#f9f9f9] border-gray-200'} ${selectedContact ? 'hidden sm:block' : 'block'}`}>
          <div className="py-2!">
            {contacts
              .filter(contact => activeTab === 'all' || (activeTab === 'favorites' && contact.favorite))
              .map(contact => (
                <div
                  key={contact.id}
                  className={`px-4! py-2! cursor-pointer flex items-center ${isDarkMode ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#e9e9e9]'} ${selectedContact === contact.id ? (isDarkMode ? 'bg-[#4c4c4c]' : 'bg-[#e0e0e0]') : ''}`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white font-medium mr-3!`}>
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{contact.name}</div>
                    <div className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.role}</div>
                  </div>
                  {contact.favorite && (
                    <div className="ml-2! text-yellow-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Contact details or form */}
        <div className="flex-1 overflow-y-auto p-6!">
          {selectedContact ? (
            <div>
              {/* Mobile back button */}
              <div className="sm:hidden mb-4!">
                <button
                  className={`px-3! py-1! rounded-md text-xs font-medium flex items-center ${isDarkMode ? 'bg-[#3c3c3c] hover:bg-[#4c4c4c]' : 'bg-[#e0e0e0] hover:bg-[#d0d0d0]'}`}
                  onClick={() => setSelectedContact(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1!" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to contacts
                </button>
              </div>
              {/* Contact details */}
              <div className="flex flex-col sm:flex-row items-center mb-6!">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white text-3xl font-medium mb-4! sm:mb-0! sm:mr-6!`}>
                  {contacts.find(c => c.id === selectedContact)?.name.charAt(0)}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{contacts.find(c => c.id === selectedContact)?.name}</h1>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {contacts.find(c => c.id === selectedContact)?.role}
                  </p>
                </div>
                <button className={`mt-4! sm:mt-0! sm:ml-auto! p-2! rounded-full ${isDarkMode ? 'hover:bg-[#3c3c3c]' : 'hover:bg-[#e9e9e9]'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${contacts.find(c => c.id === selectedContact)?.favorite ? 'text-yellow-500' : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </div>

              {/* Contact info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4! mb-6!">
                <div className={`p-4! rounded-lg border ${isDarkMode ? 'bg-[#2c2c2c] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center mb-2!">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="font-medium">Email</h3>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {contacts.find(c => c.id === selectedContact)?.email}
                  </p>
                </div>

                <div className={`p-4! rounded-lg border ${isDarkMode ? 'bg-[#2c2c2c] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center mb-2!">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2! ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <h3 className="font-medium">Phone</h3>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {contacts.find(c => c.id === selectedContact)?.phone}
                  </p>
                </div>
              </div>

              {/* Message form */}
              <div className={`p-4! rounded-lg border ${isDarkMode ? 'bg-[#2c2c2c] border-gray-700' : 'bg-white border-gray-200'}`}>
                <h3 className="font-medium mb-3!">Send Message</h3>
                <form>
                  <div className="mb-3!">
                    <textarea
                      placeholder="Type your message here..."
                      rows={3}
                      className={`w-full px-3! py-2! rounded-md ${isDarkMode ? 'bg-[#3c3c3c] text-white border-gray-600' : 'bg-[#f9f9f9] text-gray-900 border-gray-300'} border`}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`px-4! py-2! rounded-md ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-sm font-medium`}
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4!`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2!">No Contact Selected</h2>
              <p className={`text-center max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a contact from the list to view their details or create a new contact using the + button.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
