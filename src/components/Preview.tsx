import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PreviewProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

const Preview: React.FC<PreviewProps> = ({ htmlCode, cssCode, jsCode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        const fullHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode.replace(/<html[\s\S]*?<\/html>/i, (match) => {
              const bodyMatch = match.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
              return bodyMatch ? bodyMatch[1] : match;
            })}
            <script>
              try {
                ${jsCode}
              } catch (error) {
                console.error('JavaScript Error:', error);
              }
            </script>
          </body>
          </html>
        `;
        
        doc.open();
        doc.write(fullHTML);
        doc.close();
      }
    }
  }, [htmlCode, cssCode, jsCode]);

  return (
    <motion.div 
      className="h-full bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Preview Frame */}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Code Preview"
        sandbox="allow-scripts allow-same-origin"
      />
      
      {/* Loading Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute inset-0 bg-gray-900 flex items-center justify-center pointer-events-none"
      >
        <div className="text-amber-400 font-mono">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Rendering...
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preview;