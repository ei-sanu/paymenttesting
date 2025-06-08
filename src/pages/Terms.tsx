import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="min-h-screen pt-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-amber-400 mb-8">Terms of Service</h1>
                    <div className="prose prose-invert prose-amber">
                        <p className="text-amber-400/80">
                            By using CyberCode, you agree to these terms of service.
                        </p>
                        <h2 className="text-2xl text-amber-400 mt-8">Usage Terms</h2>
                        <p className="text-amber-400/80">
                            CyberCode is provided as-is, and you agree to use it responsibly.
                        </p>
                        <h2 className="text-2xl text-amber-400 mt-8">Code Ownership</h2>
                        <p className="text-amber-400/80">
                            You retain all rights to the code you create using CyberCode.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
