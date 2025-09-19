"use client";
import { motion } from "framer-motion";

const SplitText = ({
  text,
  className = "",
  splitBy = "chars",
  delay = 0.05,
  duration = 0.5,
  tag = "p",
}) => {
  const letters = splitBy === "words" ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  };

  const Tag = motion[tag];

  return (
    <Tag
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
