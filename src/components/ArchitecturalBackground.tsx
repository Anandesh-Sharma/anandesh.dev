
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

    // Generate elegant grid lines
    const lines: Line[] = [];
    const linesCount = Math.floor(window.innerWidth / 100); // Fewer lines for a cleaner look

    for (let i = 0; i < linesCount; i++) {
      lines.push({
        x1: Math.random() * canvas.width,
        y1: 0,
        x2: Math.random() * canvas.width,
        y2: canvas.height,
        opacity: 0.02 + Math.random() * 0.03, // More subtle opacity
        speed: 0.05 + Math.random() * 0.15, // Slower movement
      });

      lines.push({
        x1: 0,
        y1: Math.random() * canvas.height,
        x2: canvas.width,
        y2: Math.random() * canvas.height,
        opacity: 0.02 + Math.random() * 0.03,
        speed: 0.05 + Math.random() * 0.15,
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle, elegant grid lines
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(100, 100, 120, ${line.opacity})`;
        ctx.lineWidth = 0.5; // Thinner lines for elegance
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

      // Draw subtle architectural circles
      for (let i = 0; i < 3; i++) {
        const x = (canvas.width / 3) * i + (Math.sin(Date.now() * 0.0005 + i) * 10);
        const y = (canvas.height / 2) + (Math.cos(Date.now() * 0.0005 + i) * 10);
        const radius = 100 + Math.sin(Date.now() * 0.001 + i * 0.5) * 20;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(100, 100, 120, 0.03)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw some elegant golden ratio spirals
      drawArchitecturalSpiral(ctx, canvas.width * 0.8, canvas.height * 0.3, 10, 0.1);
      drawArchitecturalSpiral(ctx, canvas.width * 0.2, canvas.height * 0.7, 10, 0.1);

      animationFrameId = window.requestAnimationFrame(animate);
    };

    // Function to draw an elegant spiral (golden ratio)
    function drawArchitecturalSpiral(
      context: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      opacity: number
    ) {
      const growthFactor = 1.618; // Golden ratio
      const maxRadius = 80;
      const angleIncrement = Math.PI / 10;
      let angle = 0;
      let radius = size;
      
      context.beginPath();
      context.moveTo(x, y);
      
      while (radius < maxRadius) {
        angle += angleIncrement;
        radius *= growthFactor / 10;
        const newX = x + Math.cos(angle) * radius;
        const newY = y + Math.sin(angle) * radius;
        
        context.lineTo(newX, newY);
        if (radius > maxRadius) break;
      }
      
      context.strokeStyle = `rgba(100, 100, 120, ${opacity})`;
      context.lineWidth = 0.5;
      context.stroke();
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};

export default ArchitecturalBackground;
