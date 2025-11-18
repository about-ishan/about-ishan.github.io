import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Tab } from '../types';

interface HomeTabProps {
    changeTab: (tab: Tab) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ changeTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[70vh] flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto"
    >
      <div className="mb-10 relative group cursor-default">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-stone-200 shadow-2xl mx-auto relative z-10 grayscale hover:grayscale-0 transition-all duration-1000 ease-out">
          <img 
            src="https://picsum.photos/id/433/400/400" 
            alt="Profile" 
            className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-1000"
          />
        </div>
      </div>

      <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-6 tracking-tight leading-tight">
        Arthur Sterling
      </h1>
      
      <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-[1px] w-8 bg-stone-300"></div>
          <p className="text-xs md:text-sm font-sans font-medium text-stone-500 uppercase tracking-[0.2em]">
            Fellow Chartered Accountant
          </p>
          <div className="h-[1px] w-8 bg-stone-300"></div>
      </div>

      <p className="font-serif text-stone-600 text-xl md:text-2xl leading-relaxed max-w-2xl mb-12 font-light italic opacity-80">
        "Accounting is not merely the calculation of numbers, but the crafting of a narrative that defines value, integrity, and future potential."
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button 
            onClick={() => changeTab(Tab.ABOUT)}
            className="group flex items-center justify-center gap-3 bg-stone-900 text-stone-50 px-8 py-3 rounded-sm font-light tracking-wide hover:bg-stone-800 transition-all duration-500"
        >
          Read Biography
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
        </button>
        <button 
            onClick={() => changeTab(Tab.EXPERIENCE)}
            className="group flex items-center justify-center gap-3 px-8 py-3 rounded-sm font-light tracking-wide text-stone-600 hover:text-stone-900 transition-colors duration-300"
        >
          View Career Timeline
        </button>
      </div>
      
    </motion.div>
  );
};
