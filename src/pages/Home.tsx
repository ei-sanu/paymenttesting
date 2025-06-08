import { saveAs } from 'file-saver';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';
import JSZip from 'jszip';
import {
  Code2,
  Command,
  Download,
  Keyboard // Add this import
  ,

  Maximize2,
  Minimize,
  Minimize2,
  Play,
  X,
  Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';

// Add these interfaces after the imports
interface CodeFile {
  id: string;
  name: string;
  content: string;
  type: 'html' | 'css' | 'js';
  isMain?: boolean;
}

interface CodeFolder {
  id: string;
  name: string;
  files: CodeFile[];
}

const INITIAL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Start Coding</title>
</head>
<body>
    <!-- Start coding here -->
</body>
</html>`;

const INITIAL_CSS = `/* Start styling here */
body {
    margin: 0;
    padding: 20px;
    font-family: 'Courier New', monospace;
}`;

const INITIAL_JS = `// Start scripting here
`;

// Update the WindowControls component buttons
const WindowControls: React.FC<{
  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
  onFullscreen: () => void;
  isMaximized: boolean;
  isFullscreen: boolean;
}> = ({
  onMaximize,
  onMinimize,
  onClose,
  onFullscreen,
  isMaximized,
  isFullscreen
}) => (
    <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-black/40 border-b border-amber-400/20">
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center group transition-colors"
      >
        <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
      <motion.button
        onClick={onFullscreen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 bg-yellow-500/80 hover:bg-yellow-500 rounded-full flex items-center justify-center group transition-colors"
      >
        <Minimize className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>
      <motion.button
        onClick={onMaximize}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-4 h-4 bg-green-500/80 hover:bg-green-500 rounded-full flex items-center justify-center group transition-colors"
      >
        {isMaximized || isFullscreen ? (
          <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : (
          <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.button>
    </div>
  );

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CyberCode Demo</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to CyberCode!</h1>
        <p>Edit this code to see live changes!</p>
        <div class="card">
            <h2>Features</h2>
            <ul>
                <li>Live Preview</li>
                <li>Real-time Editing</li>
                <li>Instant Results</li>
            </ul>
        </div>
        <button class="cyber-button">Click Me!</button>
    </div>
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Cyberpunk Theme Styles */
:root {
  --amber-400: #fbbf24;
  --amber-500: #f59e0b;
  --amber-600: #d97706;
}

body {
  background: linear-gradient(135deg, #000000, #1a1a1a);
  color: var(--amber-400);
  font-family: 'Courier New', monospace;
  min-height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.6;
  font-size: 14px; /* Reduced base font size */
}

.container {
  text-align: center;
  padding: 1.5rem; /* Reduced padding */
  border: 1px solid var(--amber-400);
  border-radius: 0.5rem; /* Slightly reduced border radius */
  background: rgba(251, 191, 36, 0.1);
  backdrop-filter: blur(12px);
  max-width: 400px; /* Reduced max-width */
  margin: 1rem; /* Reduced margin */
}

h1 {
  font-size: 1.75rem; /* Reduced heading size */
  margin-bottom: 1rem; /* Reduced margin */
  background: linear-gradient(to right, var(--amber-400), var(--amber-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2s ease-in-out infinite;
}

.card {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 0.375rem;
  padding: 1rem; /* Reduced padding */
  margin: 1.5rem 0; /* Reduced margin */
}

h2 {
  font-size: 1.25rem; /* Reduced heading size */
  color: var(--amber-500);
  margin-bottom: 0.75rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0.375rem 0; /* Reduced margin */
  padding: 0.375rem; /* Reduced padding */
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  font-size: 0.875rem; /* Reduced font size */
}

li:hover {
  background: rgba(251, 191, 36, 0.1);
  transform: translateX(3px); /* Reduced transform */
}

.cyber-button {
  background: transparent;
  color: var(--amber-400);
  border: 1px solid var(--amber-400);
  padding: 0.5rem 1rem; /* Reduced padding */
  font-family: 'Courier New', monospace;
  font-size: 0.875rem; /* Reduced font size */
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cyber-button:hover {
  background: rgba(251, 191, 36, 0.1);
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.3); /* Reduced shadow */
}

.cyber-button:active {
  transform: scale(0.95);
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
  50% { text-shadow: 0 0 20px rgba(251, 191, 36, 0.6); }
}`);

  const [jsCode, setJsCode] = useState(`// Interactive elements
document.querySelector('.cyber-button').addEventListener('click', function() {
  // Send a custom event to reset the editor
  const resetEvent = new CustomEvent('resetEditor');
  window.parent.document.dispatchEvent(resetEvent);
});`);

  const [isMaximized, setIsMaximized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const [files, setFiles] = useState<CodeFile[]>([
    {
      id: 'main-html',
      name: 'index.html',
      content: htmlCode,
      type: 'html',
      isMain: true
    },
    {
      id: 'main-css',
      name: 'styles.css',
      content: cssCode,
      type: 'css',
      isMain: true
    },
    {
      id: 'main-js',
      name: 'script.js',
      content: jsCode,
      type: 'js',
      isMain: true
    }
  ]);

  const [folders, setFolders] = useState<CodeFolder[]>([]);
  const [activeFileId, setActiveFileId] = useState('main-html');
  const [showFileModal, setShowFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<'html' | 'css' | 'js'>('html');

  const handleMaximizeToggle = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleMinimize = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      document.exitFullscreen().catch(err => console.log(err));
    } else {
      setIsMaximized(false);
      document.body.style.overflow = 'auto';
    }
  };

  const handleFullscreenToggle = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        setIsMaximized(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClose = async () => {
    // Exit fullscreen if active
    if (isFullscreen) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error exiting fullscreen:", err);
      }
    }

    // Reset maximize state
    if (isMaximized) {
      setIsMaximized(false);
      document.body.style.overflow = 'auto';
    }

    // Navigate back to home
    navigate('/');
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const handleConfirmDownload = async () => {
    try {
      const zip = new JSZip();

      files.forEach(file => {
        zip.file(file.name, file.content);
      });

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "cybercode-project.zip");
    } catch (error) {
      console.error("Error creating zip file:", error);
    } finally {
      setShowDownloadModal(false);
    }
  };

  const handleAddFile = () => {
    setShowFileModal(true);
  };

  const handleCreateFile = () => {
    if (!newFileName) return;

    const fileExtension = `.${newFileType}`;
    const fileName = newFileName.endsWith(fileExtension) ? newFileName : `${newFileName}${fileExtension}`;

    const newFile: CodeFile = {
      id: `file-${Date.now()}`,
      name: fileName,
      content: '',
      type: newFileType
    };

    setFiles(prev => [...prev, newFile]);
    setShowFileModal(false);
    setNewFileName('');
  };

  const handleFileSelect = (fileId: string) => {
    setActiveFileId(fileId);
  };

  const handleFileContentChange = (fileId: string, content: string) => {
    setFiles(prev => prev.map(file =>
      file.id === fileId ? { ...file, content } : file
    ));

    const file = files.find(f => f.id === fileId);
    if (file?.isMain) {
      switch (file.type) {
        case 'html':
          setHtmlCode(content);
          break;
        case 'css':
          setCssCode(content);
          break;
        case 'js':
          setJsCode(content);
          break;
      }
    }
  };

  useEffect(() => {
    const handleReset = () => {
      setHtmlCode(INITIAL_HTML);
      setCssCode(INITIAL_CSS);
      setJsCode(INITIAL_JS);
    };

    document.addEventListener('resetEditor', handleReset);

    return () => {
      document.removeEventListener('resetEditor', handleReset);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check for Windows/Linux (Ctrl+F) or Mac (Cmd+F)
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault(); // Prevent default search behavior
        handleFullscreenToggle();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const isInView = useInView(editorRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 400], [0, 1]);
  const editorY = useTransform(scrollProgress, [0, 1], [100, 0]);
  const editorScale = useTransform(scrollProgress, [0, 1], [0.95, 1]);
  const editorOpacity = useTransform(scrollProgress, [0, 1], [0.5, 1]);

  const springConfig = { damping: 15, stiffness: 100 };
  const springY = useSpring(editorY, springConfig);
  const springScale = useSpring(editorScale, springConfig);
  const springOpacity = useSpring(editorOpacity, springConfig);

  const renderFileBrowser = () => {
    return (
      <div className="border-b border-amber-400/20 bg-amber-400/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-amber-400 font-mono">Files</h3>
          <motion.button
            onClick={handleAddFile}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-1 bg-amber-400/10 border border-amber-400/30 rounded text-amber-400 text-sm"
          >
            + New File
          </motion.button>
        </div>
        <div className="space-y-2">
          {files.map(file => (
            <motion.div
              key={file.id}
              onClick={() => handleFileSelect(file.id)}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${activeFileId === file.id ? 'bg-amber-400/20' : 'hover:bg-amber-400/10'
                }`}
            >
              <span className="text-amber-400 font-mono text-sm">{file.name}</span>
              {file.isMain && (
                <span className="text-xs text-amber-400/50">(main)</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen" ref={containerRef}>
      {!isMaximized && (
        <section className="relative py-20 px-6">
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
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut"
                }}
              >
                CyberCode Editor
              </motion.h1>

              <motion.div
                className="flex flex-wrap justify-center gap-4 mb-12"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)"
                  }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Play className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Live Preview</span>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)"
                  }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Code2 className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Real-time Editing</span>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)"
                  }}
                  className="flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 rounded-lg px-4 py-2"
                >
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400">Instant Results</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-6 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center space-x-4 text-amber-400/80"
        >
          <span className="font-mono text-sm">Fullscreen:</span>
          <div className="flex items-center space-x-2">
            {/* Windows/Linux shortcut */}
            <div className="flex items-center space-x-1">
              <Keyboard className="w-4 h-4" />
              <span className="bg-black/40 rounded px-2 py-0.5 text-xs font-mono">Ctrl</span>
              <span>+</span>
              <span className="bg-black/40 rounded px-2 py-0.5 text-xs font-mono">F</span>
            </div>
            <span className="text-amber-400/50">or</span>
            {/* Mac shortcut */}
            <div className="flex items-center space-x-1">
              <Command className="w-4 h-4" />
              <span>+</span>
              <span className="bg-black/40 rounded px-2 py-0.5 text-xs font-mono">F</span>
            </div>
          </div>
        </motion.div>
      </div>

      <section className={`px-6 ${isMaximized ? 'pt-20' : 'pb-20'}`} ref={editorRef}>
        <div className="container mx-auto">
          <motion.div
            style={{
              y: !isMaximized ? springY : 0,
              scale: !isMaximized ? springScale : 1,
              opacity: !isMaximized ? springOpacity : 1
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100
            }}
            className={`bg-black/40 backdrop-blur-xl border border-amber-400/20 rounded-xl overflow-hidden
                      ${isMaximized ? 'fixed inset-x-0 top-16 bottom-4 mx-4' : 'min-h-[600px]'}
                      transition-shadow duration-300 hover:shadow-2xl hover:shadow-amber-400/10`}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${isMaximized ? 'h-full' : 'min-h-[600px]'}`}>
              {/* Editor Side with Controls */}
              <div className="border-r border-amber-400/20 h-full flex flex-col">
                <WindowControls
                  onMaximize={handleMaximizeToggle}
                  onMinimize={handleMinimize}
                  onClose={handleClose}
                  onFullscreen={handleFullscreenToggle}
                  isMaximized={isMaximized}
                  isFullscreen={isFullscreen}
                />
                {renderFileBrowser()}
                <div className={`flex-1 ${isMaximized ? 'h-[calc(100vh-10rem)]' : 'h-[540px]'} overflow-hidden`}>
                  <CodeEditor
                    htmlCode={files.find(f => f.id === activeFileId)?.content || ''}
                    cssCode={cssCode}
                    jsCode={jsCode}
                    onHtmlChange={(content) => handleFileContentChange(activeFileId, content)}
                    onCssChange={setCssCode}
                    onJsChange={setJsCode}
                  />
                </div>
              </div>

              {/* Preview Side without Controls */}
              <div className="h-full flex flex-col bg-[#1a1a1a] flex-1">
                <div className="border-b border-amber-400/20">
                  <div className="flex items-center justify-between px-4 py-3 bg-amber-400/5">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-amber-400 font-mono text-sm">Live Preview</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-md hover:bg-amber-400/10 text-amber-400/50 hover:text-amber-400"
                        title="Refresh Preview"
                      >
                        <Play className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className={`flex-1 ${isMaximized ? 'h-[calc(100vh-10rem)]' : 'h-[540px]'} overflow-auto bg-gradient-to-b from-black/20 to-transparent`}>
                  <motion.div
                    key={htmlCode + cssCode + jsCode}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-full min-h-full"
                  >
                    <Preview
                      htmlCode={htmlCode}
                      cssCode={cssCode}
                      jsCode={jsCode}
                      className="w-full h-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="border-t border-amber-400/20 bg-amber-400/5">
              <div className="container mx-auto px-4 py-3">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 bg-amber-400/10 hover:bg-amber-400/20
                           border border-amber-400/30 hover:border-amber-400/50
                           rounded-md px-4 py-2 text-sm text-amber-400 transition-all duration-300
                           group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="font-mono">Download Code</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {showDownloadModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowDownloadModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-gray-900 border border-amber-400/20 rounded-xl p-6 max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl text-amber-400 font-mono mb-4">
              Download Code
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to download your code as a zip file?
            </p>
            <div className="flex space-x-4 justify-end">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300 font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDownload}
                className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20
                         border border-amber-400/30 hover:border-amber-400/50
                         rounded-lg text-amber-400 font-mono transition-all duration-300"
              >
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showFileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowFileModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 border border-amber-400/20 rounded-xl p-6 max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl text-amber-400 font-mono mb-4">Create New File</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">File Name</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full bg-black/40 border border-amber-400/30 rounded px-3 py-2 text-amber-400"
                  placeholder="Enter file name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">File Type</label>
                <select
                  value={newFileType}
                  onChange={(e) => setNewFileType(e.target.value as 'html' | 'css' | 'js')}
                  className="w-full bg-black/40 border border-amber-400/30 rounded px-3 py-2 text-amber-400"
                >
                  <option value="html">.html</option>
                  <option value="css">.css</option>
                  <option value="js">.js</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowFileModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFile}
                  className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;
