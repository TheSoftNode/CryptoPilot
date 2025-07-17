"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Circle, Hash, Database, Shield, Hexagon, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useEffect, useRef, useState, ReactNode, FC } from "react";

export const HeroSection: FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[75vh] overflow-hidden pb-16 pt-12 flex items-center justify-center">
            {/* Particle network background effect */}
            <div className="absolute inset-0 -z-10">
                <ParticleNetwork />
            </div>

            {/* Background glow effects with enhanced brand colors */}
            <motion.div
                className="absolute left-1/4 top-1/4 -z-10 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [0, -50]),
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0]),
                }}
            />
            <motion.div
                className="absolute right-1/4 bottom-1/4 -z-10 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[120px]"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [0, 50]),
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.7, 0.1]),
                }}
            />
            <motion.div
                className="absolute right-1/2 top-1/3 -z-10 w-[300px] h-[300px] rounded-full bg-orange-400/15 blur-[80px]"
                style={{
                    x: useTransform(scrollYProgress, [0, 1], [20, -20]),
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0]),
                }}
            />
            <motion.div
                className="absolute left-1/3 bottom-1/4 -z-10 w-[250px] h-[250px] rounded-full bg-teal-500/15 blur-[90px]"
                style={{
                    y: useTransform(scrollYProgress, [0, 1], [0, 30]),
                    opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0.1]),
                }}
            />

            {/* Floating crypto symbols */}
            <div className="absolute inset-0 -z-5 overflow-hidden">
                <FloatingCryptoSymbols mousePosition={mousePosition} />
            </div>

            <motion.div
                className="container relative z-10 px-4 max-w-6xl"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                style={{ opacity, scale }}
            >
                <div className="flex flex-col items-center gap-8 text-center mx-auto">
                    <motion.div
                        variants={fadeInUp}
                        className="relative"
                    >
                        <span className="absolute -inset-1 rounded-full blur-xl bg-gradient-to-r from-blue-500/20 via-pink-500/20 to-purple-600/20 opacity-70"></span>
                        <span className="relative rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-500 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-400">
                            Introducing AI Wallet Assistant
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 dark:from-blue-400 dark:via-teal-300 dark:to-pink-400"
                    >
                        Your Smart Crypto Companion
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="max-w-[40rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
                    >
                        Manage your cryptocurrency with natural language commands.
                        Seamless MetaMask integration for a frictionless Web3 experience.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap items-center justify-center gap-4 mt-2"
                    >
                        <Link href="/chat">
                            <HoverGlowButton variant="primary">
                                Launch Assistant
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </HoverGlowButton>
                        </Link>
                        <Link href="/tutorials">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10 dark:border-blue-400/50 dark:text-blue-400 dark:hover:bg-blue-400/10 backdrop-blur-sm"
                            >
                                Learn How It Works
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Animated foreground elements */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10"></div> */}
            <div className="absolute bottom-0 left-0 right-0 h-0 dark:h-1 bg-gradient-to-t from-slate-700 to-transparent z-10"></div>
        </section>
    );
}

interface HoverGlowButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

const HoverGlowButton: FC<HoverGlowButtonProps> = ({ children, variant = "primary" }) => {
    const gradientClasses = {
        primary: "from-blue-600 via-teal-500 to-blue-400",
        secondary: "from-pink-600 via-orange-500 to-yellow-400"
    };

    const buttonClasses = {
        primary: "bg-blue-500 hover:bg-blue-600",
        secondary: "bg-pink-500 hover:bg-pink-600"
    };

    return (
        <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradientClasses[variant]} rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200`}></div>
            <Button
                size="lg"
                className={`relative ${buttonClasses[variant]} text-white font-medium px-6 flex items-center gap-2`}
            >
                {children}
            </Button>
        </motion.div>
    );
};

const ParticleNetwork: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        interface Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            opacity: number;
        }

        let particles: Particle[] = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 12), 80); // Slightly reduced for performance
        const connectionDistance = 140;
        const animationSpeed = 0.18;

        // Create particles with varied colors from brand palette
        const colors = ['#3b82f6', '#f43f5e', '#06b6d4', '#f59e0b', '#8b5cf6'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * animationSpeed,
                speedY: (Math.random() - 0.5) * animationSpeed,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                // Move particle
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.replace('rgb', 'rgba').replace(')', `,${particle.opacity})`);
                ctx.fill();

                // Draw connections
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        const opacity = (1 - distance / connectionDistance) * 0.15;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

interface FloatingCryptoSymbolsProps {
    mousePosition: {
        x: number;
        y: number;
    };
}

interface SymbolConfig {
    Icon: LucideIcon;
    size: number;
    x: number;
    y: number;
    delay: number;
    color: string;
}

const FloatingCryptoSymbols: FC<FloatingCryptoSymbolsProps> = ({ mousePosition }) => {
    // Crypto icons/symbols with varied brand colors
    const symbols: SymbolConfig[] = [
        { Icon: Hexagon, size: 40, x: 15, y: 20, delay: 0, color: "text-blue-500/50" },
        { Icon: Circle, size: 30, x: 80, y: 40, delay: 0.5, color: "text-pink-500/50" },
        { Icon: Hash, size: 35, x: 70, y: 75, delay: 1, color: "text-teal-500/50" },
        { Icon: Shield, size: 25, x: 25, y: 70, delay: 1.5, color: "text-orange-400/50" },
        { Icon: Database, size: 28, x: 85, y: 15, delay: 2, color: "text-yellow-500/50" }
    ];

    return (
        <>
            {symbols.map((symbol, index) => (
                <motion.div
                    key={index}
                    className="absolute opacity-10"
                    style={{
                        left: `${symbol.x}%`,
                        top: `${symbol.y}%`,
                        x: (mousePosition.x - 0.5) * -30,
                        y: (mousePosition.y - 0.5) * -30
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.12,
                        scale: 1,
                        y: [0, -15, 0],
                    }}
                    transition={{
                        delay: symbol.delay,
                        y: {
                            repeat: Infinity,
                            duration: 3 + index,
                            ease: "easeInOut"
                        }
                    }}
                >
                    <symbol.Icon
                        size={symbol.size}
                        className={symbol.color}
                    />
                </motion.div>
            ))}
        </>
    );
};