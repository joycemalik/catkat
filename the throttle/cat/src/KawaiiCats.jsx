import React from 'react';

// --- 1. SHARED FACE COMPONENT (The "Soul" of the cuteness) ---
const KawaiiFace = ({
    offsetX = 0,
    offsetY = 0,
    eyeSpacing = 20,
    eyeSize = 5,
    sleep = false
}) => {
    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Blush */}
            <ellipse cx={-18} cy={8} rx={6} ry={3} fill="#FFB7B2" opacity="0.6" />
            <ellipse cx={18} cy={8} rx={6} ry={3} fill="#FFB7B2" opacity="0.6" />

            {/* Eyes or Sleeping Eyes */}
            {sleep ? (
                <>
                    {/* Sleeping ^ ^ eyes */}
                    <path d={`M-${eyeSpacing / 2 + 5} 0 Q -${eyeSpacing / 2} -5 -${eyeSpacing / 2 - 5} 0`} stroke="#4A3B2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d={`M${eyeSpacing / 2 - 5} 0 Q ${eyeSpacing / 2} -5 ${eyeSpacing / 2 + 5} 0`} stroke="#4A3B2A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
            ) : (
                <>
                    {/* Left Eye */}
                    <circle cx={-eyeSpacing / 2} cy={0} r={eyeSize} fill="#4A3B2A" />
                    <circle cx={-eyeSpacing / 2 + 2} cy={-2} r={eyeSize * 0.4} fill="white" /> {/* Big Sparkle */}
                    <circle cx={-eyeSpacing / 2 - 2} cy={2} r={eyeSize * 0.15} fill="white" /> {/* Tiny Sparkle */}

                    {/* Right Eye */}
                    <circle cx={eyeSpacing / 2} cy={0} r={eyeSize} fill="#4A3B2A" />
                    <circle cx={eyeSpacing / 2 + 2} cy={-2} r={eyeSize * 0.4} fill="white" />
                    <circle cx={eyeSpacing / 2 - 2} cy={2} r={eyeSize * 0.15} fill="white" />
                </>
            )}

            {/* Mouth (:3 style) */}
            <path
                d="M-5 5 Q -2.5 8 0 5 Q 2.5 8 5 5"
                stroke="#4A3B2A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    );
};

// --- CAT 1: ORANGE TABBY (SITTING) ---
export const CatOrangeSitting = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Tail */}
        <path d="M20 70 Q 10 70 10 50 Q 15 30 25 40" stroke="#E69F54" strokeWidth="8" fill="none" strokeLinecap="round" />

        {/* Body */}
        <ellipse cx="50" cy="65" rx="35" ry="30" fill="#F6C883" />
        {/* Stripes Body */}
        <path d="M20 60 Q 30 65 20 70" fill="none" stroke="#D98E3E" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 60 Q 70 65 80 70" fill="none" stroke="#D98E3E" strokeWidth="3" strokeLinecap="round" />

        {/* Head */}
        <circle cx="50" cy="40" r="28" fill="#F6C883" />

        {/* Ears */}
        <path d="M25 25 L 35 15 L 45 22 Z" fill="#F6C883" stroke="#D98E3E" strokeWidth="2" strokeLinejoin="round" />
        <path d="M75 25 L 65 15 L 55 22 Z" fill="#F6C883" stroke="#D98E3E" strokeWidth="2" strokeLinejoin="round" />

        {/* Forehead Stripes */}
        <path d="M50 15 L 50 25 M 40 18 L 42 24 M 60 18 L 58 24" stroke="#D98E3E" strokeWidth="3" strokeLinecap="round" />

        {/* Paws */}
        <ellipse cx="35" cy="85" rx="6" ry="5" fill="#F6C883" />
        <ellipse cx="65" cy="85" rx="6" ry="5" fill="#F6C883" />

        <KawaiiFace offsetY={42} eyeSpacing={24} eyeSize={5.5} />
    </svg>
);

