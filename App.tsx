import React, { useState } from 'react';
import { Tab } from './types';
import { TabNavigation } from './components/TabNavigation';
import { HomeTab } from './components/HomeTab';
import { AboutTab } from './components/AboutTab';
import { ExperienceTab } from './components/ExperienceTab';
import { ChessTab } from './components/ChessTab';
import { AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pt-24 md:pt-32 pb-12 min-h-[calc(100vh-80px)] flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === Tab.HOME && <HomeTab key="home" changeTab={setActiveTab} />}
          {activeTab === Tab.ABOUT && <AboutTab key="about" />}
          {activeTab === Tab.EXPERIENCE && <ExperienceTab key="experience" />}
          {activeTab === Tab.PLAY && <ChessTab key="play" />}
        </AnimatePresence>
      </main>

      <footer className="py-12 text-center border-t border-stone-200/40 bg-white/30 backdrop-blur-sm">
        <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-stone-400 hover:text-stone-800 transition-colors duration-300">
                <Github className="w-5 h-5" />
            </a>
            <a href="mailto:contact@example.com" className="text-stone-400 hover:text-stone-800 transition-colors duration-300">
                <Mail className="w-5 h-5" />
            </a>
        </div>
        <p className="text-stone-400 text-xs font-light tracking-wider">
          &copy; {new Date().getFullYear()} Arthur Sterling. Chartered Accountant.
        </p>
      </footer>
    </div>
  );
};

export default App;
