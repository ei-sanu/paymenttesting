import { motion } from 'framer-motion';
import { Code, Rocket, Shield, Star, Users, Zap } from 'lucide-react';
import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

const About: React.FC = () => {
  useScrollToTop();

  const features = [
    {
      icon: Code,
      title: 'Live Code Editing',
      description: 'Real-time HTML, CSS, and JavaScript editing with instant preview updates.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with minimal latency for seamless coding experience.'
    },
    {
      icon: Shield,
      title: 'Secure Environment',
      description: 'Sandboxed preview environment ensures safe code execution and testing.'
    },
    {
      icon: Users,
      title: 'Developer Friendly',
      description: 'Built by developers, for developers. Intuitive interface and powerful features.'
    },
    {
      icon: Rocket,
      title: 'Modern Technology',
      description: 'Powered by cutting-edge web technologies and cyberpunk aesthetics.'
    },
    {
      icon: Star,
      title: 'Open Source',
      description: 'Community-driven development with continuous improvements and updates.'
    }
  ];

  const stats = [
    { label: 'Lines of Code', value: '10K+' },
    { label: 'Active Users', value: '2.5K+' },
    { label: 'Projects Created', value: '10+' },
    { label: 'Coffee Consumed', value: '∞' }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              About CyberCode
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
              Born from the fusion of cyberpunk aesthetics and modern web technology,
              CyberCode is more than just an editor—it's a gateway to the digital future.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-8 mb-20"
          >
            <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-300 text-center leading-relaxed">
              To democratize web development by providing a powerful, accessible, and visually stunning
              code editor that inspires creativity and accelerates learning. We believe that the future
              of coding should be as beautiful as it is functional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
          >
            Core Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-6 hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amber-400/10 rounded-lg mr-4">
                    <feature.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-gradient-to-r from-amber-400/10 via-amber-500/5 to-amber-600/10 border border-amber-400/20 rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">
              By the Numbers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Built With
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-black/40 border border-amber-400/30 rounded-lg px-4 py-2 text-amber-400 font-mono"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
