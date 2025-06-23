import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';

interface CodeEditorProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onHtmlChange: (code: string) => void;
  onCssChange: (code: string) => void;
  onJsChange: (code: string) => void;
  onClearAll: () => void;  // Add this new prop
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  htmlCode,
  cssCode,
  jsCode,
  onHtmlChange,
  onCssChange,
  onJsChange,
  onClearAll,  // Add this new prop
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

  // Define custom Monaco editor theme
  const beforeMount = (monaco: any) => {
    monaco.editor.defineTheme('cyberTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'fbbf24' }, // amber-400
        { token: 'string', foreground: '9CA3AF' },
        { token: 'number', foreground: 'fbbf24' },
        { token: 'tag', foreground: 'fbbf24' },
        { token: 'attribute.name', foreground: '9CA3AF' },
        { token: 'attribute.value', foreground: '9CA3AF' },
      ],
      colors: {
        'editor.background': '#00000066',
        'editor.foreground': '#9CA3AF',
        'editor.lineHighlightBackground': '#fbbf2410',
        'editorCursor.foreground': '#fbbf24',
        'editor.selectionBackground': '#fbbf2430',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#fbbf24',
        'editor.inactiveSelectionBackground': '#fbbf2420',
      },
    });
  };

  const editorOptions = {
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    lineNumbersMinChars: 3,
    lineDecorationsWidth: 24,
    lineNumbersWidth: 50,
    folding: true,
    padding: {
      top: 12,
      bottom: 12,
    },
    minimap: {
      enabled: false
    },
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontLigatures: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    smoothScrolling: true,
    tabSize: 2,
    guides: {
      bracketPairs: true,
      indentation: true,
    },
  };

  const handleClearAll = () => {
    console.log('Clearing all editors');
    onHtmlChange('');
    onCssChange('');
    onJsChange('');
  };

  const handlePaymentAndDownload = () => {
    const upiLink = `upi://pay?pa=7008450074@pz&pn=CyberCode&am=10&cu=INR&tn=Code_Download`;

    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = upiLink;
    } else {
      // Show QR code or message for desktop users
      alert('Please scan the QR code or open this link on your mobile device to make the payment.');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tab Buttons */}
      <div className="flex border-b border-amber-400/20 justify-between">
        <div className="flex">
          <button
            onClick={() => setActiveTab('html')}
            className={`px-6 py-2 text-sm font-mono transition-colors ${activeTab === 'html'
              ? 'bg-amber-400/10 text-amber-400 border-b-2 border-amber-400'
              : 'text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5'
              }`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-6 py-2 text-sm font-mono transition-colors ${activeTab === 'css'
              ? 'bg-amber-400/10 text-amber-400 border-b-2 border-amber-400'
              : 'text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5'
              }`}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab('js')}
            className={`px-6 py-2 text-sm font-mono transition-colors ${activeTab === 'js'
              ? 'bg-amber-400/10 text-amber-400 border-b-2 border-amber-400'
              : 'text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5'
              }`}
          >
            JavaScript
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePaymentAndDownload}
            className="px-6 py-2 text-sm font-mono transition-colors bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 rounded"
          >
            Download Code ₹10
          </button>
          <button
            onClick={handleClearAll}
            className="px-6 py-2 text-sm font-mono transition-colors text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 bg-black/40">
        {activeTab === 'html' && (
          <Editor
            height="100%"
            defaultLanguage="html"
            value={htmlCode}
            onChange={(value) => onHtmlChange(value || '')}
            beforeMount={beforeMount}
            theme="cyberTheme"
            options={editorOptions}
            className="px-2"
          />
        )}
        {activeTab === 'css' && (
          <Editor
            height="100%"
            defaultLanguage="css"
            value={cssCode}
            onChange={(value) => onCssChange(value || '')}
            beforeMount={beforeMount}
            theme="cyberTheme"
            options={editorOptions}
            className="px-2"
          />
        )}
        {activeTab === 'js' && (
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={jsCode}
            onChange={(value) => onJsChange(value || '')}
            beforeMount={beforeMount}
            theme="cyberTheme"
            options={editorOptions}
            className="px-2"
          />
        )}
      </div>

      {/* Info Message */}
      <div className="bg-amber-400/5 border-t border-amber-400/20 p-4">
        <p className="text-amber-400/80 text-sm font-mono">
          <span className="text-amber-400">Note:</span> You don't need to include{' '}
          <code className="bg-black/30 px-1 rounded">&lt;style&gt;</code> or{' '}
          <code className="bg-black/30 px-1 rounded">&lt;script&gt;</code> tags in HTML.
          Simply write or paste your CSS and JavaScript code in their respective editors.
          The page will automatically link them together.
        </p>
      </div>
    </div>
  );
};

export default CodeEditor;
