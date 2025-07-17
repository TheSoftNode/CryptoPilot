export const fadeIn = {
    hidden: {
        y: 20,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

export const fadeInUp = {
    hidden: {
        y: 30,
        opacity: 0
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const fadeInDown = {
    hidden: {
        y: -30,
        opacity: 0
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const fadeInLeft = {
    hidden: {
        x: -30,
        opacity: 0
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const fadeInRight = {
    hidden: {
        x: 30,
        opacity: 0
    },
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const zoomIn = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10
        }
    }
};

export const slideInBottom = {
    hidden: {
        y: "100%",
        opacity: 0
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export const contentAnimation = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        transition: {
            duration: 0.5
        }
    }
};

export const itemFadeInUp = (delay: number = 0) => ({
    hidden: { y: 20, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8,
            delay
        }
    }
});

export const hoverScale = {
    whileHover: {
        scale: 1.02,
        transition: { duration: 0.2 }
    }
};

export const buttonAnimation = {
    whileHover: {
        scale: 1.03,
        backgroundColor: "#E67E22",
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    whileTap: {
        scale: 0.97
    }
};