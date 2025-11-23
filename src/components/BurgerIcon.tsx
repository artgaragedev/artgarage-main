import { motion } from 'framer-motion'

interface BurgerIconProps {
  isOpen: boolean
  onClick: () => void
  className?: string
  children?: React.ReactNode
}

export const BurgerIcon = ({ isOpen, onClick, className = '', children }: BurgerIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 focus:outline-none group ${className}`}
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
    >
      <div className="w-6 h-5 flex flex-col justify-center gap-[5px] flex-shrink-0">
        <motion.span
          className="w-full h-[2px] bg-current rounded-full origin-center"
          animate={
            isOpen
              ? { rotate: 45, y: 7 }
              : { rotate: 0, y: 0 }
          }
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        <motion.span
          className="w-full h-[2px] bg-current rounded-full"
          animate={
            isOpen
              ? { opacity: 0, scale: 0.5 }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        <motion.span
          className="w-full h-[2px] bg-current rounded-full origin-center"
          animate={
            isOpen
              ? { rotate: -45, y: -7 }
              : { rotate: 0, y: 0 }
          }
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      </div>
      {children}
    </button>
  )
}
