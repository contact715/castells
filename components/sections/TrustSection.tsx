import React from 'react';
import { m as motion } from 'framer-motion';

const TESTIMONIAL_AVATARS = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
];

const TrustSection: React.FC = () => {
  return (
    <section className="bg-ivory dark:bg-[#191919] py-8 md:py-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 py-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm md:text-base text-text-secondary">
              Partnering with contractors & service businesses since 2018.
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Avatars */}
            <div className="flex -space-x-3">
              {TESTIMONIAL_AVATARS.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  alt={`Client ${idx + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-black"
                />
              ))}
            </div>
            {/* Rating */}
            <div className="flex flex-col items-start">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-coral fill-coral" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-bold text-text-primary">
                Trusted by 100+ Owners
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
