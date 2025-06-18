// src/components/AnimatedBackground.jsx
import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function AnimatedBackground() {
  const [floatingElements, setFloatingElements] = useState([]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Generate floating specialty elements
  useEffect(() => {
    const elements = [];
    const specialtyIcons = [
      // Computer Science & Technology
      "💻", "🖥️", "📱", "⌨️", "🖱️", "🔌", "🤖", "🧬", "📡",
      // Medicine & Health
      "🩺", "💊", "🏥", "🧪", "🔬", "🦷", "👨‍⚕️", "💉", "🫀", "🧠",
      // Law & Justice
      "⚖️", "📜", "🏛️", "👨‍⚖️", "📋", "🔍", "📝", "⚡", "🎯", "📊",
      // Engineering
      "⚙️", "🔧", "🏗️", "🔩", "📐", "📏", "🏭",
      // Business & Economics
      "💼", "📈", "💰", "🏦", "📊", "💳", "🤝",
      // Science & Research
      "🔬", "🧪", "⚗️", "🌡️", "🔭", "🌍", "⚛️", "🧲", "🔋", "📡"
    ];
    
    for (let i = 0; i < 25; i++) {
      elements.push({
        id: i,
        icon: specialtyIcons[Math.floor(Math.random() * specialtyIcons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 20,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.2 + 0.1,
        rotationSpeed: Math.random() * 4 + 2,
        bounceHeight: Math.random() * 30 + 20,
      });
    }
    setFloatingElements(elements);
  }, []);

  return (
    <>
      {/* Particles Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: false,
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 80,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: ["#3B82F6", "#14B8A6", "#22C55E", "#059669", "#0284C7", "#0EA5E9"],
              },
              links: {
                color: "#14B8A6",
                distance: 120,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.8,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1000,
                },
                value: 35,
              },
              opacity: {
                value: 0.5,
                random: true,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                },
              },
              shape: {
                type: ["circle", "triangle", "square"],
              },
              size: {
                value: { min: 2, max: 4 },
                random: true,
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 1,
                },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Floating Specialty Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute animate-specialty-float"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              fontSize: `${element.size}px`,
              opacity: element.opacity,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              '--rotation-speed': `${element.rotationSpeed}s`,
              '--bounce-height': `${element.bounceHeight}px`,
            }}
          >
            <div className="animate-specialty-rotate hover:animate-specialty-pulse">
              {element.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Computer Science Theme */}
        <div className="absolute top-1/4 left-1/6 w-20 h-20 border-2 border-blue-300/40 rounded-lg animate-code-matrix transform rotate-45"></div>
        <div className="absolute top-1/3 right-1/5 w-16 h-16 border-2 border-teal-300/40 animate-pulse-slow">
          <div className="w-full h-full border-2 border-teal-400/30 rounded-full animate-orbit"></div>
        </div>
        
        {/* Medical Theme */}
        <div className="absolute top-2/3 left-1/3 w-18 h-18 border-2 border-green-300/40 animate-heartbeat">
          <div className="w-2 h-8 bg-green-300/30 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-8 h-2 bg-green-300/30 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Law Theme */}
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-2 border-blue-400/30 animate-scale-balance">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-400/30 transform -translate-x-1/2"></div>
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-blue-400/30"></div>
        </div>
        
        {/* Engineering Gears */}
        <div className="absolute top-1/2 left-1/8 w-14 h-14 border-4 border-teal-400/30 rounded-full animate-gear-rotate">
          <div className="absolute inset-2 border-2 border-teal-300/40 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/5 w-10 h-10 border-4 border-green-400/30 rounded-full animate-gear-reverse">
          <div className="absolute inset-1 border-2 border-green-300/40 rounded-full"></div>
        </div>
        
        {/* Knowledge Connection Networks */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="33%" stopColor="#14B8A6" />
              <stop offset="66%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Tech Network */}
          <path
            d="M 50 200 Q 200 50 400 200 Q 600 350 800 200 Q 1000 50 1200 200"
            stroke="url(#techGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            className="animate-circuit-flow"
          />
          
          {/* Medical Pulse */}
          <path
            d="M 100 400 L 200 400 L 250 300 L 300 500 L 350 200 L 400 400 L 600 400"
            stroke="#22C55E"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            className="animate-pulse-line"
          />
          
          {/* Law Balance */}
          <path
            d="M 150 600 Q 400 450 650 600 Q 900 750 1150 600"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            className="animate-balance-wave"
          />
          
          {/* Connection Nodes */}
          <circle cx="200" cy="200" r="8" fill="#3B82F6" opacity="0.6" className="animate-node-pulse">
            <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="600" cy="400" r="6" fill="#22C55E" opacity="0.7" className="animate-node-pulse">
            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="1000" cy="300" r="7" fill="#14B8A6" opacity="0.6" className="animate-node-pulse">
            <animate attributeName="r" values="7;11;7" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <style jsx>{`
        @keyframes specialty-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(var(--bounce-height, -25px)) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(calc(var(--bounce-height, -25px) * 0.6)) translateX(-5px) rotate(-3deg);
          }
          75% {
            transform: translateY(calc(var(--bounce-height, -25px) * 0.8)) translateX(8px) rotate(7deg);
          }
        }

        @keyframes specialty-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes specialty-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
        }

        @keyframes code-matrix {
          0%, 100% {
            transform: rotate(45deg) scale(1);
            border-color: rgba(59, 130, 246, 0.4);
          }
          25% {
            transform: rotate(45deg) scale(1.1);
            border-color: rgba(20, 184, 166, 0.6);
          }
          50% {
            transform: rotate(45deg) scale(1.2);
            border-color: rgba(34, 197, 94, 0.4);
          }
          75% {
            transform: rotate(45deg) scale(1.1);
            border-color: rgba(20, 184, 166, 0.6);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.3);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.3);
          }
          70% {
            transform: scale(1);
          }
        }

        @keyframes scale-balance {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        @keyframes gear-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes gear-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes circuit-flow {
          0% {
            stroke-dasharray: 20 10;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 20 10;
            stroke-dashoffset: 30;
          }
        }

        @keyframes pulse-line {
          0%, 100% {
            stroke-dasharray: 0 100;
          }
          50% {
            stroke-dasharray: 100 0;
          }
        }

        @keyframes balance-wave {
          0%, 100% {
            stroke-dasharray: 10 5;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 10 5;
            stroke-dashoffset: 15;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        .animate-specialty-float {
          animation: specialty-float infinite ease-in-out;
        }

        .animate-specialty-rotate {
          animation: specialty-rotate calc(var(--rotation-speed, 3s)) linear infinite;
        }

        .animate-specialty-pulse:hover {
          animation: specialty-pulse 0.6s ease-in-out;
        }

        .animate-code-matrix {
          animation: code-matrix 4s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-scale-balance {
          animation: scale-balance 6s ease-in-out infinite;
        }

        .animate-gear-rotate {
          animation: gear-rotate 10s linear infinite;
        }

        .animate-gear-reverse {
          animation: gear-reverse 8s linear infinite;
        }

        .animate-circuit-flow {
          animation: circuit-flow 3s linear infinite;
        }

        .animate-pulse-line {
          animation: pulse-line 2s ease-in-out infinite;
        }

        .animate-balance-wave {
          animation: balance-wave 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}