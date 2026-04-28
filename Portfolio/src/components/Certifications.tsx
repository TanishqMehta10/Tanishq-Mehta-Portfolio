import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Certifications: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

const items = [
  {
    title: 'Data Analytics Virtual Intern',
    issuer: 'Deloitte',
    image: '/deloitte-certificate.jpg',
    viewLink: 'https://drive.google.com/file/d/1tHy7df_QbLDF8mD2WaI3fYc0mQH_Ekup/view'
  },
  {
    title: '3rd Rank in Code Contest',
    issuer: 'Enginow',
    image: '/coding-contest.jpg',
    viewLink: 'https://drive.google.com/file/d/16S6Pguhoses67rU3_vXzw21qcLSPh8W-/view'
  }
];


  return (
    <section id="certifications" className="relative py-20 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Selected certifications and recognitions showcasing skills and achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/50"
            >
              <div className="relative h-56 md:h-44 flex items-center justify-center bg-gray-900/10">
                <img src={cert.image} alt={`${cert.title} certificate`} className="max-w-full max-h-full object-contain" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-cyan-600/10 pointer-events-none" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
