import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';

export const ExperienceTab: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: '1',
      role: 'Senior Audit Manager',
      company: 'Deloitte & Touche',
      period: '2019 — Present',
      description: 'Leading comprehensive audit engagements for large-cap listed entities. Specialized in IFRS compliance and internal control optimization. A period defined by leadership and the cultivation of junior talent.',
      tags: ['Audit Leadership', 'IFRS Compliance'],
    },
    {
      id: '2',
      role: 'Forensic Accountant',
      company: 'KPMG',
      period: '2016 — 2019',
      description: 'Unravelling complex financial discrepancies in high-stakes investigations. This role honed my attention to detail and ability to remain objective under pressure.',
      tags: ['Forensic Investigation', 'Dispute Resolution'],
    },
    {
      id: '3',
      role: 'Financial Analyst',
      company: 'Goldman Sachs',
      period: '2014 — 2016',
      description: 'Foundational years spent in the crucible of M&A valuation. Developed the technical modeling skills that underpin my strategic approach today.',
      tags: ['Valuation', 'Financial Modelling'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-6 pt-6 pb-20"
    >
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl text-stone-900">Curriculum Vitae</h2>
        <div className="h-px w-12 bg-stone-400 mx-auto mt-4 opacity-50"></div>
      </div>

      <div className="relative border-l border-stone-300/50 ml-4 md:ml-0 pl-8 md:pl-12 space-y-16">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[37px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-stone-200 border border-stone-400 ring-4 ring-stone-50"></div>

            <div className="flex flex-col gap-1 mb-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{exp.period}</span>
                <h3 className="text-xl font-serif text-stone-900">{exp.role}</h3>
                <span className="text-sm text-stone-500 font-medium">{exp.company}</span>
            </div>
            
            <p className="text-stone-600 font-light leading-relaxed mb-4 max-w-lg text-sm md:text-base">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-3 opacity-70">
              {exp.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20 text-center opacity-50">
         <p className="font-serif italic text-stone-500">References available upon request.</p>
      </div>
    </motion.div>
  );
};
