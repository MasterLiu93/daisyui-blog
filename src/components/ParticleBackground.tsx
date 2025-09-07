import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// 定义Particle接口
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  
  // 扩展属性
  vx?: number;
  vy?: number;
  currentSize?: number;
  currentOpacity?: number;
  trail?: {x: number, y: number}[];
  trailLength?: number;
  angle?: number;
  angleSpeed?: number;
  isOrbitCenter?: boolean;
  orbitCenter?: {x: number, y: number} | null;
  noiseOffsetX?: number;
  noiseOffsetY?: number;
  originalX?: number;
  originalY?: number;
  orbitRadius?: number;
  pulseTime?: number;
  orbitSpeed?: number;
  glow?: number;
  isStar?: boolean;
  starAngle?: number;
}

interface ParticleBackgroundProps {
  count?: number;
  color?: string;
  speed?: number;
  opacity?: number;
  interactive?: boolean;
  style?: 'default' | 'web' | 'cosmic' | 'flow';
  colorScheme?: 'mono' | 'gradient' | 'rainbow';
  customColors?: string[];
  maxSize?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 100,
  color = 'hsl(var(--p))',
  speed = 1,
  opacity = 0.3,
  interactive = true,
  style = 'default',
  colorScheme = 'mono',
  customColors = [],
  maxSize = 5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  
  // 生成颜色
  const getParticleColor = (index: number) => {
    if (colorScheme === 'mono') return color;
    
    if (colorScheme === 'gradient' && customColors.length >= 2) {
      const gradientPosition = index / count;
      const colorIndex = Math.floor(gradientPosition * (customColors.length - 1));
      return customColors[colorIndex] || color;
    }
    
    if (colorScheme === 'rainbow') {
      const hue = (index / count) * 360;
      return `hsl(${hue}, 80%, 60%)`;
    }
    
    return color;
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;
    
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };
    
