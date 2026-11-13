import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  energy: number;
}

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export const NetworkMeshCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean; pingRadius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    pingRadius: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Create Crimson & Obsidian network nodes
    const nodeCount = Math.min(Math.floor((width * height) / 17000), 75);
    let nodes: Particle[] = [];
    let packets: PulsePacket[] = [];

    const initNodes = () => {
      nodes = [];
      packets = [];
      const colors = ['#ff003c', '#e11d48', '#f43f5e', '#ffffff'];

      for (let i = 0; i < nodeCount; i++) {
        const baseRadius = Math.random() * 2 + 1.2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: Math.random() * 0.4 + 0.15, // steady soothing downward motion
          radius: baseRadius,
          baseRadius,
          color: colors[Math.floor(Math.random() * colors.length)],
          energy: Math.random() * 0.5 + 0.3
        });
      }
    };

    initNodes();

    // Mouse tracking for crimson radar ping
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let lastPacketSpawn = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Expand mouse radar ping ripple in vivid crimson
      if (mouseRef.current.active) {
        mouseRef.current.pingRadius = (mouseRef.current.pingRadius + 1.2) % 180;
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.pingRadius, 0, Math.PI * 2);
        const alpha = Math.max(0, 1 - mouseRef.current.pingRadius / 180) * 0.22;
        ctx.strokeStyle = `rgba(255, 0, 60, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        // Inner radar sweep ring
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.pingRadius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(225, 29, 72, ${alpha * 0.7})`;
        ctx.stroke();
        ctx.restore();
      }

      // Update and draw nodes with gentle downward drift
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around vertically for continuous downward stream
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Distance to cursor
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          p.radius = p.baseRadius * 1.8;
          p.energy = 1;
        } else {
          p.radius = Math.max(p.baseRadius, p.radius * 0.96);
          p.energy = Math.max(0.3, p.energy * 0.99);
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.energy * 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Connect nodes with subtle crimson laser lines
      const maxDist = 130;
      const connections: [number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 0, 60, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            connections.push([i, j]);
          }
        }
      }

      // Periodically spawn crimson data packets traversing edges
      if (time - lastPacketSpawn > 300 && connections.length > 0) {
        lastPacketSpawn = time;
        if (packets.length < 26) {
          const randomConn = connections[Math.floor(Math.random() * connections.length)];
          packets.push({
            fromNode: randomConn[0],
            toNode: randomConn[1],
            progress: 0,
            speed: 0.012 + Math.random() * 0.015,
            color: Math.random() > 0.35 ? '#ff003c' : '#ffffff'
          });
        }
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const n1 = nodes[pkt.fromNode];
        const n2 = nodes[pkt.toNode];
        if (!n1 || !n2) {
          packets.splice(i, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * pkt.progress;
        const py = n1.y + (n2.y - n1.y) * pkt.progress;

        // Packet glow point
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-jet">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65 will-change-transform" />
      {/* Laser mesh radial crimson glow at top */}
      <div className="absolute top-0 left-1/4 w-1/2 h-96 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-scarlet-dark/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-jet/40 via-transparent to-jet/85 pointer-events-none" />
    </div>
  );
};
