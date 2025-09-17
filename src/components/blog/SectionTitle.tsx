import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SectionTitleProps {
  badge: string;
  title: string;
  description: string;
  badgeColor?: 'primary' | 'secondary' | 'accent' | 'neutral';
  titleGradient?: boolean;
  className?: string;
  animationDelay?: number;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  badge,
  title,
  description,
  badgeColor = 'primary',
  titleGradient = false,
  className = '',
  animationDelay = 0,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      className={`text-center mb-12 ${className}`}
    >
      <span className={`badge badge-${badgeColor} px-5 py-3 mb-4 text-${badgeColor}-content`}>
        {t(badge)}
      </span>
      
      <h2 
        className={`text-3xl md:text-5xl font-bold mb-6 ${
          titleGradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent' : 'text-adaptive'
        }`}
      >
        {t(title)}
      </h2>
      
      <p className="mt-3 text-adaptive-muted max-w-2xl mx-auto text-lg">
        {t(description)}
      </p>
    </motion.div>
  );
};

export default SectionTitle; 