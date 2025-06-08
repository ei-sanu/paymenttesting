import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, Edit3, Eye, Settings, Share2, Zap } from 'lucide-react';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  // Add refs for scroll animations
  const containerRef = useRef(null);
  const stepsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll progress animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.8]), springConfig);
  const opacityProgress = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.6]), springConfig);

  // Section visibility
  const isStepsVisible = useInView(stepsRef, { once: true, margin: "-100px" });
  const isFeaturesVisible = useInView(featuresRef, { once: true, margin: "-100px" });
  const isCtaVisible = useInView(ctaRef, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: Edit3,
      title: 'Write Your Code',
      description: 'Start coding in our intuitive editor with HTML, CSS, and JavaScript tabs. Syntax highlighting and auto-completion make coding effortless.',
      details: ['Multi-language support', 'Syntax highlighting', 'Auto-completion', 'Error detection']
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'Watch your code come to life instantly in the preview panel. Changes appear in real-time as you type.',
      details: ['Real-time updates', 'Responsive preview', 'Console output', 'Error handling']
    },
    {
      icon: Zap,
      title: 'Instant Execution',
      description: 'JavaScript runs immediately in a secure sandbox environment. Test functions, DOM manipulation, and more.',
      details: ['Secure sandbox', 'Immediate execution', 'Console logging', 'Performance metrics']
    },
    {
      icon: Share2,
      title: 'Share & Collaborate',
      description: 'Share your creations with others or embed them in your projects. Export your code with a single click.',
      details: ['Share links', 'Embed codes', 'Export options', 'Collaboration tools']
    }
  ];

  const features = [
    {
      icon: Settings,
      title: 'Advanced Features',
      items: [
        'Code formatting and beautification',
        'Theme customization',
        'Keyboard shortcuts',
        'Multi-file support',
        'Version history',
        'Code snippets library'
      ]
    },
    {
      icon: Download,
      title: 'Export Options',
      items: [
        'Download as HTML file',
        'Generate standalone page',
        'Copy to clipboard',
        'Save as CodePen',
        'Export as ZIP',
        'Share via URL'
      ]
    }
  ];

  const handleStartCoding = () => {
    navigate('/');
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pt-20 min-h-screen" ref={containerRef}>
      {/* Enhanced Hero Section */}
      <motion.section
        className="relative py-20 px-6"
        style={{
          scale: scaleProgress,
          opacity: opacityProgress
        }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50
            }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              How It Works
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover the power of CyberCode's intuitive workflow. From concept to creation in just a few clicks.
            </motion.p>
          </motion.div>
        </div>

        {/* Add floating particles effect */}
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              initial={{ opacity: 0.2 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* Enhanced Steps Section */}
      <section className="py-20 px-6" ref={stepsRef}>
        <div className="container mx-auto">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={isStepsVisible ? {
                  opacity: 1,
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    delay: index * 0.2
                  }
                } : {}}
                whileHover={{ scale: 1.02 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-amber-400/10 border-2 border-amber-400/30 rounded-xl mr-6">
                      <step.icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-mono text-amber-400 mb-1">
                        Step {index + 1}
                      </div>
                      <h3 className="text-3xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {step.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-8 h-64 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <step.icon className="w-24 h-24 text-amber-400/60 mx-auto mb-4" />
                      <div className="text-amber-400 font-mono text-lg">{step.title}</div>
                      <div className="text-gray-500 text-sm mt-2">Interactive Demo</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-6 relative" ref={featuresRef}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={isFeaturesVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        />

        <div className="container mx-auto relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
          >
            Advanced Capabilities
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isFeaturesVisible ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    delay: 0.2 + index * 0.2
                  }
                } : {}}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(251, 191, 36, 0.1)"
                }}
                className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-amber-400/10 rounded-lg mr-4">
                    <feature.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                </div>

                <div className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isFeaturesVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 1 + itemIndex * 0.1, duration: 0.4 }}
                      className="flex items-center text-gray-300"
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></div>
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-6" ref={ctaRef}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isCtaVisible ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 50
              }
            } : {}}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.15)"
            }}
            className="bg-gradient-to-r from-amber-400/10 via-amber-500/5 to-amber-600/10 border border-amber-400/20 rounded-xl p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-amber-400">Ready to Start Coding?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already creating amazing projects with CyberCode.
            </p>
            <motion.button
              onClick={handleStartCoding}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold py-4 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-amber-400/25 transition-all duration-300"
            >
              Start Coding Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
