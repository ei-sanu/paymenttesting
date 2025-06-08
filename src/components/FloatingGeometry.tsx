import React from 'react';
import { motion } from 'framer-motion';

const FloatingGeometry: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large Floating Cube */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 right-20 w-32 h-32 opacity-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 border-2 border-amber-400 bg-amber-400/5" />
      </motion.div>

      {/* Floating Pyramid */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-20 w-24 h-24 opacity-20"
      >
        <div className="w-0 h-0 border-l-12 border-r-12 border-b-20 border-l-transparent border-r-transparent border-b-amber-400/30" />
      </motion.div>

      {/* Small Floating Dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 bg-amber-400 rounded-full"
          style={{
            left: `${10 + (i * 7)}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}

      {/* Hexagonal Pattern */}
      <motion.div
        animate={{
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/2 left-1/4 w-40 h-40 opacity-5"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50,10 85,30 85,70 50,90 15,70 15,30"
            fill="none"
            stroke="#C3B091"
            strokeWidth="2"
          />
          <polygon
            points="50,25 70,35 70,65 50,75 30,65 30,35"
            fill="none"
            stroke="#C3B091"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Wireframe Sphere */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateZ: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-1/4 w-28 h-28 opacity-15"
      >
        <div className="absolute inset-0 border-2 border-amber-400 rounded-full" />
        <div className="absolute inset-2 border border-amber-400 rounded-full" />
        <div className="absolute inset-4 border border-amber-400 rounded-full" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-amber-400" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-400" />
      </motion.div>
    </div>
  );
};

export default FloatingGeometry;