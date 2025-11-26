import React from 'react';
import ProcessScroll, { ProcessMobileStack } from './ProcessScroll';

const Process: React.FC = () => {
  return (
    <section className="py-32 bg-ivory relative">
      <div className="container mx-auto px-6 relative z-10">

        {/* New Sticky Scroll Interface (Desktop & Mobile handled internally) */}
        <ProcessScroll />

        {/* Footer Note */}
        <div className="mt-24 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-text-secondary">
              Average time to first result: <span className="text-text-primary font-bold">21 Days</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
