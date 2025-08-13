
// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import ReactDOM from 'react-dom';
import Achievements from './pages/Achievements';
import Achieve_Details from './pages/Achieve_Details';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from './components/Navbar.jsx';
import {
  GraduationCap,
  Calendar,
  Microscope,
  Library,
  Users,
  Briefcase,
  MapPin,
  Trophy,
  Globe,
  HeadphonesIcon,
  BookOpen,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Portal wrapper
const DropdownPortal = ({ children }) => ReactDOM.createPortal(children, document.body);

const App = () => {
  const navItems = [
    { name: 'Home', link: 'https://aucse.vercel.app/' },
    { name: 'About', link: 'https://www.aucse.in/About-Us' },
    { name: 'Notice', link: 'https://aucse.vercel.app/notice' },
    { name: 'Programs', link: 'https://www.aucse.in/programs' },
    { name: 'Calendar', link: 'https://www.aucse.in/calendar' },
    { name: 'Our Team', link: 'https://aucse.vercel.app/dev' },
    { name: 'Contact Us', link: 'https://aucse.vercel.app/contact' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const dropdownSections = [
    {
      title: 'Academic',
      gradient: 'from-indigo-600 to-indigo-800',
      items: [
        { name: 'Faculty', link: 'https://www.aucse.in/people', icon: GraduationCap, description: 'Meet our expert faculty' },
        { name: 'Timetable', link: 'https://www.aucse.in/timetable', icon: Calendar, description: 'Class schedules & timing' },
        { name: 'Research', link: 'https://www.aucse.in/more/research', icon: Microscope, description: 'Cutting-edge research' },
        { name: 'Library', link: '#', icon: Library, description: 'Digital & physical resources' },
      ],
    },
    {
      title: 'Student Life',
      gradient: 'from-blue-600 to-blue-800',
      items: [
        { name: 'Alumni', link: 'https://www.aucse.in/people/alumni', icon: Users, description: 'Connect with graduates' },
        { name: 'Placements', link: 'https://www.aucse.in/more/placement', icon: Briefcase, description: 'Career opportunities' },
        { name: 'Campus Life', link: '#', icon: MapPin, description: 'Student activities & events' },
        { name: 'Achievements', link: '#', icon: Trophy, description: 'Student accomplishments' },
      ],
    },
    {
      title: 'Resources',
      gradient: 'from-green-400 to-green-600',
      items: [
        { name: 'Explore', link: 'https://www.aucse.in/more', icon: Globe, description: 'Discover more features' },
        { name: 'Our Team', link: './dev', icon: Users, description: 'Development team' },
        { name: 'Support', link: '#', icon: HeadphonesIcon, description: 'Get help & assistance' },
        { name: 'Resources', link: '#', icon: BookOpen, description: 'Study materials & guides' },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-visible">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center space-x-1">
            <NavItems items={navItems} />
            <div className="relative">
              <button
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="flex items-center text-neutral-600 hover:text-blue-600 transition-colors duration-200 py-2"
              >
                <NavbarButton variant="secondary" className="font-normal text-black">
                  More ▾
                </NavbarButton>
              </button>
            </div>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block  px-4 text-gray-600 hover:bg-neutral-100"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMoreDropdownOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="hidden sm:block py-2 px-4 text-black hover:bg-neutral-100"
            >
              More
            </button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* DROPDOWN PORTAL */}
      <AnimatePresence>
        {isMoreDropdownOpen && (
          <DropdownPortal>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
              onClick={() => setIsMoreDropdownOpen(false)}
              className={twMerge(
                'fixed top-[4.5rem] left-0 right-0 mx-auto max-w-[600px] w-full bg-neutral-900 rounded-xl shadow-xl overflow-hidden z-[9999] md:top-[60px] md:right-[20px] md:left-auto md:w-[600px]'
              )}
            >
              <div className="bg-neutral-800 p-4 text-neutral-100 flex flex-col">
                <h3 className="text-lg font-bold mb-2">Explore More</h3>
                <p className="text-blue-200 text-sm">Discover all the resources and opportunities available</p>
              </div>
              <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0">
                {dropdownSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                    className="p-4 border-b border-neutral-700 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
                  >
                    <div className={twMerge(`bg-gradient-to-r ${section.gradient} p-2 rounded-lg mb-3`)}>
                      <h4 className="text-white font-semibold text-sm text-center">{section.title}</h4>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <motion.a
                          key={item.name}
                          href={item.link}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                          className="group flex items-start space-x-2 p-2 rounded-lg hover:bg-neutral-800 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          <div
                            className={twMerge(`p-2 rounded-lg bg-gradient-to-r ${section.gradient} group-hover:scale-105 transition-transform duration-200`)}
                          >
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-neutral-100 text-sm group-hover:text-blue-400 transition-colors">
                                {item.name}
                              </h5>
                              <ChevronRight className="h-3 w-3 text-neutral-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                            <p className="text-xs text-neutral-400 mt-1 leading-tight">
                              {item.description}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-neutral-800 p-3 text-center">
                <p className="text-xs text-neutral-400">
                  Need help?{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                    Contact Support
                  </a>
                </p>
              </div>
            </motion.div>
          </DropdownPortal>
        )}
      </AnimatePresence>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Achievements />} />
        <Route path="/achievements/:id" element={<Achieve_Details />} />
      </Routes>
    </div>
  );
};

export default App;
