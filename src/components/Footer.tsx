import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, Heart, Linkedin, Mail, Twitter } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Github, href: '', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:someshranjanbiswal13678@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Terms', href: '/terms' },
      ]
    },
    {
      title: 'Contact Info',
      links: [
        { name: 'somesh.social', href: 'https://somesh.social', external: true },
        { name: '+91 7008450074', href: 'tel:+917008450074', external: true },
        { name: 'Contact Us', href: '/contact' },
      ]
    }
  ];

  return (
    <footer className="relative bg-black/60 backdrop-blur-xl border-t border-amber-400/20 mt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
                 linear-gradient(rgba(195,176,145,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(195,176,145,0.1) 1px, transparent 1px)
               `,
            backgroundSize: '30px 30px'
          }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Code className="w-8 h-8 text-amber-400" />
                  <div className="absolute inset-0 bg-amber-400/20 blur-lg rounded-full"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  CyberCode
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                The future of web development is here. Create, code, and innovate with our
                cyberpunk-inspired editor that brings your digital dreams to life.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-400 hover:bg-amber-400/20 hover:border-amber-400/50 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + sectionIndex * 0.1, duration: 0.6 }}
              >
                <h3 className="text-lg font-semibold text-amber-400 mb-4 font-mono">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li key={linkIndex}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                      ) : (
                        <button
                          onClick={() => handleNavigation(link.href)}
                          className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                        >
                          {link.name}
                          <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="border-t border-amber-400/20 pt-8"
        >
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} CyberCode. Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>in the digital realm.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
