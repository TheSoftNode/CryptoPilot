// "use client";

// import { motion } from "framer-motion";
// import {
//     MessageSquare,
//     Shield,
//     Zap,
//     Wallet,
//     Sparkles,
//     Search,
//     BarChart3
// } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { fadeInUp, staggerContainer } from "@/lib/animations";
// import { useRef } from "react";

// // Consistent brand colors
// const BRAND_COLORS = {
//     blue: "#3b82f6",
//     teal: "#14b8a6",
//     pink: "#ec4899",
//     purple: "#8b5cf6",
//     orange: "#f97316"
// };

// const features = [
//     {
//         icon: <MessageSquare className="h-6 w-6" />,
//         title: "Natural Language Commands",
//         description: "Interact with your wallet using conversational language—just like chatting with a friend.",
//         color: BRAND_COLORS.blue
//     },
//     {
//         icon: <Shield className="h-6 w-6" />,
//         title: "Glanceable Security",
//         description: "Transaction details are clear and unambiguous, giving you confidence in every action.",
//         color: BRAND_COLORS.purple
//     },
//     {
//         icon: <Zap className="h-6 w-6" />,
//         title: "Zero Learning Curve",
//         description: "No complex menus or technical jargon—begin using instantly with intuitive interface.",
//         color: BRAND_COLORS.orange
//     },
//     {
//         icon: <Wallet className="h-6 w-6" />,
//         title: "MetaMask Integration",
//         description: "Seamlessly connects with your MetaMask wallet for a unified crypto experience.",
//         color: BRAND_COLORS.pink
//     },
//     {
//         icon: <Sparkles className="h-6 w-6" />,
//         title: "Smart Suggestions",
//         description: "AI-powered autocomplete for common commands and actions saves you time.",
//         color: BRAND_COLORS.teal
//     },
//     {
//         icon: <Search className="h-6 w-6" />,
//         title: "ENS Resolution",
//         description: "View human-readable names instead of long hexadecimal addresses.",
//         color: BRAND_COLORS.orange
//     },
//     {
//         icon: <BarChart3 className="h-6 w-6" />,
//         title: "Portfolio Dashboard",
//         description: "Get a complete overview of your crypto portfolio with detailed charts and analytics.",
//         color: BRAND_COLORS.purple
//     },
// ];

// export function FeaturesSection() {
//     const sectionRef = useRef(null);

//     return (
//         <section
//             ref={sectionRef}
//             className="py-16 md:py-20 relative w-full bg-white dark:bg-gray-900"
//         >
//             {/* Subtle background elements */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/80 via-transparent to-blue-50/50 dark:from-blue-950/30 dark:via-transparent dark:to-blue-900/20"></div>

//                 {/* Subtle orbital accent */}
//                 <motion.div
//                     className="absolute -top-[30%] -right-[20%] w-[60%] h-[60%] rounded-full border border-blue-200/20 dark:border-blue-500/10"
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
//                 />

//                 <motion.div
//                     className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full border border-blue-200/20 dark:border-blue-500/10"
//                     animate={{ rotate: -360 }}
//                     transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//                 />
//             </div>

//             <motion.div
//                 className="w-full relative z-10 px-4 md:px-8"
//                 variants={staggerContainer}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.15 }}
//             >
//                 <motion.div
//                     variants={fadeInUp}
//                     className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12"
//                 >
//                     <span className="rounded-full bg-blue-100 dark:bg-blue-900/50 px-4 py-1.5 text-sm font-medium text-blue-800 dark:text-blue-300">
//                         Features
//                     </span>

//                     <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
//                         Why AI Wallet Assistant?
//                     </h2>

//                     <p className="max-w-[85%] leading-normal text-gray-600 dark:text-gray-300 sm:text-lg">
//                         Designed for efficiency, clarity, and simplicity in handling cryptocurrency transactions
//                     </p>
//                 </motion.div>

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 justify-center items-center lg:grid-cols-3 xl:grid-cols-4">
//                     {features.map((feature, index) => (
//                         <motion.div
//                             key={feature.title}
//                             variants={fadeInUp}
//                             transition={{
//                                 delay: index * 0.075,
//                                 type: "spring",
//                                 stiffness: 260,
//                                 damping: 20
//                             }}
//                             whileHover={{
//                                 y: -5,
//                                 transition: { duration: 0.2 }
//                             }}
//                         >
//                             <Card className="h-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
//                                 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
//                                 <CardHeader className="pb-2">
//                                     <div
//                                         className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-white"
//                                         style={{
//                                             backgroundColor: feature.color,
//                                             boxShadow: `0 0 20px ${feature.color}30`
//                                         }}
//                                     >
//                                         {feature.icon}
//                                     </div>

//                                     <CardTitle
//                                         className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
//                                     >
//                                         {feature.title}
//                                     </CardTitle>
//                                 </CardHeader>

//                                 <CardContent>
//                                     <CardDescription className="text-base text-gray-600 dark:text-gray-300">
//                                         {feature.description}
//                                     </CardDescription>
//                                 </CardContent>

