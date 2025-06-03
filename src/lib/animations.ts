export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const slideUp = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: "easeIn" }
  }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
} 