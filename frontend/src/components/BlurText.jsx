import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import React from "react";

export const BlurText = ({
  children,
  className = "",
  delay = 0,
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.5,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const initial = {
    opacity: 0,
    y: direction === "top" ? -30 : 30,
    filter: "blur(8px)",
  };

  const animate = {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: stepDuration,
      delay,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      className={className}
    >
      {children}
    </motion.div>
  );
};
