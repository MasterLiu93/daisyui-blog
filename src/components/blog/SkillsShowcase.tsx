import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
  color?: string;
  icon?: string;
}

interface SkillsShowcaseProps {
  skills: Skill[];
  title?: string;
  subtitle?: string;
  columns?: 1 | 2 | 3 | 4;
}

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({
  skills,
  title,
  subtitle,
  columns = 2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Only animate once when component becomes visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);
  
  // Grid columns class based on the columns prop
  const columnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => setIsVisible(true)}
      className="w-full"
    >
      {title && (
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-2 text-adaptive"
        >
          {title}
        </motion.h3>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8 text-adaptive-muted"
        >
          {subtitle}
        </motion.p>
      )}
      
      <div className={`grid ${columnsClass[columns]} gap-6 mt-4`}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-base-200/50 rounded-xl p-6 border border-base-content/5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-3">
              {skill.icon && (
                <div className="mr-3 text-2xl">
                  <i className={skill.icon}></i>
                </div>
              )}
              <h4 className="text-lg font-semibold text-adaptive">{skill.name}</h4>
            </div>
            
            <div className="h-3 w-full bg-base-300 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                style={{ 
                  background: skill.color || "hsl(var(--p))",
                }}
              />
            </div>
            
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-adaptive-muted">Proficiency</span>
              <span className="font-medium text-adaptive">{skill.level}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsShowcase; 