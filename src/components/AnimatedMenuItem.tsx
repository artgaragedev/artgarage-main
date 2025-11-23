'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedMenuItemProps {
  children: ReactNode
  delay: number
}

export const AnimatedMenuItem = ({ children, delay }: AnimatedMenuItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: -20, y: 10 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
