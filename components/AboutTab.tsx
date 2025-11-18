import React from 'react';
import { motion } from 'framer-motion';

export const AboutTab: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto px-6 pt-10 pb-20"
    >
        <div className="space-y-16">
            {/* Intro Section */}
            <section>
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8">
                    The Person Behind the Ledger
                </h2>
                <div className="prose prose-stone prose-lg text-stone-600 font-light leading-loose text-justify">
                    <p>
                        I have always been fascinated by the story that numbers tell. Born and raised in London, my journey into finance wasn't driven by a desire for wealth, but by a curiosity for structure and order.
                    </p>
                    <p className="mt-4">
                        Qualifying as a Chartered Accountant in 2014 was a milestone, but my real education began in the boardrooms of distressed startups and the audit rooms of multinational corporations. There, I learned that resilience is just as quantifiable as revenue.
                    </p>
                </div>
            </section>

            {/* Divider */}
            <div className="flex justify-center opacity-30">
                <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>

            {/* Philosophy Section */}
            <section className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
                <div>
                    <h3 className="font-serif text-2xl text-stone-800 sticky top-24">My Philosophy</h3>
                </div>
                <div className="space-y-6 text-stone-600 font-light">
                    <div>
                        <h4 className="font-medium text-stone-800 mb-2 uppercase text-xs tracking-widest">Precision</h4>
                        <p className="text-sm leading-relaxed">
                            In a world of estimates, accuracy is a virtue. I believe in the rigorous validation of data, ensuring that every decision is founded on bedrock, not sand.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium text-stone-800 mb-2 uppercase text-xs tracking-widest">Integrity</h4>
                        <p className="text-sm leading-relaxed">
                            The role of an accountant is that of a guardian. Transparency is not optional; it is the prerequisite for trust. I adhere to the strictest ethical standards of the ICAEW.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-medium text-stone-800 mb-2 uppercase text-xs tracking-widest">Curiosity</h4>
                        <p className="text-sm leading-relaxed">
                            Financial landscapes shift. Staying relevant means staying curious—constantly learning about new tax legislations, fintech developments, and global economic currents.
                        </p>
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div className="flex justify-center opacity-30">
                <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>

            {/* Personal/Hobbies Section */}
            <section>
                 <h3 className="font-serif text-2xl text-stone-800 mb-6">Beyond Finance</h3>
                 <div className="bg-white/40 p-8 border border-stone-200/50 backdrop-blur-sm">
                    <p className="text-stone-600 font-light italic leading-relaxed">
                        "When I am not analyzing financial statements, I am likely found on a chess board or hiking the trails of the Lake District. I believe that the strategic patience required in chess mirrors the long-term thinking needed in financial planning—sometimes the best move is to wait."
                    </p>
                 </div>
            </section>
        </div>
    </motion.div>
  );
};
