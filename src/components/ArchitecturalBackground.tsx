
import React, { useEffect, useRef } from 'react';

const ArchitecturalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial sizing
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create architectural elements
    type Line = {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      speed: number;
    };

    // Generate grid lines
    const lines: Line[] = [];
    const linesCount = Math.floor(window.innerWidth / 50);

    for (let i = 0; i < linesCount; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: 0,
        x2: Math.random() * canvas.width,
        y2: canvas.height,
        opacity: 0.03 + Math.random() * 0.05,
        speed: 0.1 + Math.random() * 0.3,
      });

      lines.push({
        x1: 0,
        y1: Math.random() * canvas.height,
        x2: canvas.width,
        y2: Math.random() * canvas.height,
        opacity: 0.03 + Math.random() * 0.05,
        speed: 0.1 + Math.random() * 0.3,
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(100, 100, 120, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Move vertical lines
        if (line.y2 === canvas.height) {
          line.x1 += line.speed;
          line.x2 += line.speed;
          
          // Reset when out of bounds
          if (line.x1 > canvas.width) {
            line.x1 = -10;
            line.x2 = -10;
          }
        } else {
          // Move horizontal lines
          line.y1 += line.speed;
          line.y2 += line.speed;
          
          // Reset when out of bounds
          if (line.y1 > canvas.height) {
            line.y1 = -10;
            line.y2 = -10;
          }
        }
      });

      // Draw some architectural circles
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 5) * i + (Math.sin(Date.now() * 0.001 + i) * 20);
        const y = (canvas.height / 3) + (Math.cos(Date.now() * 0.001 + i) * 20);
        const radius = 40 + Math.sin(Date.now() * 0.002 + i * 0.5) * 10;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 100, 120, 0.05)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default ArchitecturalBackground;
