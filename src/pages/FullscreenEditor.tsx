import { Minimize2 } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import Preview from '../components/Preview';

const FullscreenEditor: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { htmlCode, cssCode, jsCode, setHtmlCode, setCssCode, setJsCode } =
        location.state as {
            htmlCode: string;
            cssCode: string;
            jsCode: string;
            setHtmlCode: (code: string) => void;
            setCssCode: (code: string) => void;
            setJsCode: (code: string) => void;
        };

    return (
        <div className="h-screen bg-black/95">
            <div className="flex justify-between items-center px-4 py-2 bg-amber-400/5 border-b border-amber-400/20">
                <span className="text-amber-400 font-mono">Fullscreen Editor</span>
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-amber-400 hover:text-amber-300"
                >
                    <Minimize2 className="w-5 h-5" />
                    <span>Exit Fullscreen</span>
                </button>
            </div>

            <div className="grid grid-cols-2 h-[calc(100vh-48px)]">
                <div className="border-r border-amber-400/20">
                    <CodeEditor
                        htmlCode={htmlCode}
                        cssCode={cssCode}
                        jsCode={jsCode}
                        onHtmlChange={setHtmlCode}
                        onCssChange={setCssCode}
                        onJsChange={setJsCode}
                    />
                </div>
                <div>
                    <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
                </div>
            </div>
        </div>
    );
};

export default FullscreenEditor;
