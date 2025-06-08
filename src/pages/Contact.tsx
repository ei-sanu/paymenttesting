import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [result, setResult] = useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    // Add form submission identifiers
    formData.append("access_key", "9c4dbdf0-8c38-47a5-aab1-9e3b06b196db");
    formData.append("subject", "CyberCode Contact Form Submission");
    formData.append("from_name", "CyberCode Website");
    formData.append("website", "CyberCode Editor");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thank you! Your message has been sent successfully.");
        if (formRef.current) {
          formRef.current.reset();
        }
        setTimeout(() => {
          setResult("");
        }, 5000);
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to send message. Please try again.");
      setTimeout(() => {
        setResult("");
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      info: 'use the form below',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      info: 'Available 24/7',
      description: 'Get instant support through our integrated chat system'
    },
    {
      icon: MapPin,
      title: 'Location',
      info: 'Lovely Professional University, Punjab',
      description: 'Our distributed team spans across the digital universe'
    },
    {
      icon: Clock,
      title: 'Response Time',
      info: '< 2 hours',
      description: 'Average response time for support requests'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
              Have questions, feedback, or need support? We're here to help you navigate the digital frontier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-6 text-center hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400/10 rounded-lg mb-4">
                  <info.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
                <div className="text-amber-400 font-mono text-sm mb-2">{info.info}</div>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-amber-400 mb-4">Send Us a Message</h2>
                <p className="text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-black/60 border border-amber-400/30 rounded-lg text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-black/60 border border-amber-400/30 rounded-lg text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/60 border border-amber-400/30 rounded-lg text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-center"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold py-4 px-8 rounded-lg text-lg hover:shadow-lg hover:shadow-amber-400/25 transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-4 text-center ${result.includes("success") ? "text-green-400" : "text-amber-400"
                        }`}
                    >
                      {result}
                    </motion.div>
                  )}
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Quick answers to common questions about CyberCode.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Is CyberCode free to use?',
                answer: 'Yes! CyberCode is completely free and open-source. You can use all features without any limitations.'
              },
              {
                question: 'Can I save my projects?',
                answer: 'Currently, projects are saved locally in your browser. We\'re working on cloud storage for the next version.'
              },
              {
                question: 'What browsers are supported?',
                answer: 'CyberCode works best in modern browsers like Chrome, Firefox, Safari, and Edge.'
              },
              {
                question: 'How can I contribute to the project?',
                answer: 'We welcome contributions! Check out our GitHub repository for issues and contribution guidelines.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                className="bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-amber-400 mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
