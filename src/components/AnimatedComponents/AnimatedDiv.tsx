"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

type Props = HTMLMotionProps<"div"> & {};

const AnimatedDiv = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});

export default AnimatedDiv;
