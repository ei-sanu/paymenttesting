import { motion } from 'framer-motion';
import { Code2, Maximize2, Minimize2, Play, X, Zap } from 'lucide-react';
import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';

const Home: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberCode Demo</title>
    <style>
        body {
            background: linear-gradient(135deg, #1a1a1a, #2d1810);
            color: #C3B091;
            font-family: 'Courier New', monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            padding: 2rem;
            border: 2px solid #C3B091;
            border-radius: 10px;
            background: rgba(195, 176, 145, 0.1);
            box-shadow: 0 0 30px rgba(195, 176, 145, 0.3);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            text-shadow: 0 0 10px #C3B091;
        }
        .pulse {
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="pulse">Welcome to CyberCode!</h1>
        <p>Edit this code to see live changes!</p>
        <button onclick="alert('Hello from CyberCode!')">Click Me!</button>
    </div>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Add your CSS here */
.custom-style {
  background: linear-gradient(45deg, #C3B091, #8B7355);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}`);

  const [jsCode, setJsCode] = useState(`// Add your JavaScript here
console.log('CyberCode is running!');

// Example function
function createGlowEffect() {
  const elements = document.querySelectorAll('.pulse');
  elements.forEach(el => {
    el.style.filter = 'drop-shadow(0 0 20px #C3B091)';
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', createGlowEffect);`);

  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximizeToggle = () => {
    setIsMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    setIsMaximized(false);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section - only show when not maximized */}
      {!isMaximized && (
        <section className="relative py-20 px-6">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                CyberCode Editor
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-mono">
                Code • Preview • Create • Innovate
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Play className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Live Preview</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Code2 className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Real-time Editing</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Instant Results</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Code Editor Section */}
      <section className={`px-6 ${isMaximized ? 'pt-20' : 'pb-20'}`}>
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl overflow-hidden ${isMaximized ? 'fixed inset-x-0 top-16 bottom-4 mx-4' : 'min-h-[600px]'
              }`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${isMaximized ? 'h-full' : 'min-h-[600px]'}`}>
              {/* Code Editors */}
              <div className="border-r border-amber-400/20 h-full flex flex-col">
                <div className="border-b border-amber-400/20">
                  <div className="flex items-center justify-between px-4 py-3 bg-amber-400/5">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors relative group"
                        onClick={handleMinimize}
                        title="Close"
                      >
                        <div className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 w-full h-full flex items-center justify-center transition-opacity">
                          <X className="w-2 h-2 text-red-900" />
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer"
                      ></div>
                      <div
                        className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors relative group"
                        onClick={handleMaximizeToggle}
                        title={isMaximized ? "Minimize" : "Maximize"}
                      >
                        <div className="absolute opacity-0 group-hover:opacity-100 top-0 left-0 w-full h-full flex items-center justify-center transition-opacity">
                          {isMaximized ? (
                            <Minimize2 className="w-2 h-2 text-green-900" />
                          ) : (
                            <Maximize2 className="w-2 h-2 text-green-900" />
                          )}
                        </div>
                      </div>
                      <span className="text-amber-400 font-mono text-sm ml-4">editor.cyber</span>
                    </div>
                  </div>
                </div>

                <div className={`${isMaximized ? 'h-[calc(100vh-8rem)]' : 'h-[540px]'} overflow-hidden`}>
                  <CodeEditor
                    htmlCode={htmlCode}
                    cssCode={cssCode}
                    jsCode={jsCode}
                    onHtmlChange={setHtmlCode}
                    onCssChange={setCssCode}
                    onJsChange={setJsCode}
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="h-full flex flex-col">
                <div className="border-b border-amber-400/20">
                  <div className="flex items-center space-x-2 px-4 py-3 bg-amber-400/5">
                    <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-amber-400 font-mono text-sm">Live Preview</span>
                  </div>
                </div>

                <div className={`${isMaximized ? 'h-[calc(100vh-8rem)]' : 'h-[540px]'}`}>
                  <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
