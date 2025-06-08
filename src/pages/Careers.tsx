import { motion } from 'framer-motion';

const Careers = () => {
    return (
        <div className="min-h-screen pt-20 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-amber-400 mb-8">Join Our Team</h1>
                    <div className="prose prose-invert prose-amber">
                        <p className="text-amber-400/80">
                            We're always looking for talented individuals to join our team and help
                            shape the future of web development.
                        </p>
                        <h2 className="text-2xl text-amber-400 mt-8">Open Positions</h2>
                        <div className="space-y-6">
                            <div className="border border-amber-400/20 rounded-lg p-6 bg-amber-400/5">
                                <h3 className="text-xl text-amber-400">Frontend Developer</h3>
                                <p className="text-amber-400/80 mt-2">
                                    Join us in creating cutting-edge web development tools.
                                </p>
                            </div>
                            <div className="border border-amber-400/20 rounded-lg p-6 bg-amber-400/5">
                                <h3 className="text-xl text-amber-400">UI/UX Designer</h3>
                                <p className="text-amber-400/80 mt-2">
                                    Help shape the future of our cyberpunk-themed interfaces.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Careers;
