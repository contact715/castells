
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const AnimatedListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const animations = {
    initial: { scale: 0.95, opacity: 0, y: -10 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full mb-4 last:mb-0 origin-top">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  className?: string
  maxItems?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 2000, maxItems = 3, ...props }: AnimatedListProps) => {
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
    
    // Fix: Use Date.now() for keys to avoid side-effects during render (mutating refs)
    const [items, setItems] = useState<Array<{ key: number; component: React.ReactNode }>>(() => {
       if (childrenArray.length > 0) {
           return [{ key: Date.now(), component: childrenArray[0] }];
       }
       return [];
    });
    
    const nextIndex = useRef(1);

    useEffect(() => {
      if (childrenArray.length === 0) return;

      const interval = setInterval(() => {
        setItems((prev) => {
          const idx = nextIndex.current % childrenArray.length;
          // Use Date.now() + Math.random() to ensure uniqueness even if interval is fast
          const newItem = { key: Date.now() + Math.random(), component: childrenArray[idx] };
          nextIndex.current += 1;
          
          const newItems = [newItem, ...prev];
          
          if (newItems.length > maxItems) {
             return newItems.slice(0, maxItems);
          }
          return newItems;
        });
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray, delay, maxItems]);

    return (
      <div
        className={cn(`flex flex-col`, className)}
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <AnimatedListItem key={item.key}>
              {item.component}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