    // Initialize canvas and add event listeners
    handleResize();
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
    }
    
    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Different animation styles
        if (style === 'default') {
          animateDefaultStyle(particle, ctx, canvas);
        } else if (style === 'web') {
          animateWebStyle(particle, ctx, canvas, index);
        } else if (style === 'cosmic') {
          animateCosmicStyle(particle, ctx, canvas);
        } else if (style === 'flow') {
          animateFlowStyle(particle, ctx, canvas);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Different animation styles
    const animateDefaultStyle = (particle: Particle, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        // Update position
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;
        
      // Loop around the edges of the screen
        if (particle.x > canvas.width) {
          particle.x = 0;
        } else if (particle.x < 0) {
          particle.x = canvas.width;
        }
        
        if (particle.y > canvas.height) {
          particle.y = 0;
        } else if (particle.y < 0) {
          particle.y = canvas.height;
        }
        
        // Interactive - particles move toward mouse position
        if (interactive) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const forceX = dx / (distance * 10) * speed;
            const forceY = dy / (distance * 10) * speed;
            particle.vx += forceX;
            particle.vy += forceY;
          }
        }
        
        // Apply some air friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Keep velocity within bounds
        const maxVelocity = 2;
        particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
        particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        
        // Draw connecting lines
        particlesRef.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 150) * opacity * 0.5;
          ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
    };
    
    const animateWebStyle = (particle: Particle, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, index: number) => {
      // Update position with slight wiggle movement
      particle.angle += particle.angleSpeed;
      const wiggle = Math.sin(particle.angle) * 0.5;
      
      particle.x += particle.vx * speed + wiggle;
      particle.y += particle.vy * speed;
      
      // Bounce off walls instead of looping
      if (particle.x > canvas.width || particle.x < 0) {
        particle.vx = -particle.vx;
      }
      
      if (particle.y > canvas.height || particle.y < 0) {
        particle.vy = -particle.vy;
      }
      
      // Interactive - particles flee from mouse
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const forceX = -dx / (distance * 5) * speed;
          const forceY = -dy / (distance * 5) * speed;
          particle.vx += forceX;
          particle.vy += forceY;
          
          // Increase size when mouse is near
          particle.currentSize = Math.min(particle.size * 1.5, particle.size * 2);
        } else {
          // Return to normal size
          particle.currentSize = particle.currentSize * 0.95 + particle.size * 0.05;
        }
      } else {
        particle.currentSize = particle.size;
      }
      
      // Apply friction
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Keep velocity within bounds
      const maxVelocity = 1.5;
      particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
      particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));
      
      // Draw the particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.fill();
      
      // Connect to nearby particles - create a web-like structure
      let connectCount = 0;
      particlesRef.current.forEach((otherParticle, otherIndex) => {
        if (index === otherIndex) return; // Skip self
        if (connectCount >= 3) return; // Limit connections per particle
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect based on distance and a probability factor
        if (distance < 200 && Math.random() > 0.99) {
          connectCount++;
          ctx.beginPath();
          ctx.strokeStyle = particle.color;
          ctx.globalAlpha = (1 - distance / 200) * opacity * 0.7;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    };
    
    const animateCosmicStyle = (particle: Particle, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Update position with orbital motion
      particle.angle += particle.orbitSpeed * speed;
      
      if (particle.orbitCenter) {
        // Orbital movement around a center
        const orbitX = particle.orbitCenter.x + Math.cos(particle.angle) * particle.orbitRadius;
        const orbitY = particle.orbitCenter.y + Math.sin(particle.angle) * particle.orbitRadius;
        particle.x = orbitX;
        particle.y = orbitY;
      } else {
        // Regular movement for non-orbiting particles
        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;
        
        if (particle.x > canvas.width + 100) {
          particle.x = -50;
        } else if (particle.x < -100) {
          particle.x = canvas.width + 50;
        }
        
        if (particle.y > canvas.height + 100) {
          particle.y = -50;
        } else if (particle.y < -100) {
          particle.y = canvas.height + 50;
        }
      }
      
      // Pulse size
      particle.pulseTime += 0.01;
      const pulseFactor = Math.sin(particle.pulseTime) * 0.5 + 0.5;
      particle.currentSize = particle.size * (1 + pulseFactor * 0.5);
      
      // Interactive effects - attract particles to mouse
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          // Create gravity well effect
          const forceX = dx / (distance * 20) * speed;
          const forceY = dy / (distance * 20) * speed;
          particle.vx += forceX;
          particle.vy += forceY;
          
          // Glow effect near mouse
          particle.glow = Math.max(0, 1 - distance / 300);
        } else {
          particle.glow = 0;
        }
      }
      
      // Draw particle with glow effect
      if (particle.glow > 0) {
        const glow = particle.glow * 20;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, particle.currentSize,
          particle.x, particle.y, particle.currentSize + glow
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.currentSize + glow, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.alpha * 0.5;
        ctx.fill();
      }
      
      // Draw main particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.fill();
      
      // Draw star effect
      if (particle.isStar) {
        const starSize = particle.currentSize * 2;
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.starAngle);
        particle.starAngle += 0.01;
        
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          ctx.rotate(Math.PI / 2);
          ctx.moveTo(0, 0);
          ctx.lineTo(0, starSize);
        }
        ctx.strokeStyle = particle.color;
        ctx.globalAlpha = particle.alpha * 0.5;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    };
    
    const animateFlowStyle = (particle: Particle, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      // Create flowing motion using perlin noise simulation
      const time = Date.now() * 0.0002;
      const noiseX = (particle.noiseOffsetX + time) * 1;
      const noiseY = (particle.noiseOffsetY + time) * 1;
      
      // Simplified noise approximation for flow field effect
      const angle = Math.sin(noiseX) * Math.cos(noiseY) * Math.PI * 2;
      
      // Gradually change direction
      particle.vx += Math.cos(angle) * 0.01 * speed;
      particle.vy += Math.sin(angle) * 0.01 * speed;
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Maximum velocity
      const maxVel = 1.5 * speed;
      const vel = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (vel > maxVel) {
        particle.vx = (particle.vx / vel) * maxVel;
        particle.vy = (particle.vy / vel) * maxVel;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen edges with a buffer
      if (particle.x > canvas.width + 50) {
        particle.x = -50;
      } else if (particle.x < -50) {
        particle.x = canvas.width + 50;
      }
      
      if (particle.y > canvas.height + 50) {
        particle.y = -50;
      } else if (particle.y < -50) {
        particle.y = canvas.height + 50;
      }
      
      // Interactive - particles are influenced by mouse
      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          // Vortex effect around mouse
          const angle = Math.atan2(dy, dx);
          const force = 0.05 * speed * (1 - distance / 200);
          particle.vx += Math.cos(angle + Math.PI / 2) * force;
          particle.vy += Math.sin(angle + Math.PI / 2) * force;
          
          // Increase opacity near mouse
          particle.currentOpacity = Math.min(1, particle.alpha * 2);
        } else {
          particle.currentOpacity = particle.alpha;
        }
      } else {
        particle.currentOpacity = particle.alpha;
      }
      
      // Calculate trail positions
      if (!particle.trail) {
        particle.trail = [];
      }
      
      // Add current position to trail
      particle.trail.unshift({ x: particle.x, y: particle.y });
      
      // Limit trail length
      if (particle.trail.length > particle.trailLength) {
        particle.trail.pop();
      }
      
      // Draw trail
      if (particle.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Gradient opacity for trail
        ctx.globalAlpha = particle.currentOpacity;
        ctx.stroke();
      }
      
      // Draw head particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.currentOpacity;
      ctx.fill();
    };
    
    // Initialize particles based on style
    function initParticles() {
      particlesRef.current = [];
      if (!canvas) return;
      
        for (let i = 0; i < count; i++) {
        const baseParticle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * speed,
            speedY: (Math.random() - 0.5) * speed,
          size: Math.random() * maxSize + 1,
          color: getParticleColor(i),
            alpha: Math.random() * opacity + 0.1,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
        };
        
        if (style === 'default') {
          particlesRef.current.push({
            ...baseParticle,
          });
        } else if (style === 'web') {
          particlesRef.current.push({
            ...baseParticle,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: 0.01 + Math.random() * 0.03,
            currentSize: baseParticle.size,
          });
        } else if (style === 'cosmic') {
          // Some particles orbit around centers
          const isOrbiter = Math.random() < 0.7;
          const isStar = Math.random() < 0.2;
          
          if (isOrbiter) {
            // Find or create orbit centers
            let orbitCenters = particlesRef.current.filter(p => p.isOrbitCenter);
            let orbitCenter;
            
            if (orbitCenters.length > 0 && Math.random() < 0.8) {
              // Use existing orbit center
              orbitCenter = orbitCenters[Math.floor(Math.random() * orbitCenters.length)];
            } else {
              // This particle is not an orbiter, it's a new orbit center
              orbitCenter = null;
            }
            
            particlesRef.current.push({
              ...baseParticle,
              orbitCenter: orbitCenter,
              orbitRadius: 20 + Math.random() * 80,
              angle: Math.random() * Math.PI * 2,
              orbitSpeed: 0.005 + Math.random() * 0.02,
              pulseTime: Math.random() * Math.PI * 2,
              currentSize: baseParticle.size,
              glow: 0,
              isStar,
              starAngle: Math.random() * Math.PI * 2,
            });
          } else {
            // Non-orbiting particles (could be orbit centers)
            particlesRef.current.push({
              ...baseParticle,
              isOrbitCenter: Math.random() < 0.2,
              orbitCenter: null,
              pulseTime: Math.random() * Math.PI * 2,
              currentSize: baseParticle.size,
              glow: 0,
              isStar: Math.random() < 0.3,
              starAngle: Math.random() * Math.PI * 2,
            });
          }
        } else if (style === 'flow') {
          particlesRef.current.push({
            ...baseParticle,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
            trail: [],
            trailLength: Math.floor(3 + Math.random() * 7),
            currentOpacity: baseParticle.alpha,
          });
        }
      }
    }
    
    initParticles();
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, color, speed, opacity, interactive, style, colorScheme, customColors, maxSize]);
  
  return (
    <>
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
      <motion.div 
        className="absolute inset-0 bg-black z-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </>
  );
};

export default ParticleBackground; 