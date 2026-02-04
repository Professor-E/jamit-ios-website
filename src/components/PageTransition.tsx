"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldAnimate = pathname === "/about-us" || pathname === "/contact";

  return (
    <motion.div
      key={pathname}
      initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
