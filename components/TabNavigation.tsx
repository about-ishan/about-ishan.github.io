import React from 'react';
import { Tab } from '../types';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: Tab.HOME, label: 'Home' },
    { id: Tab.ABOUT, label: 'About Me' },
    { id: Tab.EXPERIENCE, label: 'Experience' },
    { id: Tab.PLAY, label: 'Play Chess' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-8 pointer-events-none">
      <div className="pointer-events-auto flex space-x-4 md:space-x-8 bg-white/20 backdrop-blur-md px-6 md:px-8 py-3 rounded-sm border border-white/40 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative text-[10px] md:text-sm tracking-widest uppercase font-medium transition-colors duration-500 ${
              activeTab === tab.id ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-stone-800"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
