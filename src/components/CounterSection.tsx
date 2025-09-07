import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CounterItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  color?: string;
}

interface CounterSectionProps {
  items: CounterItem[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  animationDuration?: number;
  className?: string;
}

const CounterSection: React.FC<CounterSectionProps> = ({
  items,
  title,
  subtitle,
  columns = 4,
  animationDuration = 2,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(items.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;

    const interval = 20; // ms between each increment
    const framesTotal = animationDuration * 1000 / interval;
    
    const incrementValues = items.map(item => item.value / framesTotal);
    const countersActive = new Array(items.length).fill(true);
    
    const timer = setInterval(() => {
      setCounts(prev => {
        const newCounts = [...prev];
        let allCompleted = true;
        
        for (let i = 0; i < items.length; i++) {
          if (countersActive[i]) {
            newCounts[i] = Math.min(newCounts[i] + incrementValues[i], items[i].value);
            countersActive[i] = newCounts[i] < items[i].value;
            allCompleted = allCompleted && !countersActive[i];
          }
        }
        
        if (allCompleted) {
          clearInterval(timer);
        }
        
        return newCounts;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, [isVisible, items, animationDuration]);

  // Grid columns class based on the columns prop
  const columnsClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-adaptive"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-adaptive-muted max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setIsVisible(true)}
        className={`grid ${columnsClass[columns]} gap-8`}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card bg-base-100 border border-base-content/5 shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            {item.icon && <div className="text-4xl mb-4 text-center" style={{ color: item.color || 'hsl(var(--p))' }}>{item.icon}</div>}
            <div className="flex justify-center items-baseline">
              {item.prefix && <span className="text-2xl font-bold mr-1">{item.prefix}</span>}
              <span className="text-4xl md:text-5xl font-bold" style={{ color: item.color || 'inherit' }}>
                {Math.round(counts[index])}
              </span>
              {item.suffix && <span className="text-2xl font-bold ml-1">{item.suffix}</span>}
            </div>
            <p className="mt-3 text-adaptive-muted font-medium">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CounterSection; 