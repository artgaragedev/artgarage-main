"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

// Enhanced close button with better accessibility
function DrawerCloseButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      data-slot="drawer-close-button"
      className={cn(
        "absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-[#EA3C23] focus:ring-offset-2",
        className
      )}
      aria-label="Закрыть"
      {...props}
    />
  )
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerHandle({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Handle>) {
  return (
    <DrawerPrimitive.Handle
      data-slot="drawer-handle"
      className="h-1.5 w-12 mx-auto mt-2 rounded-full bg-gray-300 dark:bg-gray-600 touch-none opacity-50 hover:opacity-80 transition-opacity"
      {...props}
    />
  )
}

const drawerOverlayVariants = cva(
  "fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm",
  {
    variants: {
      state: {
        open: "animate-in fade-in-0",
        closed: "animate-out fade-out-0"
      }
    },
    defaultVariants: {
      state: "closed"
    }
  }
)

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(drawerOverlayVariants({ state: "open" }), className)}
      {...props}
    />
  )
}

const drawerContentVariants = cva(
  "group/drawer-content bg-background fixed z-[120] flex h-auto flex-col",
  {
    variants: {
      direction: {
        top: "inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 max-h-[100dvh] rounded-t-lg border-t data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        right: "inset-y-0 right-0 w-3/4 border-l sm:max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        left: "inset-y-0 left-0 w-3/4 border-r sm:max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
      }
    },
    defaultVariants: {
      direction: "bottom"
    }
  }
)

interface DrawerContentProps extends React.ComponentProps<typeof DrawerPrimitive.Content> {
  showScrollIndicator?: boolean;
  direction?: 'top' | 'bottom' | 'left' | 'right';
}

function DrawerContent({
  className,
  children,
  showScrollIndicator = true,
  direction = 'bottom',
  ...props
}: DrawerContentProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const checkScrollable = () => {
      setIsScrollable(element.scrollHeight > element.clientHeight);
    };

    const handleScroll = () => {
      const progress = element.scrollTop / (element.scrollHeight - element.clientHeight);
      setScrollProgress(progress);
    };

    checkScrollable();
    element.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollable);

    return () => {
      element.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={contentRef}
        data-slot="drawer-content"
        className={cn(
          drawerContentVariants({ direction }),
          className
        )}
        {...props}
      >
        {children}
        
        {/* Scroll indicator for long content */}
        {showScrollIndicator && isScrollable && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-[#EA3C23] transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        )}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left sticky top-0 bg-background z-10 border-b border-border/50",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-[#EA3C23] focus:ring-offset-2 rounded", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerHandle,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

export type { DrawerContentProps }
export { DrawerCloseButton }
