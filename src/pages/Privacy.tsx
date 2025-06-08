import { motion } from 'framer-motion';

const Privacy = () => {
    return (
        <div className="min-h-screen pt-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-amber-400 mb-8">Privacy Policy</h1>
                    <div className="prose prose-invert prose-amber">
                        <p className="text-amber-400/80">
                            At CyberCode, we take your privacy seriously. This policy outlines how we
                            collect, use, and protect your data.
                        </p>
                        <h2 className="text-2xl text-amber-400 mt-8">Data Collection</h2>
                        <p className="text-amber-400/80">
                            We only collect necessary information to improve your coding experience.
                        </p>
                        <h2 className="text-2xl text-amber-400 mt-8">Data Usage</h2>
                        <p className="text-amber-400/80">
                            Your code is stored locally and is never shared without your explicit consent.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