// --- CAT 2: SLEEPING TABBY (CURLED) ---
export const CatOrangeSleeping = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Main Body Circle */}
        <circle cx="50" cy="55" r="35" fill="#F0B566" />

        {/* Tail wrapped around */}
        <path d="M80 55 A 30 30 0 0 1 20 55" fill="none" stroke="#D98E3E" strokeWidth="8" strokeLinecap="round" />

        {/* Stripes */}
        <path d="M40 25 L 45 35 M 50 22 L 50 35 M 60 25 L 55 35" stroke="#BF762E" strokeWidth="3" strokeLinecap="round" />

        {/* Head Tucked In */}
        <circle cx="45" cy="55" r="25" fill="#F0B566" />

        {/* Ears */}
        <path d="M25 40 L 25 30 L 38 35 Z" fill="#F0B566" />

        <KawaiiFace offsetY={58} eyeSpacing={22} sleep={true} />

        {/* Paws tucked */}
        <ellipse cx="40" cy="75" rx="5" ry="4" fill="#E69F54" />
    </svg>
);

// --- CAT 3: MOCHI BLOB (THE ORIGINAL) ---
export const CatMochiBlob = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* The Loaf Shape */}
        <path d="M20 80 L 80 80 Q 90 80 90 60 Q 90 30 50 30 Q 10 30 10 60 Q 10 80 20 80 Z" fill="#EBEBC8" />

        {/* Ears */}
        <path d="M25 35 L 20 20 L 40 30 Z" fill="#EBEBC8" stroke="#Dddda0" strokeWidth="2" strokeLinejoin="round" />
        <path d="M75 35 L 80 20 L 60 30 Z" fill="#EBEBC8" stroke="#Dddda0" strokeWidth="2" strokeLinejoin="round" />

        <KawaiiFace offsetY={55} eyeSpacing={28} eyeSize={6} />

        {/* Tiny Nub Paws */}
        <circle cx="40" cy="80" r="4" fill="#Dddda0" opacity="0.5" />
        <circle cx="60" cy="80" r="4" fill="#Dddda0" opacity="0.5" />
    </svg>
);

// --- CAT 4: CALICO (WALKING) ---
export const CatCalicoWalk = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Tail Up */}
        <path d="M80 50 Q 95 40 90 20" stroke="#F4A460" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M88 25 L 90 20" stroke="black" strokeWidth="8" fill="none" strokeLinecap="round" /> {/* Black tip */}

        {/* Body */}
        <rect x="25" y="40" width="60" height="40" rx="20" fill="white" />

        {/* Calico Spots */}
        <circle cx="70" cy="50" r="12" fill="#F4A460" />
        <circle cx="80" cy="65" r="8" fill="black" />

        {/* Head */}
        <circle cx="35" cy="50" r="24" fill="white" />
        <path d="M15 40 Q 20 40 25 30 L 15 30 Z" fill="#F4A460" /> {/* Orange patch on head */}
        <path d="M45 40 Q 40 40 50 30 L 60 40 Z" fill="black" /> {/* Black ear patch */}

        {/* Ears */}
        <path d="M15 35 L 10 20 L 30 30 Z" fill="black" />
        <path d="M55 35 L 60 20 L 40 30 Z" fill="#F4A460" />

        {/* Legs */}
        <path d="M35 75 L 35 85" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <path d="M75 75 L 75 85" stroke="white" strokeWidth="8" strokeLinecap="round" />

        <KawaiiFace offsetY={52} offsetX={35} eyeSpacing={20} eyeSize={5} />
    </svg>
);

// --- CAT 5: TUXEDO (SITTING/LOAF) ---
export const CatTuxedo = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Black Body */}
        <path d="M20 80 Q 10 80 15 60 Q 25 30 50 30 Q 75 30 85 60 Q 90 80 80 80 Z" fill="#1a1a1a" />

        {/* Tail curling forward */}
        <path d="M80 75 Q 90 75 85 85 L 70 85" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="85" cy="85" r="3" fill="white" /> {/* Tail tip */}

        {/* White Chest/Belly */}
        <ellipse cx="50" cy="70" rx="15" ry="12" fill="white" />

        {/* Head */}
        <circle cx="50" cy="50" r="26" fill="#1a1a1a" />

        {/* White Face Mask (Triangle up) */}
        <path d="M50 45 L 35 65 L 65 65 Z" fill="white" />
        <circle cx="50" cy="65" r="15" fill="white" /> {/* Round bottom of face */}

        {/* Ears */}
        <path d="M28 35 L 22 20 L 40 28 Z" fill="#1a1a1a" />
        <path d="M72 35 L 78 20 L 60 28 Z" fill="#1a1a1a" />

        <KawaiiFace offsetY={55} eyeSpacing={22} eyeSize={5} />

        {/* Paws */}
        <ellipse cx="40" cy="82" rx="6" ry="4" fill="white" />
        <ellipse cx="60" cy="82" rx="6" ry="4" fill="white" />
    </svg>
);

