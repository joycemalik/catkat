import React, { useState, useEffect, useRef } from 'react';

// --- CONFIGURATION ---
// Mapped to actual folders found in public/sprites/
const ANIMATIONS = {
    // STATE : { folder, frames, speed }

    // IDLE STATES
    idle: { folder: 'curious annoyed', frames: 16, speed: 150 }, // Using 'curious annoyed' as idle since 'idle looking' is missing config
    judge: { folder: 'curious annoyed', frames: 16, speed: 150 },

    // MOVEMENT
    walking: { folder: 'walking', frames: 6, speed: 120 },
    run: { folder: 'walking', frames: 6, speed: 80 }, // Re-use walking but faster

    // ACTIONS
    sleep: { folder: 'sleeping', frames: 16, speed: 200 },
    sleepy: { folder: 'FallingAsleep', frames: 8, speed: 200 }, // Assuming 8 frames, update if needed.
    waking: { folder: 'waking up', frames: 16, speed: 150 },

    eating: { folder: 'eating', frames: 7, speed: 150 },
    eat: { folder: 'eating', frames: 7, speed: 150 },

    drinking: { folder: 'drinking', frames: 8, speed: 150 },
    drink: { folder: 'drinking', frames: 8, speed: 150 },

    // FALLBACKS
    happy: { folder: 'walking', frames: 6, speed: 120 },
    curious: { folder: 'curious annoyed', frames: 16, speed: 150 },
    glitch: { folder: 'curious annoyed', frames: 16, speed: 50 }, // Fast glitch
};

const FrameCat = ({ state }) => {
    // 1. Determine which animation to play
    // If the game state (e.g. "booped") doesn't match a folder, fall back to 'idle'
    // Normalize state to lowercase to be safe
    const safeState = (state || 'idle').toLowerCase();
    const animKey = ANIMATIONS[safeState] ? safeState : 'idle';
    const config = ANIMATIONS[animKey];

    const [currentFrame, setCurrentFrame] = useState(0);
    const frameRef = useRef(0); // Keeps track without re-rendering issues

    // 2. The Animation Loop
    useEffect(() => {
        // Reset frame when state changes (e.g. from walking to sleeping)
        setCurrentFrame(0);
        frameRef.current = 0;

        const interval = setInterval(() => {
            // Loop logic: (0 -> 1 -> 2 -> ... -> 0)
            if (config) {
                frameRef.current = (frameRef.current + 1) % config.frames;
                setCurrentFrame(frameRef.current);
            }
        }, config ? config.speed : 100);

        return () => clearInterval(interval);
    }, [animKey, config]);

    if (!config) return null;

    // 3. Construct the Path
    // Assuming your images are PNGs.
    const imagePath = `/sprites/${config.folder}/${currentFrame}.png`;

    return (
        <div className="w-64 h-64 flex items-end justify-center pointer-events-none relative group">
            {/* Ambient Shadow (Softens ground contact) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-[#3E2723] opacity-20 blur-lg rounded-[100%]" />

            <img
                src={imagePath}
                alt={`Mochi ${animKey}`}
                className="w-full h-full object-contain pixelated relative z-10 transition-all duration-300"
                // 'pixelated' keeps it crisp if you scale it up
                // Filters: Lower contrast to match soft room, subtle warm glow from right (drop-shadow)
                style={{
                    imageRendering: 'pixelated',
                    filter: 'contrast(0.95) brightness(1.02) drop-shadow(2px 0 2px rgba(255, 200, 150, 0.15))'
                }}
            />

            {/* Preload images to prevent flickering (Invisible) */}
            <div className="hidden">
                {Array.from({ length: config.frames }).map((_, i) => (
                    <img key={i} src={`/sprites/${config.folder}/${i}.png`} alt="preload" />
                ))}
            </div>
        </div>
    );
};

export default FrameCat;