//                                 {/* Simple accent line */}
//                                 <div
//                                     className="h-1 w-0 group-hover:w-full transition-all duration-300 absolute bottom-0 left-0"
//                                     style={{ backgroundColor: feature.color }}
//                                 />
//                             </Card>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Simple badge */}
//                 <motion.div
//                     className="mt-12 flex justify-center"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 
//                                border border-blue-100 dark:border-blue-800 text-gray-700 dark:text-gray-300 text-sm">
//                         <span>Powered by advanced AI technology</span>
//                         <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                     </div>
//                 </motion.div>
//             </motion.div>
//         </section>
//     );
// }

"use client";

import { motion } from "framer-motion";
import {
    MessageSquare,
    Shield,
    Zap,
    Wallet,
    Sparkles,
    Search,
    BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useRef } from "react";

// Brand colors matching the hero section
const BRAND_COLORS = {
    blue: "#3b82f6",
    teal: "#14b8a6",
    pink: "#ec4899",
    purple: "#8b5cf6",
    orange: "#f97316",
    yellow: "#f59e0b"
};

const features = [
    {
        icon: <MessageSquare className="h-6 w-6" />,
        title: "Natural Language Commands",
        description: "Interact with your wallet using conversational language—just like chatting with a friend.",
        color: BRAND_COLORS.blue
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: "Glanceable Security",
        description: "Transaction details are clear and unambiguous, giving you confidence in every action.",
        color: BRAND_COLORS.purple
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Zero Learning Curve",
        description: "No complex menus or technical jargon—begin using instantly with intuitive interface.",
        color: BRAND_COLORS.orange
    },
    {
        icon: <Wallet className="h-6 w-6" />,
        title: "MetaMask Integration",
        description: "Seamlessly connects with your MetaMask wallet for a unified crypto experience.",
        color: BRAND_COLORS.pink
    },
    {
        icon: <Sparkles className="h-6 w-6" />,
        title: "Smart Suggestions",
        description: "AI-powered autocomplete for common commands and actions saves you time.",
        color: BRAND_COLORS.teal
    },
    {
        icon: <Search className="h-6 w-6" />,
        title: "ENS Resolution",
        description: "View human-readable names instead of long hexadecimal addresses.",
        color: BRAND_COLORS.orange
    },
    {
        icon: <BarChart3 className="h-6 w-6" />,
        title: "Portfolio Dashboard",
        description: "Get a complete overview of your crypto portfolio with detailed charts and analytics.",
        color: BRAND_COLORS.purple
    },
];

export function FeaturesSection() {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            className="relative pt-8 pb-16 bg-gradient-to-b from-transparent via-slate-50/90 to-white dark:from-transparent dark:via-slate-900/90 dark:to-gray-900 backdrop-blur-sm"
        >
            {/* Seamless transition elements from hero to features */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Continuation of particle effect at the top */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-transparent">
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#featuresConnector)" />
                            <defs>
                                <linearGradient id="featuresConnector" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                                    <stop offset="50%" stopColor="#ec4899" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Subtle animated circles matching the hero */}
                <motion.div
                    className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-pink-500/5 dark:bg-pink-500/10 blur-3xl"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 0.9, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>

            <motion.div
                className="container max-w-7xl mx-auto relative z-10 px-4 md:px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12"
                >
                    <span className="rounded-full bg-gradient-to-r from-blue-500/15 to-teal-500/15 dark:from-blue-500/25 dark:to-teal-500/25 border border-blue-200 dark:border-blue-800/50 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
                        Features
                    </span>

                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                        Why AI Wallet Assistant?
                    </h2>

                    <p className="max-w-[85%] leading-normal text-gray-600 dark:text-gray-300 sm:text-lg">
                        Designed for efficiency, clarity, and simplicity in handling cryptocurrency transactions
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={fadeInUp}
                            transition={{
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                            className="w-full"
                        >
                            <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50
                                shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                                <CardHeader className="pb-2 space-y-2">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-full text-white"
                                        style={{
                                            background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                                            boxShadow: `0 0 12px ${feature.color}40`
                                        }}
                                    >
                                        {feature.icon}
                                    </div>

                                    <CardTitle
                                        className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-transparent 
                                        group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(135deg, ${feature.color}, ${BRAND_COLORS.teal})`
                                        }}
                                    >
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>

                                {/* Glow effect on hover matching the hero button style */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                                    style={{
                                        background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)`,
                                    }}
                                />

                                {/* Bottom accent line */}
                                <div
                                    className="h-0.5 w-0 group-hover:w-full transition-all duration-300 absolute bottom-0 left-0"
                                    style={{ backgroundColor: feature.color }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Badge that matches hero style */}
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30
                                border border-blue-200/50 dark:border-blue-700/50 text-gray-700 dark:text-gray-300 text-sm font-medium backdrop-blur-sm shadow-sm"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                            transition: { duration: 0.2 }
                        }}
                    >
                        <span>Powered by advanced AI technology</span>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}