// --- CAT 6: GREY COW/SPOTTED (FLAT/MELTING) ---
export const CatGreyFlat = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Flat Body */}
        <ellipse cx="50" cy="70" rx="40" ry="20" fill="#F0F0F0" />

        {/* Grey Spots */}
        <circle cx="30" cy="65" r="8" fill="#A0A0A0" />
        <circle cx="70" cy="75" r="6" fill="#A0A0A0" />
        <path d="M45 55 Q 55 50 60 60 Z" fill="#A0A0A0" />

        {/* Head (Lower down) */}
        <circle cx="50" cy="70" r="22" fill="#F0F0F0" />

        {/* Grey Patch on Head */}
        <path d="M30 65 Q 30 50 50 50 L 50 65 Z" fill="#A0A0A0" opacity="0.8" />

        {/* Ears */}
        <path d="M30 55 L 25 45 L 40 52 Z" fill="#A0A0A0" />
        <path d="M70 55 L 75 45 L 60 52 Z" fill="#F0F0F0" />

        <KawaiiFace offsetY={72} eyeSpacing={20} eyeSize={4.5} />

        {/* Paws splayed out */}
        <circle cx="20" cy="80" r="5" fill="#F0F0F0" />
        <circle cx="80" cy="80" r="5" fill="#F0F0F0" />
    </svg>
);

// --- CAT 7: SIAMESE (STRETCHING/PLAYFUL) ---
export const CatSiameseStretch = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Tail Up */}
        <path d="M85 40 Q 95 30 90 10" stroke="#4A3B2A" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Body (Stretching down) */}
        {/* Butt high (80,40), Shoulders low (30, 70) */}
        <path d="M85 50 Q 85 40 70 45 Q 50 50 30 70 L 40 85 Q 60 70 85 65 Z" fill="#FDF5E6" />

        {/* Dark Paws */}
        <ellipse cx="25" cy="85" rx="6" ry="4" fill="#4A3B2A" />
        <ellipse cx="45" cy="85" rx="6" ry="4" fill="#4A3B2A" />
        <ellipse cx="85" cy="65" rx="6" ry="4" fill="#4A3B2A" /> {/* Back foot */}

        {/* Head (Low) */}
        <circle cx="35" cy="70" r="22" fill="#FDF5E6" />

        {/* Siamese Mask (Gradient-ish blob) */}
        <defs>
            <radialGradient id="maskGrad">
                <stop offset="0%" stopColor="#5D4037" />
                <stop offset="100%" stopColor="#FDF5E6" stopOpacity="0" />
            </radialGradient>
        </defs>
        <circle cx="35" cy="70" r="14" fill="#4A3B2A" opacity="0.8" />

        {/* Ears (Dark) */}
        <path d="M18 60 L 15 45 L 30 55 Z" fill="#3E2723" />
        <path d="M52 60 L 55 45 L 40 55 Z" fill="#3E2723" />

        <KawaiiFace offsetY={72} offsetX={35} eyeSpacing={18} eyeSize={4.5} />
    </svg>
);

// --- DEMO DISPLAY ---
const CatShowcase = () => {
    return (
        <div className="min-h-screen bg-[#2D2D3A] flex flex-wrap gap-8 items-center justify-center p-10">
            <div className="flex flex-col items-center">
                <CatOrangeSitting />
                <span className="text-white mt-2 text-xs">Tabby Sit</span>
            </div>

            <div className="flex flex-col items-center">
                <CatOrangeSleeping />
                <span className="text-white mt-2 text-xs">Sleepy</span>
            </div>

            <div className="flex flex-col items-center">
                <CatMochiBlob />
                <span className="text-white mt-2 text-xs">The Loaf</span>
            </div>

            <div className="flex flex-col items-center">
                <CatCalicoWalk />
                <span className="text-white mt-2 text-xs">Calico Walk</span>
            </div>

            <div className="flex flex-col items-center">
                <CatTuxedo />
                <span className="text-white mt-2 text-xs">Gentleman</span>
            </div>

            <div className="flex flex-col items-center">
                <CatGreyFlat />
                <span className="text-white mt-2 text-xs">Melting</span>
            </div>

            <div className="flex flex-col items-center">
                <CatSiameseStretch />
                <span className="text-white mt-2 text-xs">Siamese Play</span>
            </div>
        </div>
    );
};

export default CatShowcase;
