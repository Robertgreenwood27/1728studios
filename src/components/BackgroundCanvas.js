
import { useEffect } from 'react';

const BackgroundCanvas = ({ isLoading }) => {
  useEffect(() => {
    console.log("isLoading in BackgroundCanvas:", isLoading); // Debugging statement

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Style settings based on isLoading
    const nodeColor = isLoading ? 'rgba(255, 0, 0, 0.1)' : 'rgba(137, 207, 240, 0.1)'; // Red when loading
    const lineColor = isLoading ? 'rgba(255, 0, 0, 0.1)' : 'rgba(137, 207, 240, 0.1)'; // Redder lines when loading
    const nodeRadius = 1;
    const lineWidth = 1;

    // Adjust the velocity multiplier based on loading state
    const velocityMultiplier = isLoading ? 0.06 : 1; // Adjust velocity depending on loading state

    // Mouse position
    const mouse = {
      x: null,
      y: null,
      gravityRadius: 150 // Radius of mouse's gravitational pull
    };

    // Update mouse position on mousemove
    const updateMousePosition = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Node creation
    const nodes = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * velocityMultiplier,
        vy: (Math.random() - 0.5) * velocityMultiplier,
      });
    }

    // Resize listener
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    let animationFrameId;

    // Animation update function
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off the edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connect nodes with lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Draw line if close enough
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Attract nodes to the mouse cursor
        const dx = mouse.x - nodes[i].x;
        const dy = mouse.y - nodes[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.gravityRadius) {
          nodes[i].vx += (dx / distance) * 0.005;
          nodes[i].vy += (dy / distance) * 0.005;
        }
      }

      // Request next animation frame
      animationFrameId = requestAnimationFrame(update);
    };

    // Start the animation
    update();

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId); // Cancel the animation frame on cleanup
    };
  }, [isLoading]); // Dependency array

  return <canvas id="canvas" />;
};

export default BackgroundCanvas;