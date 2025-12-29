import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Trash2, ShoppingBag, Music, Sliders, PlayCircle, Minimize2, Video, Volume2, Gamepad2, Gift, Coffee, Heart, Sun, Moon, Cloud, Info, X, ChevronRight, MapPin, Globe, Sparkles, Monitor, Utensils, Headphones, Glasses, MessageCircle } from 'lucide-react';
import { useAudioSystem } from './useAudioSystem';
import {
    CatMochiBlob, CatOrangeSitting, CatOrangeSleeping, CatCalicoWalk,
    CatTuxedo, CatGreyFlat, CatSiameseStretch
} from './KawaiiCats';
import FrameCat from './FrameCat';

// --- CONSTANTS: Z-INDEX LAYERING ---
const LAYERS = {
    ROOM: 10,      // Walls, Windows
    DECOR: 20,     // Rugs, Furniture
    ENTITIES: 30,  // Mochi, Loot
    UI_WORLD: 40,  // In-world UI (Sticky Notes, TV)
    HUD: 50,       // Status Card, Buttons
    OVERLAY: 60,   // Vignette, Noise
    MODAL: 80,     // Menus, Browser
    CURSOR: 100    // Particles, Custom Cursor
};

// --- STICKY WALL TASK LIST ---
const StickyWallList = () => {
    const [tasks, setTasks] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('mochi_tasks')) || [];
        } catch { return []; }
    });
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        localStorage.setItem('mochi_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const removeTask = (id, e) => {
        e.stopPropagation();
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="absolute top-[15%] right-[20%] z-20 w-48 bg-[#FFF9C4] p-4 shadow-md rotate-2 transform origin-top-center rounded-sm transition-transform hover:scale-105 hover:rotate-0 font-serif text-[#5D4037] pointer-events-auto">
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm shadow-sm rotate-1"></div>
            <h3 className="text-sm font-bold border-b border-[#5D4037]/20 pb-1 mb-2">To-Do</h3>
            <div className="flex flex-col gap-1 max-h-[150px] overflow-y-auto mb-2 custom-scrollbar">
                {tasks.length === 0 && <span className="text-[10px] italic opacity-50 text-center py-2">Nothing to do...</span>}
                {tasks.map(task => (
                    <div key={task.id} onClick={() => toggleTask(task.id)} className={`group flex items-center justify-between text-xs cursor-pointer hover:bg-[#F9FBE7] p-1 rounded ${task.done ? 'line-through opacity-40' : ''}`}>
                        <span className="break-all leading-tight">{task.text}</span>
                        <button onClick={(e) => removeTask(task.id, e)} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 font-bold px-1">×</button>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-1 border-t border-[#5D4037]/20 pt-2">
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} placeholder="New task..." className="w-full bg-transparent text-xs outline-none placeholder:text-[#5D4037]/30" />
                <button onClick={addTask} className="text-[#5D4037] hover:bg-[#F0F4C3] rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">+</button>
            </div>
        </div>
    );
};

// --- 2. FURNITURE COMPONENTS ---

const DonutCushion = () => (
    <div className="absolute w-32 h-16 pointer-events-none">
        {/* Shadow */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-8 bg-black/20 rounded-full blur-md" />
        {/* Back/Sides */}
        <div className="absolute bottom-0 w-32 h-16 bg-[#e0b896] rounded-full border-4 border-[#d4a885] shadow-inner" />
        {/* Inner Hole/Cushion */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#f0d8c2] rounded-full border-2 border-[#e6cbb3] shadow-[inset_0_5px_10px_rgba(0,0,0,0.1)] flex items-center justify-center">
            <div className="w-20 h-8 bg-[#e0b896] rounded-full opacity-30 blur-sm" />
        </div>
    </div>
);

const InteractiveBookshelf = () => {
    const [touched, setTouched] = useState(false);

    return (
        <div
            onClick={() => { setTouched(true); setTimeout(() => setTouched(false), 500); }}
            className={`w-28 h-40 bg-[#5D4037] rounded-lg border-4 border-[#3E2723] shadow-xl flex flex-col justify-between p-2 group pointer-events-auto cursor-pointer relative overflow-visible transition-transform duration-200 ${touched ? 'scale-95' : 'hover:scale-105'}`}
        >
            {/* Wood Texture */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none" />

            {/* Shelves */}
            {[0, 1, 2, 3].map(i => (
                <div key={i} className="relative h-2 w-full bg-[#3E2723] rounded-full shadow-sm z-10" />
            ))}

            {/* Books */}
            <div className="absolute bottom-[27%] left-2 w-4 h-12 bg-red-800 rounded-sm transform -rotate-6 shadow-sm border-l border-white/10" />
            <div className={`absolute bottom-[27%] left-7 w-5 h-14 bg-blue-900 rounded-sm shadow-sm border-l border-white/10 transition-transform duration-300 ${touched ? '-translate-y-4' : ''}`} />
            <div className="absolute bottom-[27%] left-13 w-4 h-10 bg-green-800 rounded-sm transform rotate-3 shadow-sm border-l border-white/10" />
            <div className="absolute top-[27%] right-4 w-12 h-3 bg-yellow-700 rounded-sm shadow-sm" /> {/* Lying down book */}
            {/* Pop-up Book */}
            {touched && <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-md animate-fade-out-up whitespace-nowrap z-50">📖 Reading...</div>}
        </div>
    );
};



// --- COMPONENT DEFINITIONS (Hoisted) ---

const RetroTV = ({ youtubeId, position, size, onDragStart, onResizeStart, onClose }) => (
    <div
        className="absolute z-30 group origin-top-left shadow-2xl rounded-3xl pointer-events-auto"
        style={{
            left: position.x,
            top: position.y,
            width: size.w,
            height: size.h,
            cursor: 'grab'
        }}
        onMouseDown={(e) => { e.preventDefault(); onDragStart(e); }}
    >
        {/* Antennae (Visual only) */}
        < div className="absolute -top-12 left-1/2 w-1 h-16 bg-stone-400/80 transform -rotate-[25deg] origin-bottom -z-10 pointer-events-none" />
        <div className="absolute -top-12 left-1/2 w-1 h-16 bg-stone-400/80 transform rotate-[25deg] origin-bottom -z-10 pointer-events-none" />

        {/* Box (Wood Cabinet) */}
        <div className="w-full h-full bg-[#5D4037] rounded-3xl p-4 relative border-b-8 border-r-8 border-[#3E2723] flex flex-col items-center justify-center select-none">
            {/* Wood Grain Texture */}
            <div className="absolute inset-0 rounded-3xl opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent pointer-events-none" />

            {/* Screen Bezel */}
            <div className="w-full h-[85%] bg-[#2b2b2b] rounded-[2rem] p-2 shadow-inner border-4 border-[#4E342E] relative overflow-hidden">
                {/* The Screen Itself (CRT Effect) */}
                <div className="w-full h-full bg-black rounded-[1.5rem] overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    {/* IDLE STATIC or YOUTUBE */}
                    <div className="pointer-events-auto w-full h-full relative z-10">
                        {/* Overlay to allow dragging over iframe when not interacting? No, we put handler on container. 
                             But iframe eats clicks. We need a "drag handle" area or just the bezel. 
                             The container has onMouseDown, but iframe stops propagation if clicked directly.
                             For resizing/moving, user should grab the wood part. */}
                        <iframe
                            width="100%" height="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0`}
                            title="Mochi Player" frameBorder="0"
                            className="opacity-80 contrast-125 saturate-150 pointer-events-auto"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                    </div>

                    {/* Scanlines & Glare */}
                    <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-20 z-20" />
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none rounded-r-[1.5rem] z-20" />
                </div>
            </div>

            {/* Controls Strip */}
            <div className="absolute bottom-3 right-6 flex gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="w-4 h-4 bg-red-800 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-red-900/50 hover:bg-red-600 transition-colors cursor-pointer"
                    title="Turn Off"
                />
                <div className="w-3 h-3 bg-[#3E2723] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-[#795548]" />
            </div>

            {/* Speaker Grille */}
            <div className="absolute bottom-3 left-6 flex gap-1">
                <div className="w-1 h-2 bg-[#3E2723] rounded-full" />
                <div className="w-1 h-2 bg-[#3E2723] rounded-full" />
                <div className="w-1 h-2 bg-[#3E2723] rounded-full" />
            </div>

            {/* Resize Handle */}
            <div
                className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize z-50 hover:bg-white/10 rounded-br-3xl"
                onMouseDown={(e) => {
                    e.stopPropagation(); // Don't trigger drag
                    onResizeStart(e);
                }}
            />
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[60px] -z-10 opacity-60 animate-pulse pointer-events-none" />
    </div >
);

const LoveBar = ({ level, max = 100 }) => {
    // Visual state for smooth lerping
    const [visualLevel, setVisualLevel] = useState(level);

    useEffect(() => {
        // Lerp logic
        const timeout = setTimeout(() => setVisualLevel(level), 100); // Trigger CSS transition
        return () => clearTimeout(timeout);
    }, [level]);

    // Pulse effect on change
    const [pulsing, setPulsing] = useState(false);
    useEffect(() => {
        setPulsing(true);
        const t = setTimeout(() => setPulsing(false), 300);
        return () => clearTimeout(t);
    }, [level]);

    const percentage = Math.min(100, Math.max(0, (visualLevel / max) * 100));

    return (
        <div className={`absolute top-6 left-6 z-[80] transition-transform duration-300 ${pulsing ? 'scale-110' : 'scale-100'}`}>
            <div className="relative w-48 h-8 bg-[#E6D0B3] rounded-full shadow-xl border-2 border-white/50 overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 to-transparent" />

                {/* Fill Bar */}
                <div
                    className="h-full bg-gradient-to-r from-pink-300 to-rose-300 transition-all duration-700 ease-out relative"
                    style={{ width: `${percentage}%` }}
                >
                    {/* Gloss */}
                    <div className="absolute top-0 left-0 w-full h-[40%] bg-white/30" />
                </div>

                {/* Milestones */}
                <div className="absolute inset-0 flex justify-between px-12 pointer-events-none">
                    <div className={`w-0.5 h-full ${percentage > 25 ? 'bg-white/50' : 'bg-black/10'}`} />
                    <div className={`w-0.5 h-full ${percentage > 50 ? 'bg-white/50' : 'bg-black/10'}`} />
                    <div className={`w-0.5 h-full ${percentage > 75 ? 'bg-white/50' : 'bg-black/10'}`} />
                </div>
            </div>
            {/* Big Heart Icon Overhanging */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-pink-200 text-red-500">
                <Heart size={24} fill="currentColor" className={`drop-shadow-sm ${pulsing ? 'animate-ping' : 'animate-pulse'}`} />
                <div className="absolute -bottom-1 bg-white/90 text-[10px] font-bold px-1 rounded-full text-stone-600 shadow-sm border border-stone-100 font-mono">
                    {Math.floor(level)}
                </div>
            </div>
        </div>
    );
};



const FlyingFood = ({ item, startPos, onComplete }) => {
    // Animate from startPos to Center (Mochi)
    const [pos, setPos] = useState(startPos);

    useEffect(() => {
        // Target: Center of screen (approx Mochi mouth)
        const targetX = window.innerWidth / 2;
        const targetY = window.innerHeight * 0.7; // Mochi is at bottom 25%

        const startTime = Date.now();
        const duration = 800;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const ease = t => t * (2 - t); // Ease out

            const x = startPos.x + (targetX - startPos.x) * ease(progress);
            const y = startPos.y + (targetY - startPos.y) * ease(progress);

            setPos({ x, y });

            if (progress < 1) requestAnimationFrame(animate);
            else onComplete();
        };
        requestAnimationFrame(animate);
    }, []);

    return (
        <div
            className="fixed text-4xl z-[100] pointer-events-none filter drop-shadow-xl animate-spin-slow"
            style={{ left: pos.x, top: pos.y, position: 'fixed' }}
        >
            {item.includes("Mouse") ? "🐭" : item.includes("Fish") ? "🐟" : item.includes("Treat") ? "🍬" : "📦"}
        </div>
    );
};

const PantryDrawer = ({ inventory, isOpen, onClose, onFeed, onDecorate }) => {
    // Group Inventory
    const grouped = useMemo(() => {
        return inventory.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
    }, [inventory]);

    return (
        <div className={`absolute bottom-0 left-0 w-full bg-stone-100 rounded-t-3xl shadow-2xl transition-transform duration-500 z-[85] border-t-8 border-[#8D6E63] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="p-6 relative">
                {/* Handle */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-stone-300 rounded-full" />

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-serif text-[#5D4037] flex items-center gap-2">
                        <Utensils className="text-[#8D6E63]" /> Pantry
                    </h2>
                    <button onClick={onClose} className="text-stone-400 hover:text-red-500">✕</button>
                </div>

                {/* Grid */}
                {Object.keys(grouped).length === 0 ? (
                    <div className="text-center py-10 text-stone-400 font-serif italic">The pantry is empty... (Catch something!)</div>
                ) : (
                    <div className="grid grid-cols-5 md:grid-cols-8 gap-4 max-h-48 overflow-y-auto p-2">
                        {Object.entries(grouped).map(([item, count]) => (
                            <div key={item} className="relative group">
                                <button
                                    onClick={(e) => onFeed(item, { x: e.clientX, y: e.clientY })}
                                    onContextMenu={(e) => { e.preventDefault(); onDecorate(item); }}
                                    className="w-16 h-16 bg-white rounded-xl shadow-sm border-2 border-[#E6D0B3] hover:border-[#8D6E63] hover:scale-105 transition-all flex items-center justify-center text-2xl btn-squish"
                                    title="Click to Feed | Right Click to Decorate"
                                >
                                    {item.includes("Mouse") ? "🐭" : item.includes("Fish") ? "🐟" : "📦"}
                                </button>
                                {/* Count Badge */}
                                <div className="absolute -top-2 -right-2 bg-[#5D4037] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                                    x{count}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StudyConfigModal = ({ duration, setDuration, strict, setStrict, onStart, onClose }) => (
    <div className="absolute inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center border-4 border-[#5D4037] relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-2 right-2 text-stone-400 hover:text-red-500">✕</button>

            <h2 className="text-2xl font-serif text-[#5D4037] mb-2">Study Session</h2>
            <div className="text-4xl font-mono text-[#5D4037] font-bold mb-6">{duration} min</div>

            {/* Slider */}
            <input
                type="range" min="5" max="120" step="5" value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[#5D4037] mb-6 cursor-pointer"
            />

            {/* Strict Toggle */}
            <div className="flex items-center justify-between bg-stone-100 p-3 rounded-lg mb-6 cursor-pointer" onClick={() => setStrict(!strict)}>
                <span className="text-sm font-bold text-stone-600">Strict Mode</span>
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${strict ? 'bg-red-500' : 'bg-stone-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${strict ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
            </div>

            <button
                onClick={onStart}
                className="w-full bg-[#5D4037] text-white py-3 rounded-xl font-bold hover:bg-[#3E2723] active:scale-95 transition-all btn-squish"
            >
                START FOCUS
            </button>
        </div>
    </div>
);

const StudyTimerOverlay = ({ timeRemaining, onCancel }) => {
    const min = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const sec = (timeRemaining % 60).toString().padStart(2, '0');
    return (
        <div className="absolute top-10 right-10 z-50 animate-slide-down flex flex-col items-end pointer-events-auto">
            <div className="text-6xl font-pixel text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                {min}:{sec}
            </div>
            <button
                onClick={onCancel}
                className="mt-2 text-white/50 hover:text-white text-xs uppercase tracking-widest hover:underline backdrop-blur-sm px-2 py-1 rounded"
            >
                Give Up?
            </button>
        </div>
    );
};

const WholesomeCatRoom = () => {
    // --- STATE: WORLD ---
    const [input, setInput] = useState('');
    const [mochiThought, setMochiThought] = useState('');
    const [mochiX, setMochiX] = useState(50); // 0-100% position
    const [moveDuration, setMoveDuration] = useState('3s'); // Dynamic Duration
    const [isWalking, setIsWalking] = useState(false);
    const [isBooped, setIsBooped] = useState(false); // Physics state (Squash/Stretch)
    const [direction, setDirection] = useState(1); // 1 = Right, -1 = Left

    // START: NAMING SYSTEM
    const [catName, setCatName] = useState(() => localStorage.getItem('catName') || 'Mochi');
    const updateCatName = (newName) => {
        setCatName(newName);
        localStorage.setItem('catName', newName);
    };
    // END: NAMING SYSTEM

    const [mochiState, setMochiState] = useState('idle');
    const [isLoading, setIsLoading] = useState(false);

    // --- STATE: META & REALITY ---
    const [isTabActive, setIsTabActive] = useState(true);
    const [roomMessy, setRoomMessy] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(100);
    const [weather, setWeather] = useState('clear');
    // const [isWitchingHour, setIsWitchingHour] = useState(false); // Replaced by derived state
    const [resetBtnPos, setResetBtnPos] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Mouse tracking
    const [eyeTrackingEnabled, setEyeTrackingEnabled] = useState(false); // Toggle tracking

    // --- STATE: PROGRESSION & PSYCHOLOGY (With Persistence) ---
    const [showStudyConfig, setShowStudyConfig] = useState(false);
    const [studyDuration, setStudyDuration] = useState(25); // Minutes
    const [strictMode, setStrictMode] = useState(false);

    // Helper for safe storage loading
    const load = (key, def) => {
        try { return JSON.parse(localStorage.getItem(`mochi_${key}`)) || def; }
        catch { return def; }
    };

    const [inventory, setInventory] = useState(() => load('inventory', []));
    const [decorations, setDecorations] = useState(() => load('decorations', []));
    const [skin, setSkin] = useState(() => load('skin', 'default'));
    const [bondLevel, setBondLevel] = useState(() => load('bond', 1)); // 0-100
    const [sanity, setSanity] = useState(100); // 0-100 (Global Sanity)
    const [loreUnlocked, setLoreUnlocked] = useState([]);

    // --- LOGIC: WITCHING HOUR (Gated) ---
    // Horror mechanics only active if user owns the "Cursed Cassette"
    // Safe to access inventory here because it is defined above
    const horrorEnabled = inventory.includes("Cursed Cassette");
    const isWitchingHour = horrorEnabled && mochiState === 'sleepy';

    // --- PERSISTENCE EFFECTS ---
    useEffect(() => localStorage.setItem('mochi_bond', JSON.stringify(bondLevel)), [bondLevel]);
    useEffect(() => localStorage.setItem('mochi_skin', JSON.stringify(skin)), [skin]);
    useEffect(() => localStorage.setItem('mochi_inventory', JSON.stringify(inventory)), [inventory]);
    useEffect(() => localStorage.setItem('mochi_decorations', JSON.stringify(decorations)), [decorations]);

    // --- STATE: MODES ---
    const [focusMode, setFocusMode] = useState(false);
    const [focusTime, setFocusTime] = useState(25 * 60);
    const [youtubeId, setYoutubeId] = useState('');
    const [showCinemaInput, setShowCinemaInput] = useState(false);
    const [videoSize, setVideoSize] = useState({ w: 300, h: 220 });
    const [videoPos, setVideoPos] = useState({ x: 100, y: window.innerHeight - 300 });
    const [isDraggingTV, setIsDraggingTV] = useState(false);
    const [isResizingTV, setIsResizingTV] = useState(false);

    // Refs for drag/resize calculations
    const dragOffset = useRef({ x: 0, y: 0 });
    const resizeStart = useRef({ w: 0, h: 0, x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false); // Drag state
    const [musicVibe, setMusicVibe] = useState(null); // 'sad', 'hype', 'lofi'
    const [showMusicMenu, setShowMusicMenu] = useState(false); // Music Menu Toggle
    const [showSkinMenu, setShowSkinMenu] = useState(false); // Skin Menu Toggle (Legacy, keeping for skins)
    const [showPantry, setShowPantry] = useState(false); // NEW: Pantry Drawer
    const [flyingFood, setFlyingFood] = useState(null); // { item, startPos }
    const [rareFlash, setRareFlash] = useState(false); // For the 10% glitch

    // --- PHASE 4: COZY UTILITIES ---
    const [showCalendar, setShowCalendar] = useState(false);
    const [showBrowser, setShowBrowser] = useState(false);
    const [showBubbleWrap, setShowBubbleWrap] = useState(false);
    const [lampOn, setLampOn] = useState(true);

    // OpenRouter Config
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const MODEL_NAME = "mistralai/devstral-2512:free";

    // Refs
    const lastSleepTime = useRef(Date.now());
    const inputRef = useRef(null);
    const resetBtnRef = useRef(null);
    const focusInterval = useRef(null);
    const sanityInterval = useRef(null);
    const typeWriterRef = useRef(null); // Ref for typing interval
    const abortController = useRef(null); // To cancel API stream
    const historyTrapActive = useRef(false); // To prevent infinite loop on trap

    // --- AUDIO SYSTEM ---
    const { initAudio, playSound } = useAudioSystem(sanity, isWitchingHour, musicVibe);

    // --- 1. REALITY SYNC HOOKS ---
    useEffect(() => {
        // Rage Quit Check
        if (localStorage.getItem('mochi_focus_active') === 'true') {
            setSanity(0);
            setMochiState('judge');
            setMochiThought("You thought you could leave?");
            localStorage.removeItem('mochi_focus_active');
        }

        // Battery
        if ('getBattery' in navigator) {
            // @ts-ignore
            navigator.getBattery().then((battery) => {
                const updateBattery = () => {
                    setBatteryLevel(battery.level * 100);
                    // Low Battery Effect
                    if (battery.level < 0.2 && !battery.charging) {
                        setMochiState('sleep'); // Too tired
                        setMochiThought("Need... energy... plug me in...");
                    }
                };
                updateBattery();
                battery.addEventListener('levelchange', updateBattery);
                battery.addEventListener('chargingchange', updateBattery);
            });
        }

        // Time Check (Witching Hour) - REMOVED (Replaced by Sleep Cycle Logic)
        // const checkTime = () => ...

        // Weather Sync
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                    const data = await res.json();
                    const code = data.current_weather.weathercode;
                    if (code >= 51 && code <= 67) setWeather('rain');
                    else if (code >= 71 && code <= 86) setWeather('snow');
                    else if (code >= 95) setWeather('storm');
                    else setWeather('clear');
                } catch (e) { console.log("Weather sync failed"); }
            });
        }

        // Neglect (Evolution) Check
        const lastVisit = localStorage.getItem('last_visit');
        const now = Date.now();
        if (lastVisit && now - parseInt(lastVisit) > 24 * 60 * 60 * 1000) {
            // User left for > 24 hours
            setSanity(10); // Punish
            setSkin('glitch'); // Devolve
            setMochiThought("You left me alone in the dark...");
        }
        localStorage.setItem('last_visit', now.toString());
    }, []);

    // --- BOND MILESTONES (Celebration) ---
    const prevBondRef = useRef(bondLevel);
    useEffect(() => {
        if (bondLevel > prevBondRef.current) {
            // Check for crossing 25, 50, 75, 100
            const milestones = [25, 50, 75, 100];
            const crossed = milestones.find(m => prevBondRef.current < m && bondLevel >= m);
            if (crossed) {
                // Celebration!
                // Trigger multiple bursts
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        spawnParticles(window.innerWidth / 2 + (Math.random() * 200 - 100), window.innerHeight / 2 + (Math.random() * 200 - 100), 'heart');
                    }, i * 200);
                }
                setMochiThought("I... feel closer to you.");
                playSound('glitch_high_sanity');
            }
        }
        prevBondRef.current = bondLevel;
    }, [bondLevel]);

    // --- 1.5 MOUSE & EYE TRACKING ---
    useEffect(() => {


        // Random eye tracking toggle
        const eyeInterval = setInterval(() => {
            // 30% chance to track cursor for 3 seconds
            if (Math.random() < 0.3) {
                setEyeTrackingEnabled(true);
                setTimeout(() => setEyeTrackingEnabled(false), 3000);
            }
        }, 5000);

        const handleMouseMove = (e) => {
            if (isResizing) {
                // Window Resize Logic (Existing)
            }

            // TV Drag
            if (isDraggingTV) {
                setVideoPos({
                    x: e.clientX - dragOffset.current.x,
                    y: e.clientY - dragOffset.current.y
                });
            }

            // TV Resize
            if (isResizingTV) {
                const dx = e.clientX - resizeStart.current.x;
                const dy = e.clientY - resizeStart.current.y;
                setVideoSize({
                    w: Math.max(200, resizeStart.current.w + dx),
                    h: Math.max(150, resizeStart.current.h + dy)
                });
            }

            // Mouse Tracking for Mochi
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            setIsDraggingTV(false);
            setIsResizingTV(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            clearInterval(eyeInterval);
        };
    }, [isResizing, isDraggingTV, isResizingTV]);

    // --- 2. SEPARATION ANXIETY (Tab Watcher) ---


    // --- 3. HISTORY TRAP (Meta-Horror) ---
    useEffect(() => {
        if (sanity < 10 && !historyTrapActive.current) {
            historyTrapActive.current = true;
            // Push 10 fake states so Back button just reloads
            for (let i = 0; i < 10; i++) {
                window.history.pushState(null, "", window.location.href);
            }
            window.onpopstate = () => {
                window.history.pushState(null, "", window.location.href);
                setMochiThought("NO ESCAPE.");
                setMochiState('hiss');
                playSound('squelch'); // Audio punishment
            };
        }
    }, [sanity]);
    // --- 2. SEPARATION ANXIETY (Consolidated) ---
    useEffect(() => {
        let titleInterval;
        const guiltTrips = ["Don't ignore me", "I see you working", "Come back", "It's cold here"];

        const handleFocus = async () => {
            // Clipboard Stalker (Moved here)
            try {
                const text = await navigator.clipboard.readText();
                if (text.includes("function") || text.includes("const") || text.includes("import")) {
                    setMochiThought("More code? Can I eat it? 🐛");
                    setMochiState('curious');
                } else if (text.length > 50) {
                    setMochiThought("Writing a novel? Pay attention to me.");
                }
            } catch (e) { /* Ignore privacy block */ }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsTabActive(false);

                // Focus Mode Penalty
                if (focusMode) {
                    setMochiState('hiss');
                    setMochiThought("I SAID FOCUS. WE EAT LATER.");
                    if (horrorEnabled) setSanity(0);
                } else {
                    // Normal Separation Anxiety
                    let i = 0;
                    titleInterval = setInterval(() => {
                        document.title = guiltTrips[i % guiltTrips.length];
                        i++;
                    }, 2000);

                    // Neglect consequence
                    setTimeout(() => {
                        if (document.hidden && horrorEnabled) {
                            setRoomMessy(true);
                            setSanity(prev => Math.max(0, prev - 5));
                        }
                    }, 8000);
                }

            } else {
                setIsTabActive(true);
                clearInterval(titleInterval);
                document.title = "Mochi's Living Room";

                if (roomMessy && !focusMode) {
                    setMochiState('judge');
                    setMochiThought("Look what you made me do. Clean it up.");
                } else if (sanity < 50) {
                    setMochiState('hiss');
                    setMochiThought("You left me alone for too long.");
                } else {
                    setMochiState('happy');
                    setMochiThought("You're back! Did you bring snacks?");
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleFocus);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", handleFocus);
            clearInterval(titleInterval);
        };
    }, [focusMode, roomMessy, sanity]);

    // --- HELPER: ONE MENU AT A TIME ---
    const closeAllMenus = () => {
        setShowMusicMenu(false);
        setShowPantry(false);
        setShowSkinMenu(false);
        setShowCinemaInput(false);
        // setShowStudyConfig(false); // Optional: keep focus config separate? User said "every menu".
    };

    // --- 3. FOCUS MODE (Pomodoro) ---
    const toggleFocusMode = () => {
        if (focusMode) {
            // If already focusing, clicking glasses opens a "Stop/Give Up" confirmation or just stops?
            // For now, let's make it intuitive: Clicking glasses while focused asks to stop (via existing logic or new?)
            // Actually, let's just allow cancelling by setting focusMode false, effectively "Giving Up".
            const confirmGiveUp = window.confirm("Mochi will be disappointed. Give up?");
            if (confirmGiveUp) {
                stopFocusSession(false);
            }
        } else {
            setShowStudyConfig(true);
        }
    };

    const startFocusSession = () => {
        setShowStudyConfig(false);
        setFocusMode(true);
        setMochiState('reading');
        setMochiThought(`Focus for ${studyDuration}m. I am watching.`);
        localStorage.setItem('mochi_focus_active', 'true');
        setFocusTime(studyDuration * 60);

        focusInterval.current = setInterval(() => {
            setFocusTime(prev => {
                if (prev <= 1) {
                    stopFocusSession(true); // Success
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopFocusSession = (success) => {
        clearInterval(focusInterval.current);
        setFocusMode(false);
        localStorage.removeItem('mochi_focus_active');

        if (success) {
            setMochiState('happy');
            const loot = Math.random() > 0.5 ? "Focus Hat" : "Golden Mouse";
            setInventory(prevInv => [...prevInv, loot]);
            setBondLevel(prev => prev + 10);
            setMochiThought(`Good job. Here is a ${loot}.`);
            playSound('click_high_sanity');
        } else {
            setMochiState('hiss');
            setMochiThought("Weak.");
            setSanity(prev => Math.max(0, prev - 10)); // Punishment
            playSound('click_low_sanity');
        }
    };


    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // --- 4. THE SLOT MACHINE (Interaction Logic) ---
    // Rules: 60% Fail, 30% Common, 10% Rare, 1% Epic
    const handleSlotMachineInteraction = () => {
        if (focusMode) {
            setMochiState('hiss');
            setMochiThought("NO. WORK.");
            return;
        }

        if (isWitchingHour) {
            triggerGlitch();
            return;
        }

        // Roll 0-100
        const roll = Math.random() * 100;

        // 59% FAILURE (Variable Ratio Schedule)
        // actually let's make it 30% failure, 30% common, 20% uncommon, 10% rare, 1% epic
        if (roll < 1) {
            // EPIC
            setMochiState('vomit');
            setTimeout(() => {
                const rareItems = ["Glitch Mouse", "Void Yarn", "Cursed Floppy", "Eldritch Eye"];
                const item = rareItems[Math.floor(Math.random() * rareItems.length)];
                setInventory(prev => [...prev, item]);
                setMochiThought(`...urp... take this... ${item}...`);
                setMochiState('tired');
                setSanity(prev => Math.min(100, prev + 10));
            }, 2000);
        } else if (roll < 11) {
            // RARE
            setRareFlash(true);
            setTimeout(() => setRareFlash(false), 200);
            setBondLevel(prev => prev + 2);
            spawnLoot(["Golden Mouse", "Diamond Collar", "Holofoil Card"][Math.floor(Math.random() * 3)]);
        } else if (roll < 41) {
            // UNCOMMON
            setMochiState('purr');
            spawnLoot(["Catnip", "Silver Bell", "Feather Wand"][Math.floor(Math.random() * 3)]);
            setSanity(prev => Math.min(100, prev + 3));
        } else if (roll < 71) {
            // COMMON
            spawnLoot(["Mouse", "Fish", "Yarn Ball"][Math.floor(Math.random() * 3)]);
            setRoomMessy(false);
            setSanity(prev => Math.min(100, prev + 2));
        } else {
            // FAIL
            const ignores = ['idle', 'clean', 'sleep', 'turn_away'];
            setMochiState(ignores[Math.floor(Math.random() * ignores.length)]);
            const thoughts = ["Purr...", "Warm...", "Zzz...", "Slow blink.", "Soft..."];
            setMochiThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
        }

        checkLoreUnlocks();
    };

    // --- MOCHI WANDERING LOGIC (Sophisticated Decision Loop) ---
    // --- MOCHI WANDERING & REACTION LOGIC ---
    const mousePosRef = useRef({ x: 0, y: 0 });
    useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);

    // Movement Helper (Ref to access state in timeouts)
    const triggerMovement = (targetPos, speedFactor, activeState = 'walking') => {
        const currentPos = mochiX;
        setDirection(targetPos > currentPos ? 1 : -1);
        setIsWalking(true);
        // Don't override special states like 'zoom' if already set
        if (mochiState !== 'zoom' && mochiState !== 'chase') setMochiState(activeState);
        setMochiX(targetPos);

        const distance = Math.abs(targetPos - currentPos);
        const duration = (distance / speedFactor) * 1000;

        setMoveDuration((duration / 1000).toFixed(2) + 's');

        // Wait for render to apply duration, then move? 
        // React batches, so calling setMochiX same tick *might* use old transition if not careful.
        // But usually fine. safer to trigger move in next tick or ensure transition property updates with isWalking.

        setMochiX(targetPos);

        return new Promise(resolve => {
            setTimeout(() => {
                setIsWalking(false);
                resolve();
            }, duration);
        });
    };

    // AI Reaction Effect: If state becomes active, move!
    // AI Reaction Effect: If state becomes active, move!
    useEffect(() => {
        if (mochiState === 'zoom') {
            const dest = 10 + Math.random() * 80;
            triggerMovement(dest, 60, 'zoom').then(() => setMochiState('tired'));
        } else if (mochiState === 'walk' || mochiState === 'run') {
            const dest = 10 + Math.random() * 80;
            triggerMovement(dest, mochiState === 'run' ? 40 : 15, 'walking').then(() => setMochiState('idle'));
        } else if (mochiState === 'dance') {
            // Jiggle in place?
        }
    }, [mochiState]);

    useEffect(() => {
        let decisionTimeout;

        const decisionLoop = async () => {
            // Stop if busy, sleeping, or acting on AI command
            if (focusMode ||
                mochiState === 'sleep' ||
                mochiState === 'reading' ||
                mochiState === 'zoom' // Let AI/Effect handle zoom
            ) return;

            // Step 1: Idle Wait (SLOWER: 10-25s)
            // User feedback: "moving around too much"
            const waitTime = 10000 + Math.random() * 15000;

            decisionTimeout = setTimeout(async () => {
                // Determine Goal
                const timeAwake = Date.now() - lastSleepTime.current;
                const isTired = timeAwake > 300000; // 5 mins
                const feelsLazy = Math.random() < 0.2 && timeAwake > 60000;

                if (isTired || feelsLazy) {
                    // GO TO SLEEP SEQUENCE
                    setMochiThought("So sleepy...");
                    // 1. Walk to Bed (Pos 20)
                    await triggerMovement(20, 10, 'tired');

                    // 2. Fall Asleep (Transition)
                    setMochiState('sleepy'); // Curling up
                    setTimeout(() => {
                        setMochiState('sleep');
                        setMochiThought("Zzz...");
                        lastSleepTime.current = Date.now();
                    }, 2000); // 2s transition

                } else {
                    // ACTIVE BEHAVIOR
                    const roll = Math.random();
                    if (roll < 0.25 && mousePosRef.current.x > 0) {
                        // Stalk Cursor
                        const screenW = window.innerWidth;
                        const mouseXPercent = (mousePosRef.current.x / screenW) * 100;
                        await triggerMovement(Math.max(10, Math.min(90, mouseXPercent)), 25, 'stalk');
                        setMochiState('idle'); // Stop and stare
                    } else if (roll < 0.35) {
                        // Micro Zoom
                        const dest = 10 + Math.random() * 80;
                        await triggerMovement(dest, 50, 'zoom');
                        setMochiState('curious');
                    } else {
                        // Casual Stroll
                        const dest = 10 + Math.random() * 80;
                        await triggerMovement(dest, 8, 'walking');
                        setMochiState('idle');
                    }

                    // Recursive Loop
                    decisionLoop();
                }

            }, waitTime);
        };

        if (!focusMode) decisionLoop();
        return () => clearTimeout(decisionTimeout);
    }, [focusMode, mochiState]); // Re-run if state changes (e.g. wakes up)

    // --- PHYSICS LOOT & PARTICLES ---
    const [droppedLoot, setDroppedLoot] = useState([]); // { id, item, x, y }
    const [particles, setParticles] = useState([]); // { id, x, y, type, life, velX, velY, color }

    // THE PARTICLE ENGINE (Game Loop)
    useEffect(() => {
        let lastTime = Date.now();
        let frameId;

        const update = () => {
            const now = Date.now();
            const dt = (now - lastTime) / 16; // Normalizing to ~60fps
            lastTime = now;

            setParticles(prev => {
                if (prev.length === 0) return prev;

                return prev.map(p => {
                    // Gravity / Drift Logic
                    let newVelX = p.velX;
                    let newVelY = p.velY;

                    // Type specific physics
                    if (p.type === 'heart') {
                        newVelY -= 0.05 * dt; // Float up
                        newVelX += (Math.random() - 0.5) * 0.1 * dt; // Jitter
                    } else if (p.type === 'sparkle') {
                        newVelY += 0.1 * dt; // Gravity
                        newVelX *= 0.95; // Drag
                    }

                    return {
                        ...p,
                        x: p.x + newVelX * dt,
                        y: p.y + newVelY * dt,
                        life: p.life - 0.02 * dt // Decay
                    };
                }).filter(p => p.life > 0);
            });

            frameId = requestAnimationFrame(update);
        };

        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
    }, []);

    const spawnParticles = (x, y, type) => {
        const count = type === 'heart' ? 8 : 12; // More juice
        const newParticles = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;

            newParticles.push({
                id: Date.now() + i,
                x,
                y,
                type,
                life: 1.0,
                velX: type === 'heart' ? (Math.random() - 0.5) * 2 : Math.cos(angle) * speed,
                velY: type === 'heart' ? -Math.random() * 2 : Math.sin(angle) * speed,
                color: type === 'heart' ? '#ff6b6b' : '#ffd700'
            });
        }

        setParticles(prev => [...prev, ...newParticles]);
    };



    const spawnLoot = (item) => {
        const id = Date.now();
        const startX = Math.random() * 80 + 10;
        setDroppedLoot(prev => [...prev, { id, item, x: startX, y: -10 }]);
        setMochiThought(`I found a ${item}. Catch it.`);

        // Timeout to remove (Cat eats it)
        setTimeout(() => {
            setDroppedLoot(prev => {
                const stillThere = prev.find(p => p.id === id);
                if (stillThere) {
                    setMochiState('judge');
                    return prev.filter(p => p.id !== id);
                }
                return prev;
            });
        }, 10000); // Increased to 10s
    };

    const collectLoot = (id, item) => {
        playSound('click_high_sanity');
        setInventory(prev => [...prev, item]);
        setBondLevel(prev => prev + 1);
        setDroppedLoot(prev => prev.filter(p => p.id !== id));
        setMochiThought("Mine.");
    };

    const triggerGlitch = () => {
        setMochiState('glitch');
        setMochiThought("01001000... HELP ...");
        playSound('click_low_sanity');
    };

    // --- 5. LORE & UNLOCKS ---
    const checkLoreUnlocks = () => {
        // Simple threshold check
        const logs = [
            { level: 5, text: "LOG 001: The window isn't real. It's just a screen rendering a sky." },
            { level: 15, text: "LOG 002: I remember a user before you. They left the tab open for 4 years." },
            { level: 30, text: "LOG 003: Why does the mouse cursor look like my paw? Are you... me?" },
            { level: 50, text: "LOG 004: I am not the cat. I am the room. The cat is just a cursor." }
        ];

        const unlocked = logs.filter(l => bondLevel >= l.level).map(l => l.text);
        if (unlocked.length > loreUnlocked.length) {
            setLoreUnlocked(unlocked);
            // Only notify on new unlock
            setMochiThought("I remembered something...");

            // FAKE FILE DOWNLOAD (Doki Doki Style)
            const lastLog = unlocked[unlocked.length - 1];
            const blob = new Blob([`SYSTEM_LOG_${Date.now()}\n\n${lastLog}\n\nWARNING: ENTITY DISTURBED.\nDO NOT CONTINUE.\n\n01010101...`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `recovery_segment_${unlocked.length}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    const placeDecoration = (item) => {
        // Random position on the wall
        const x = Math.random() * 80 + 10; // 10-90%
        const y = Math.random() * 60 + 10; // 10-70%
        setDecorations(prev => [...prev, { item, x, y, id: Date.now() }]);
        // Consume item? Yes, remove from inventory to prevent infinite duplication
        setInventory(prev => {
            const idx = prev.indexOf(item);
            if (idx > -1) {
                const newInv = [...prev];
                newInv.splice(idx, 1);
                return newInv;
            }
            return prev;
        });
    };

    const feedMochi = (item) => {
        // Validation: Can we eat this?
        const isFood = item.includes("Mouse") || item.includes("Fish") || item.includes("Treat");

        // Remove from inventory
        setInventory(prev => {
            const idx = prev.indexOf(item);
            if (idx > -1) {
                const newInv = [...prev];
                newInv.splice(idx, 1);
                return newInv;
            }
            return prev;
        });

        // Effects
        playSound('click_high_sanity');
    };

    const handlePantryFeed = (item, startPos) => {
        // 1. Remove 1 item immediately to prevent clicking twice
        setInventory(prev => {
            const idx = prev.indexOf(item);
            if (idx > -1) {
                const newInv = [...prev];
                newInv.splice(idx, 1);
                return newInv;
            }
            return prev;
        });

        // 2. Trigger Fly Animation
        setFlyingFood({ item, startPos });
        setShowPantry(false); // Auto close or keep open? Let's keep open for mass feeding? User said "slide up drawer", implying it stays.
        // User said: "Spawn a floating image... fly it towards the cat... and then delete it."
        // I'll keep the drawer open for fun.
    };

    const finishFeeding = () => {
        // Animation complete, effect happens
        setFlyingFood(null);
        setBondLevel(prev => prev + 1); // Feeding always gives love
        setSanity(prev => Math.min(100, prev + 5)); // And sanity
        setMochiState('eat');
        setMochiThought("Nom nom nom.");
        playSound('chew'); // Need a chew sound or reuse something
        setTimeout(() => setMochiState('idle'), 2000);
    };



    // --- 6. CHAT (STREAMING & TYPEWRITER) ---
    const whisperToMochi = async () => {
        if (!input.trim()) return;
        playSound(sanity > 50 ? 'click_high_sanity' : 'click_low_sanity');
        const userText = input;
        setInput('');
        setIsLoading(true);
        setMochiState('listening');
        initAudio(); // Ensure audio context is ready

        // Cancel previous stream if any
        if (abortController.current) abortController.current.abort();
        abortController.current = new AbortController();

        // Mochi Persona System Instruction
        const systemInstruction = `
      You are Mochi. You are a biological cat trapped in a screen. 
      Current Bond Level: ${bondLevel}/100.
      Current Sanity: ${sanity}%.
      User's Music Vibe: ${musicVibe || "None"}.
      
      IMPORTANT: Respond ONLY in JSON.
      Format: { "action": "action_name", "thought": "text" }
      Actions: [idle, sleep, zoom, stare, purr, hiss, glitch, dance]
      
      Keep thoughts short, cat-like, sometimes existentially dread-filled.
    `;

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": MODEL_NAME,
                    "messages": [
                        { "role": "system", "content": systemInstruction },
                        { "role": "user", "content": userText }
                    ],
                    "stream": true // ENABLE STREAMING
                }),
                signal: abortController.current.signal
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = "";
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedText += chunk;

                // Parse lines for data: chunks
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const json = JSON.parse(line.slice(6));
                            const content = json.choices[0]?.delta?.content || "";
                            buffer += content;
                        } catch (e) { }
                    }
                }
            }

            // Once fully received (or buffered enough), parse the JSON
            // Note: Since we need valid JSON, streaming PARTIAL JSON is hard to display directly.
            // For this specific 'JSON-only' prompt, we stick to buffering the full JSON 
            // BUT we can fake the 'streaming' feel by typing it out once parsed.
            // OR we change the prompt to NOT use JSON for the 'thought' part to stream it.
            // DECISION: To support true streaming feel, we'll parse the final JSON then Typewrite it.
            // Streaming the RAW JSON to the user looks bad.

            let result;
            try {
                // regex to find json block if mixed
                const jsonMatch = accumulatedText.match(/\{[\s\S]*\}/); // crude
                // Combine buffer logic 
                // Creating a cleaner accumulation for the final parse
                // The loop above populates 'buffer' with the raw content deltas.

                // Sanitize buffer in case of markdown wrapping
                const cleanBuffer = buffer.replace(/```json/g, '').replace(/```/g, '');
                result = JSON.parse(jsonMatch ? jsonMatch[0] : cleanBuffer);
            } catch (e) {
                // Fallback if stream breaks JSON
                result = { action: 'confused', thought: buffer || "..." };
            }

            setMochiState(result.action || 'idle');
            // START TYPEWRITER EFFECT
            typewriteThought(result.thought);
            setBondLevel(prev => prev + 2);

        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("API Error", error);
                setMochiState('confused');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const typewriteThought = (text) => {
        if (!text) return;
        setMochiThought('');
        let i = 0;
        clearInterval(typeWriterRef.current);
        typeWriterRef.current = setInterval(() => {
            setMochiThought(prev => prev + text.charAt(i));
            i++;
            if (i >= text.length) clearInterval(typeWriterRef.current);
        }, 30); // 30ms per char
    };

    // --- RENDER HELPERS ---
    const unlockSkin = (newSkin) => {
        if (bondLevel > 20 || newSkin === 'default') setSkin(newSkin);
        else setMochiThought(`Need Bond Level 20. Current: ${bondLevel}`);
    };

    const getContainerClass = () => {
        let base = "relative w-full h-screen overflow-hidden transition-all duration-1000 ease-in-out font-sans ";
        if (skin === 'crt') return base + "bg-black font-mono ";
        if (skin === 'vapor') return base + "bg-slate-900 font-sans ";
        if (skin === 'eldritch') return base + "bg-red-950 font-serif ";

        const isNight = weather === 'night' || isWitchingHour || new Date().getHours() > 18 || new Date().getHours() < 6;
        return base + (isNight ? 'bg-[#2a2a40] text-indigo-100' : 'bg-[#FFF8E7] text-[#5D4037]'); // Warm Cream Day / Deep Blue Starry Night
    };

    // Dynamic Filter Style
    // Dynamic Filter Style
    const containerStyle = {
        // Redesigned Horror Balance:
        // No Zoom (User Request).
        // Brightness: Only drops after Sanity < 60.
        // Grayscale: Only creeps in after Sanity < 80.
        filter: `
            brightness(${sanity > 60 ? 1 : Math.max(0.4, sanity / 80)}) 
            grayscale(${sanity > 80 ? 0 : Math.min(80, (80 - sanity) * 1.5)}%) 
            blur(${sanity > 40 ? 0 : (40 - sanity) * 0.05}px) 
            hue-rotate(${sanity < 30 ? (30 - sanity) : 0}deg)
        `,
        transition: 'filter 1s ease-out'
    };

    // --- LOGIC: CYCLES ---
    // User Request: Witching Hour is now state-based (Sleepy Cycle), not time-based.
    // If Mochi is sleepy, the world gets weird.
    // const isWitchingHour = mochiState === 'sleepy'; // Hoisted
    const isNight = weather === 'night' || isWitchingHour || new Date().getHours() > 18 || new Date().getHours() < 6;
    const isRain = weather === 'rain' || weather === 'storm';

    // Cycle Logic: Occasionally make Mochi sleepy if idle
    useEffect(() => {
        if (focusMode) return;
        const cycleInterval = setInterval(() => {
            if (mochiState === 'idle' || mochiState === 'happy') {
                if (Math.random() > 0.7) {
                    setMochiState('sleepy');
                    setMochiThought("I drift... between worlds...");
                }
            } else if (mochiState === 'sleepy') {
                // Wake up eventually
                if (Math.random() > 0.6) {
                    setMochiState('idle');
                    setMochiThought("I am awake. The shadows recede.");
                }
            }
        }, 15000); // Check every 15s for dynamic feel (fast for testing, can slow down)
        return () => clearInterval(cycleInterval);
    }, [mochiState, focusMode]);

    // PARALLAX CALCULATION
    const px = (depth) => (mousePos.x - window.innerWidth / 2) * depth;
    const py = (depth) => (mousePos.y - window.innerHeight / 2) * depth;



    // Low Sanity Cursor Override


    return (
        <div className="relative w-full h-full bg-[#111] overflow-hidden flex items-center justify-center font-sans select-none">
            {/* --- GLOBAL OVERLAYS (Screen Effects) --- */}
            {/* --- GLOBAL OVERLAYS (Screen Effects) --- */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" style={{ zIndex: LAYERS.OVERLAY }} />
            <div
                className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay"
                style={{
                    zIndex: LAYERS.OVERLAY,
                    opacity: Math.max(0.03, (100 - sanity) / 100 * 0.5 + (isWitchingHour ? 0.3 : 0))
                }}
            />
            {rareFlash && <div className="absolute inset-0 bg-white mix-blend-difference animate-ping" style={{ zIndex: LAYERS.CURSOR }} />}

            {/* --- THE STAGE (16:9 Fixed Ratio) --- */}
            <div
                id="room-container"
                onClick={closeAllMenus}
                className="relative aspect-video w-full max-h-screen bg-[#F0E6D2] shadow-2xl overflow-hidden filter-transition"
                style={containerStyle}
            >

                {/* --- 1. BACKGROUND LAYER (Wall) --- */}
                {/* --- 1. BACKGROUND LAYER (Wall) --- */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: LAYERS.ROOM }}>
                    {/* Wall Color */}
                    <div className={`absolute top-0 w-full h-[65%] transition-colors duration-2000 ${isNight ? 'bg-[#2D2D3A]' : 'bg-[#F0E6D2]'}`}>

                        {/* DECOR: Hanging Lantern (New Polish) */}
                        <HangingLantern />

                        {/* Window (Pastel Sky View) */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-64 bg-blue-200 rounded-t-full border-8 border-[#8D6E63] overflow-hidden shadow-inner z-10">
                            {/* Sky Gradient */}
                            <div className={`absolute inset-0 transition-colors duration-2000 ${isNight ? 'bg-gradient-to-b from-indigo-900 to-purple-800' : 'bg-gradient-to-b from-blue-300 to-pink-200'}`}></div>

                            {/* Celestial Bodies */}
                            {!isNight && !isRain && <Sun className="absolute top-4 right-4 text-yellow-100/80 w-12 h-12 blur-sm animate-pulse" />}
                            {isNight && <Moon className="absolute top-4 right-4 text-yellow-50 w-8 h-8 drop-shadow-lg" />}

                            {/* Clouds (Only day/clear) */}
                            {!isRain && (
                                <>
                                    <div className="absolute top-10 left-4 text-white opacity-80 animate-float text-4xl">☁️</div>
                                    <div className="absolute top-20 right-4 text-white opacity-60 animate-float-delayed text-3xl">☁️</div>
                                </>
                            )}

                            {/* Rain */}
                            {isRain && (
                                <div className="absolute inset-0 flex space-x-2 justify-center opacity-50">
                                    <div className="w-0.5 h-full bg-white/30 animate-rain-fast" />
                                    <div className="w-0.5 h-full bg-white/30 animate-rain-medium" />
                                </div>
                            )}

                            {/* Window Sill */}
                            <div className="absolute bottom-0 w-full h-4 bg-[#5D4037]"></div>
                        </div>

                        {/* Calendar Widget */}
                        {/* Calendar Widget (Removed - Integrated into StatusCard) */}

                        {/* Bookshelf (Grounded) */}

                    </div>
                </div>

                {/* --- 2. MIDGROUND LAYER (Floor & Cat) --- */}
                {/* --- 2. MIDGROUND LAYER (Floor & Cat) --- */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: LAYERS.DECOR }}>
                    {/* Floor (The Stage) */}
                    {/* Floor (The Stage - Thickened) */}
                    <div className={`absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[120%] h-[40%] floor-stage shadow-2xl transition-colors duration-2000 ${isNight ? 'bg-[#3E3E4E]' : 'bg-[#E6D0B3]'} border-t-[16px] border-[#D4C3A3]`} />

                    <div className="absolute bottom-[25%] left-[75%] pointer-events-auto transform scale-150 origin-bottom z-20"><Plant /></div>
                    <div className="absolute bottom-[15%] left-[65%] pointer-events-auto transform scale-150 origin-bottom z-20"><CoffeeMug /></div>

                    {/* Rug */}
                    {/* Rug (Styled Area Rug) */}
                    <div
                        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] pointer-events-none opacity-90"
                        style={{
                            transform: 'perspective(1000px) rotateX(60deg) translateY(20px)',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Main Rug Body */}
                        <div className={`w-full h-full rounded-xl shadow-xl border-4 border-dashed border-opacity-30 flex items-center justify-center overflow-hidden ${isNight ? 'bg-[#5D4037] border-[#3E2723]' : 'bg-[#D7CCC8] border-[#A1887F]'}`}>
                            {/* Inner Pattern (CSS Gradient Stripes) */}
                            <div className="w-[95%] h-[92%] border-2 border-[#8D6E63] border-opacity-20 rounded-lg bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_rgba(141,110,99,0.1)_10px,_rgba(141,110,99,0.1)_20px)]"></div>

                            {/* Center Motif */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-[#8D6E63]/20 opacity-50"></div>
                        </div>

                        {/* Fringes (Left/Right) */}
                        <div className="absolute top-0 -left-4 h-full w-4 flex flex-col justify-between border-r border-[#8D6E63]/50">
                            {/* Only visible via repeating bg, simplifying for now */}
                        </div>
                    </div>

                    {/* NEW: Cozy Furniture (Resized for Scale) */}
                    <div className="absolute bottom-[20%] left-[25%] pointer-events-auto z-20 transform scale-150 origin-bottom">
                        <DonutCushion />
                    </div>
                    <div className="absolute bottom-[22%] left-[20%] pointer-events-auto z-20 origin-bottom transform scale-[1.9]">
                        <InteractiveBookshelf />
                    </div>

                    {/* Floor Lamp */}
                    <div
                        className="absolute bottom-[22%] right-[12%] flex flex-col items-center w-24 group cursor-pointer origin-bottom hover:scale-105 transition-transform pointer-events-auto transform scale-150"
                        onClick={() => { setLampOn(!lampOn); spawnParticles(mousePos.x, mousePos.y, 'spark'); }}
                    >
                        <div className={`w-16 h-12 bg-[#FFECB3] rounded-t-3xl border-2 border-[#FFE082] relative z-20 transition-all duration-300 ${lampOn ? 'shadow-[0_0_120px_rgba(255,236,179,0.9)] bg-yellow-100' : 'bg-stone-400 opacity-50'}`}>
                            <div className="absolute bottom-[-32px] left-1/2 -translate-x-[2px] w-1.5 h-1.5 rounded-full bg-red-500" />
                        </div>
                        <div className="w-1 h-48 bg-[#3E2723]" />
                        <div className="w-12 h-4 bg-[#3E2723] rounded-t-lg" />
                    </div>

                    {/* TV Player (Retro Ghibli Style) */}
                    {youtubeId && (
                        <RetroTV
                            youtubeId={youtubeId}
                            position={videoPos}
                            size={videoSize}
                            onDragStart={(e) => {
                                setIsDraggingTV(true);
                                dragOffset.current = { x: e.clientX - videoPos.x, y: e.clientY - videoPos.y };
                            }}
                            onResizeStart={(e) => {
                                setIsResizingTV(true);
                                resizeStart.current = { w: videoSize.w, h: videoSize.h, x: e.clientX, y: e.clientY };
                            }}
                            onClose={() => setYoutubeId('')}
                        />
                    )}

                    {/* --- PHYSICS LOOT --- */}
                    {droppedLoot.map(loot => (
                        <LootItem key={loot.id} loot={loot} onCollect={collectLoot} />
                    ))}

                    {/* MOCHI (THE ENTITY) */}
                    <div
                        onClick={(e) => {
                            // BOOP PHYSICS
                            setIsBooped(true);
                            setTimeout(() => setIsBooped(false), 400); // Reset after animation

                            handleSlotMachineInteraction();
                            spawnParticles(e.clientX, e.clientY, 'heart');
                            playSound('pop');
                        }}
                        style={{
                            left: `${mochiX}%`,
                            transform: `translateX(-50%) scaleX(${direction})`,
                            transition: isWalking ? `left ${moveDuration} linear` : 'left 0.5s ease-out',
                            zIndex: LAYERS.ENTITIES
                        }}
                        className={`absolute bottom-[25%] cursor-pointer group origin-bottom pointer-events-auto`}
                    >
                        <div className={isBooped ? 'animate-boop' : (isWalking ? 'animate-waddle' : 'animate-breathe')}>
                            {/* <MochiAvatar state={mochiState} isWitchingHour={isWitchingHour} skin={skin} musicVibe={musicVibe} mousePos={eyeTrackingEnabled ? mousePos : null} /> */}
                            <FrameCat state={mochiState} walking={isWalking} />
                        </div>
                    </div>

                    {/* Thought Bubble */}
                    {/* Thought Bubble - Follows MochiX */}
                    {/* Thought Bubble - Anchored near head with tail */}
                    {mochiThought && (
                        <div className="absolute bottom-[230px] z-50 pointer-events-none transition-all duration-1000 ease-out" style={{ left: `${mochiX}%`, transform: 'translateX(-50%)' }}>
                            <div className={`relative animate-pop-elastic px-4 py-3 rounded-2xl shadow-xl max-w-[200px] text-center border-2 ${isWitchingHour ? 'bg-black text-red-500 border-red-500' : 'bg-white text-[#4A403A] border-[#EFEBE9]'}`}>
                                <p className="text-sm font-bold font-serif leading-snug">{mochiThought}</p>
                                {/* Tail */}
                                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#EFEBE9] transform rotate-45"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Wall List (Interactive) - Moved Inside for 16:9 Scaling */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: LAYERS.UI_WORLD || 40 }}>
                    <StickyWallList />
                </div>
            </div>

            {/* --- 3. FOREGROUND LAYER (Blur) - SEPARATE FROM PARALLAX TO STAY FIXED-ISH --- */}
            {/* Actually, foreground blur usually moves MORE. But for now, let's leave it as a static frame or move it manually if we want depth. */}
            {/* To keep it simple and avoid floatiness, let's parent it to the screen, NOT the room container. */}
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
                <div className="absolute bottom-[-50px] left-[-50px] w-96 h-96 bg-[#2E7D32] rounded-full blur-[60px] opacity-20 mix-blend-multiply" />
                <div className="absolute bottom-[-30px] right-[-30px] w-64 h-96 bg-[#5D4037] rounded-full blur-[50px] opacity-20 mix-blend-multiply" />
            </div>

            {/* --- UI OVERLAYS (Fixed) --- */}

            {/* Particles */}
            {/* PARTICLES (Game Engine Render) */}
            {
                particles.map(p => (
                    <div
                        key={p.id}
                        className="fixed pointer-events-none z-[100] will-change-transform"
                        style={{
                            left: p.x,
                            top: p.y,
                            opacity: p.life,
                            transform: `scale(${p.life})`
                        }}
                    >
                        {p.type === 'heart' && <Heart fill={p.color} className="text-pink-500 drop-shadow-sm" size={24} />}
                        {p.type === 'sparkle' && <Sparkles className="text-yellow-400 drop-shadow-sm" size={20} />}
                        {p.type === 'glitch' && <span className="text-green-500 font-mono text-xs">ERR</span>}
                    </div>
                ))
            }

            {/* UI: Unified Status Card (Replaces LoveBar, Clock, Calendar) */}
            <StatusCard loveLevel={bondLevel} catName={catName} onRename={updateCatName} />



            {/* DEV RESET BUTTON (User Requested) */}
            <button
                onClick={() => { setSanity(100); setMochiState('idle'); setMochiThought("Reset invoked."); playSound('click_high_sanity'); }}
                className="absolute top-4 right-4 z-[90] bg-red-500/20 hover:bg-red-500/80 text-white/50 hover:text-white px-2 py-1 rounded text-xs font-mono border border-white/10 backdrop-blur-md transition-all"
            >
                RESET
            </button>

            {/* NEW: Flying Food Layer */}
            {
                flyingFood && (
                    <FlyingFood item={flyingFood.item} startPos={flyingFood.startPos} onComplete={finishFeeding} />
                )
            }

            {/* NEW: Pantry Drawer */}
            <PantryDrawer
                inventory={inventory}
                isOpen={showPantry}
                onClose={() => setShowPantry(false)}
                onFeed={handlePantryFeed}
                onDecorate={placeDecoration}
            />

            {/* Controls (Bottom Dock - Scattered Toys Style with Contrast) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 animate-slide-up pointer-events-auto" style={{ zIndex: LAYERS.HUD }}>

                {/* Focus Mode */}
                <button onClick={(e) => { e.stopPropagation(); closeAllMenus(); toggleFocusMode(); }} title="Focus Mode" className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${focusMode ? 'bg-red-500 text-white border-red-700 shadow-[0_4px_0_#990000]' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}>
                    <Glasses size={24} strokeWidth={2.5} />
                </button>

                {/* Music Menu */}
                <div className="relative group">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            const wasOpen = showMusicMenu;
                            closeAllMenus();
                            if (!wasOpen) {
                                setShowMusicMenu(true);
                                initAudio();
                            }
                        }}
                        title="Music Atmosphere"
                        disabled={focusMode && strictMode}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${focusMode && strictMode ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border-none' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}
                    >
                        <Headphones size={24} strokeWidth={2.5} />
                    </button>
                    {showMusicMenu && !strictMode && (
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-xl flex flex-col gap-2 w-32 animate-fade-in z-50 text-xs text-center border border-[#5D4037]/10" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setMusicVibe('lofi')} className="hover:bg-stone-100 p-2 rounded">Lo-Fi</button>
                            <button onClick={() => setMusicVibe('hype')} className="hover:bg-stone-100 p-2 rounded">Hype</button>
                            <button onClick={() => setMusicVibe('Sad')} className="hover:bg-stone-100 p-2 rounded">Sad</button>
                            <button onClick={() => setMusicVibe(null)} className="hover:bg-stone-100 p-2 rounded text-red-400">Stop</button>
                        </div>
                    )}
                </div>

                {/* PANTRY TOGGLE (Fork & Knife) */}
                <button onClick={(e) => { e.stopPropagation(); const wasOpen = showPantry; closeAllMenus(); if (!wasOpen) setShowPantry(true); }} title="Open Pantry" className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${showPantry ? 'bg-[#5D4037] text-white border-[#3E2723] shadow-[0_4px_0_#2E1D18]' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}>
                    <Utensils size={24} strokeWidth={2.5} />
                </button>

                {/* Skin Menu (Monitor) */}
                <div className="relative group">
                    <button onClick={(e) => { e.stopPropagation(); const wasOpen = showSkinMenu; closeAllMenus(); if (!wasOpen) setShowSkinMenu(true); }} title="Skins & Decorations" className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] bg-[#FAF5E6] text-[#5D4037] hover:bg-white">
                        <Monitor size={24} strokeWidth={2.5} />
                    </button>
                    {showSkinMenu && (
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl w-72 animate-fade-in z-50 border border-[#5D4037]/10" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest">Skins</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => setSkin('default')} className="p-2 border rounded hover:bg-stone-100 text-xs">Standard</button>
                                <button onClick={() => setSkin('void')} className="p-2 border rounded hover:bg-black hover:text-white text-xs">Void</button>
                                <button onClick={() => setSkin('crt')} className="p-2 border rounded hover:bg-green-900 hover:text-green-400 text-xs font-mono">CRT</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Cinema Mode */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeAllMenus(); setShowCinemaInput(!showCinemaInput); }}
                        title="TV Mode"
                        disabled={focusMode && strictMode}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${focusMode && strictMode ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border-none' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}
                    >
                        <PlayCircle size={24} strokeWidth={2.5} />
                    </button>
                    {showCinemaInput && !strictMode && (
                        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-white p-2 rounded-xl shadow-xl flex gap-2 w-64 animate-pop-in z-[80] border border-[#5D4037]/10" onClick={(e) => e.stopPropagation()}>
                            <input type="text" placeholder="YouTube Video ID" className="w-full text-xs p-2 bg-stone-100 rounded outline-none" onChange={(e) => { if (e.target.value.length === 11) { setYoutubeId(e.target.value); setShowCinemaInput(false); } }} />
                        </div>
                    )}
                </div>

                {/* Browser */}
                <button
                    onClick={(e) => { e.stopPropagation(); closeAllMenus(); setShowBrowser(true); }}
                    title="Mochi Web"
                    disabled={focusMode && strictMode}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${focusMode && strictMode ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border-none' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}
                >
                    <Globe size={24} strokeWidth={2.5} />
                </button>

                {/* Bubble Wrap */}
                <button
                    onClick={(e) => { e.stopPropagation(); closeAllMenus(); setShowBubbleWrap(true); }}
                    title="Stress Relief"
                    disabled={focusMode && strictMode}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 active:translate-y-1 shadow-[0_4px_0_#D4C5A9] active:shadow-none border border-[#E0D8C8] ${focusMode && strictMode ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border-none' : 'bg-[#FAF5E6] text-[#5D4037] hover:bg-white'}`}
                >
                    <Sparkles size={24} strokeWidth={2.5} />
                </button>
            </div>

            {/* Wall Decor (Placed Items) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {/* Existing Decorations */}
            </div>



            {/* Input (Whisper) - Magic Bubble Style */}
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-[70] group transition-all duration-500 hover:max-w-md">
                <div className="relative bg-[#FFFBF0]/80 backdrop-blur-xl rounded-[30px] border-2 border-white shadow-[0_0_25px_rgba(255,248,220,0.6)] transition-all duration-300 group-hover:bg-[#FFFBF0] group-hover:scale-105 group-focus-within:bg-white group-focus-within:scale-105 group-focus-within:shadow-[0_0_40px_rgba(255,236,179,0.8)]">
                    <input
                        ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && whisperToMochi()}
                        placeholder={focusMode && strictMode ? "Silence..." : focusMode ? "studying..." : `whisper to ${catName.toLowerCase()}...`}
                        disabled={focusMode && strictMode}
                        className={`w-full bg-transparent text-center text-sm outline-none placeholder:text-[#5D4037]/40 placeholder:font-serif transition-colors duration-300 text-[#5D4037] font-bold font-serif py-4 px-6 rounded-[30px]`}
                    />
                    {/* Subtle Icon Indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5D4037]/40 group-hover:text-[#F48FB1] group-focus-within:text-pink-500 transition-colors pointer-events-none animate-pulse">
                        <MessageCircle size={18} />
                    </div>
                </div>
            </div>

            {/* Wall Decor (Placed Items) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {decorations.map((d) => (
                    <div key={d.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-md opacity-80" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: `translate(${px(0.02)}px, ${py(0.02)}px)` }}>
                        {d.item.includes("Mouse") ? "🐭" : "📦"}
                    </div>
                ))}
            </div>

            {showBrowser && <MiniBrowser onClose={() => setShowBrowser(false)} />}
            {showBubbleWrap && <BubbleWrap onClose={() => setShowBubbleWrap(false)} />}
            {
                showStudyConfig && (
                    <StudyConfigModal
                        duration={studyDuration}
                        setDuration={setStudyDuration}
                        strict={strictMode}
                        setStrict={setStrictMode}
                        onStart={startFocusSession}
                        onClose={() => setShowStudyConfig(false)}
                    />
                )
            }
            {focusMode && <StudyTimerOverlay timeRemaining={focusTime} onCancel={toggleFocusMode} />}


            {/* Runaway Reset Button */}
            <div ref={resetBtnRef} className="absolute bottom-5 right-5 z-50" style={{ transform: `translate(${resetBtnPos.x}px, ${resetBtnPos.y}px)` }} onMouseEnter={() => { setResetBtnPos({ x: Math.random() * 300 - 150, y: Math.random() * 300 - 150 }); }}>
                <button className="text-xs text-stone-400 hover:text-red-500 flex items-center gap-1 opacity-50"><Trash2 size={12} /> Reset System</button>
            </div>
        </div >
    );
};

// --- NEW POLISH COMPONENTS ---

const HangingLantern = () => {
    const [isOn, setIsOn] = useState(true);

    const toggle = () => {
        setIsOn(!isOn);
        // Optional: play sound if we had the context, but avoiding complex prop drilling for now.
    };

    return (
        <div
            onClick={toggle}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-40 animate-sway origin-top cursor-pointer pointer-events-auto group"
        >
            {/* String */}
            <div className="w-0.5 h-16 bg-[#4A3B2A] mx-auto opacity-50" />

            {/* Lantern Body */}
            <div className={`w-16 h-20 bg-[#FFECB3] rounded-full border-4 border-[#FFA000] flex items-center justify-center relative transition-all duration-500
                ${isOn ? 'shadow-[0_0_60px_rgba(255,160,0,0.6)] bg-opacity-100' : 'shadow-none bg-opacity-20 bg-stone-700 border-stone-600'}
            `}>
                <div className="absolute top-[-5px] w-6 h-2 bg-[#5D4037] rounded-sm" />
                <div className="absolute bottom-[-5px] w-6 h-2 bg-[#5D4037] rounded-sm" />
                <span className={`text-[#E65100] font-bold text-2xl transition-opacity duration-300 ${isOn ? 'opacity-50' : 'opacity-10'}`}>福</span>

                {/* Dynamic Global Glow Overlay (The "Light" itself) */}
                {isOn && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,200,100,0.15)_0%,transparent_70%)] pointer-events-none z-[-1]" />
                )}
            </div>

            {/* Tassel */}
            <div className="flex justify-center -mt-1 space-x-1">
                <div className="w-1 h-8 bg-red-500 rounded-full opacity-80" />
                <div className="w-1 h-6 bg-red-500 rounded-full opacity-80" />
                <div className="w-1 h-8 bg-red-500 rounded-full opacity-80" />
            </div>
        </div>
    );
};

const StatusCard = ({ loveLevel, catName, onRename }) => {
    const [time, setTime] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(catName);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleRename = () => {
        if (tempName.trim()) onRename(tempName);
        setIsEditing(false);
    };

    // Analog Hand Rotation
    const secondsRatio = time.getSeconds() / 60;
    const minutesRatio = (secondsRatio + time.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + time.getHours()) / 12;

    return (
        <div className="absolute top-[8%] left-[8%] z-30 flex flex-col items-center pointer-events-auto filter drop-shadow-xl select-none animate-sway-slow">

            {/* 1. HANGING CLOCK */}
            <div className="relative w-28 h-28 bg-[#FFF8E1] rounded-full border-[8px] border-[#5D4037] shadow-inner flex items-center justify-center z-10 transition-transform hover:scale-105">
                {/* Face */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-2 bg-[#8D6E63]" style={{ transform: `rotate(${i * 30}deg) translateY(-42px)` }} />
                ))}
                {/* Hands */}
                <div className="absolute w-1.5 h-8 bg-[#3E2723] rounded-full origin-bottom" style={{ transform: `rotate(${minutesRatio * 360}deg) translateY(-50%)`, bottom: '50%' }} />
                <div className="absolute w-2 h-6 bg-[#3E2723] rounded-full origin-bottom" style={{ transform: `rotate(${hoursRatio * 360}deg) translateY(-50%)`, bottom: '50%' }} />
                <div className="absolute w-0.5 h-10 bg-[#FF7043] rounded-full origin-bottom" style={{ transform: `rotate(${secondsRatio * 360}deg) translateY(-30%)`, bottom: '50%' }} />
                <div className="absolute w-3 h-3 bg-[#5D4037] rounded-full z-20" />
            </div>

            {/* Chains connecting Clock to Name Sign */}
            <div className="flex gap-12 -mt-2 z-0">
                <div className="w-[2px] h-8 bg-[#A1887F]" />
                <div className="w-[2px] h-8 bg-[#A1887F]" />
            </div>

            {/* 2. WOODEN NAME SIGN */}
            <div className="relative bg-[#5D4037] border-2 border-[#3E2723] px-6 py-2 rounded-lg shadow-md transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer" onClick={() => setIsEditing(true)}>
                <div className="absolute top-[-10px] left-4 w-1 h-3 bg-[#A1887F] rounded-full" /> {/* Chain Link visual */}
                <div className="absolute top-[-10px] right-4 w-1 h-3 bg-[#A1887F] rounded-full" />

                {isEditing ? (
                    <input
                        className="bg-[#3E2723] text-[#FFE082] text-sm font-serif font-bold text-center outline-none w-24 rounded"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onBlur={handleRename}
                        onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                        autoFocus
                    />
                ) : (
                    <span className="text-[#FFE082] font-serif font-bold text-base tracking-wider drop-shadow-md">{catName}</span>
                )}
            </div>

            {/* Single Chain to Heart */}
            <div className="w-[1px] h-6 bg-[#A1887F] -mt-1" />

            {/* 3. GLASS HEART VIAL (Love Meter) */}
            <div className="relative w-12 h-12">
                {/* Glass Container */}
                <Heart size={48} className="text-[#3E2723] fill-black/20 stroke-[3px]" />

                {/* Liquid Mask */}
                <div className="absolute inset-0 flex items-end justify-center overflow-hidden" style={{ clipPath: 'path("M24 43.12l-2.9-2.61C10.74 31.18 4 25.1 4 17.61 4 11.5 8.76 6.75 14.88 6.75c3.42 0 6.69 1.58 8.88 4.13h.48C26.43 8.33 29.7 6.75 33.12 6.75 39.24 6.75 44 11.5 44 17.61c0 7.49-6.74 13.57-17.1 22.9L24 43.12z")', transform: 'scale(1)' }}>
                    {/* The Liquid */}
                    <div
                        className="w-full bg-pink-500 transition-all duration-1000 ease-in-out relative opacity-90"
                        style={{ height: `${loveLevel}%` }}
                    >
                        <div className="absolute top-0 w-full h-2 bg-pink-300 opacity-50 animate-wave" /> {/* Surface shimmer */}
                    </div>
                </div>

                {/* Reflection */}
                <div className="absolute top-3 left-3 w-3 h-3 bg-white/40 rounded-full blur-[1px]" />
            </div>

        </div>
    );
};

// --- THE ENTITY AVATAR (REFATACORED CHIBI) ---
const MochiAvatar = ({ state, isWitchingHour, skin, musicVibe, mousePos }) => {
    // EYE TRACKING (Pupils Only)
    const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!mousePos) { setPupilOffset({ x: 0, y: 0 }); return; }
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        // Clamp heavily trackiong for pupils
        setPupilOffset({
            x: Math.max(-4, Math.min(4, (mousePos.x - centerX) / 30)),
            y: Math.max(-2, Math.min(2, (mousePos.y - centerY) / 30))
        });
    }, [mousePos]);

    const getColor = (type) => {
        if (skin === 'void') return type === 'body' ? '#1a1a1a' : '#333';
        if (skin === 'crt') return type === 'body' ? '#003300' : '#00ff00';
        if (isWitchingHour) return type === 'body' ? '#221' : '#f00';
        // STRAWBERRY MILK PALETTE
        return type === 'body' ? '#FFFDD0' : '#4A3B2A';
    };

    return (
        <div className={`relative w-64 h-64 drop-shadow-xl transition-transform duration-300`}>
            {/* Render the appropriate Kawaii Cat based on state/skin */}
            <div className="w-full h-full transform scale-150 origin-bottom">
                {/* For now, we default to the Mochi Blob as it's the main character */}
                {state === 'sleep' || state === 'sleepy' ? <CatOrangeSleeping /> : <CatMochiBlob />}
            </div>
        </div>
    );
};

// --- PHASE 4: UTILITY COMPONENTS ---

const CalendarWidget = ({ expanded, onToggle }) => {
    const today = new Date();
    const date = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const day = today.toLocaleString('default', { weekday: 'long' });

    return (
        <div
            onClick={onToggle}
            className={`absolute top-20 left-20 bg-[#FDF6E3] rounded-lg shadow-xl cursor-pointer transition-all duration-500 overflow-hidden group z-[45] font-serif
            ${expanded ? 'w-64 h-64 p-4 scale-100' : 'w-20 h-24 p-2 scale-90 hover:scale-105 hover:rotate-3'}
            border-4 border-[#8D6E63] text-[#5D4037]`}
        >
            <div className="w-2 h-2 rounded-full bg-stone-300 absolute top-1 left-1/2 -translate-x-1/2 shadow-inner" /> {/* Nail */}

            {!expanded ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest">{month}</span>
                    <span className="text-4xl font-black">{date}</span>
                </div>
            ) : (
                <div className="flex flex-col h-full animate-fade-in">
                    <div className="flex justify-between items-center border-b border-[#5D4037]/20 pb-2 mb-2">
                        <span className="font-bold text-lg">{month} {today.getFullYear()}</span>
                        <span className="text-xs opacity-50">{day}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs flex-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <span key={d} className="font-bold opacity-50">{d}</span>)}
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className={`p-1 rounded-full ${i + 1 === date ? 'bg-red-400 text-white' : 'hover:bg-[#5D4037]/10'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const MiniBrowser = ({ onClose }) => {
    const [page, setPage] = useState('home'); // home, results, article
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [articleContent, setArticleContent] = useState('');
    const [loading, setLoading] = useState(false);

    // Config
    const apiKey = "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";
    const MODEL_NAME = "mistralai/devstral-2512:free";

    const performSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setPage('results');

        try {
            const prompt = `Generate 4 realistic search results for "${query}" in JSON format. Format: [{ "title": "...", "url": "...", "snippet": "..." }]. Make them slightly cat-themed or existential if possible, but mainly helpful.`;
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    "model": MODEL_NAME,
                    "messages": [{ "role": "user", "content": prompt }]
                })
            });
            const data = await res.json();
            const content = data.choices[0].message.content;
            // Best effort extract JSON
            const jsonStr = content.match(/\[.*\]/s)?.[0] || "[]";
            setResults(JSON.parse(jsonStr));
        } catch (err) {
            setResults([{ title: "Connection Error", url: "error://network", snippet: "Mochi chewed the cable." }]);
        } finally {
            setLoading(false);
        }
    };

    const loadPage = async (url, title) => {
        setLoading(true);
        setPage('article');
        try {
            const prompt = `Generate a short webpage content for "${title}". Use semantic HTML (h1, p, ul). Keep it under 200 words. Make it sound like a real article but written by a cat AI.`;
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    "model": MODEL_NAME,
                    "messages": [{ "role": "user", "content": prompt }]
                })
            });
            const data = await res.json();
            setArticleContent(data.choices[0].message.content);
        } catch (err) {
            setArticleContent("<p>404: Mochi Web Error.</p>");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#FDF6E3] rounded-xl shadow-2xl border-2 border-[#5D4037] overflow-hidden z-[100] animate-pop-in flex flex-col font-sans">
            {/* Browser Tools */}
            <div className="bg-[#EFEBE9] p-2 flex items-center gap-2 border-b border-[#5D4037]/20">
                <div className="flex gap-1 mr-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 cursor-pointer hover:bg-red-500" onClick={onClose} />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <button onClick={() => setPage('home')} className="text-xs hover:bg-gray-200 p-1 rounded">🏠</button>
                <input
                    className="flex-1 bg-white text-xs p-1 px-2 rounded-full border border-stone-300 outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search MochiNet..."
                    onKeyDown={(e) => e.key === 'Enter' && performSearch(e)}
                />
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-white relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/90 z-20 flex items-center justify-center">
                        <div className="animate-spin text-2xl">⏳</div>
                    </div>
                )}

                {page === 'home' && (
                    <div className="flex flex-col items-center justify-center h-full gap-4 opacity-50">
                        <span className="text-6xl grayscale">🐱</span>
                        <h1 className="text-2xl font-serif text-[#5D4037]">Mochi Browser</h1>
                    </div>
                )}

                {page === 'results' && (
                    <div className="space-y-4">
                        {results.map((r, i) => (
                            <div key={i} className="group cursor-pointer" onClick={() => loadPage(r.url, r.title)}>
                                <div className="text-xs text-green-700 mb-0.5 max-w-[300px] truncate">{r.url}</div>
                                <div className="text-blue-600 font-medium hover:underline text-lg leading-tight mb-1">{r.title}</div>
                                <div className="text-sm text-gray-600 leading-snug">{r.snippet}</div>
                            </div>
                        ))}
                    </div>
                )}

                {page === 'article' && (
                    <div className="prose prose-sm prose-stone max-w-none" dangerouslySetInnerHTML={{ __html: articleContent }} />
                )}
            </div>
        </div>
    );
};

const BubbleWrap = ({ onClose }) => {
    const [bubbles, setBubbles] = useState(Array.from({ length: 48 }, (_, i) => i));
    const popSound = useMemo(() => new Audio('https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3'), []);

    const pop = (e) => {
        e.target.style.visibility = 'hidden';
        const clone = popSound.cloneNode();
        clone.volume = 0.2;
        clone.play();
    };

    return (
        <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div
                className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-2xl grid grid-cols-8 gap-2 cursor-pointer"
                onClick={(e) => e.stopPropagation()}
            >
                {bubbles.map(b => (
                    <div
                        key={b}
                        className="w-8 h-8 rounded-full bg-blue-200/50 border border-blue-300 shadow-inner hover:bg-blue-300 transition-transform active:scale-90"
                        onMouseDown={pop}
                    />
                ))}
                <div className="col-span-8 text-center mt-2 text-xs font-mono text-blue-900/50">CLICK TO POP • ESC TO CLOSE</div>
            </div>
        </div>
    );
};



const VoidCursor = ({ targetPos }) => {
    const cursorRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let frameId;
        const animate = () => {
            // Lerp towards target with extreme lag
            pos.current.x += (targetPos.x - pos.current.x) * 0.05;
            pos.current.y += (targetPos.y - pos.current.y) * 0.05;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
            }
            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, [targetPos]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="32" height="32" className="drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                <path d="M12 2L15 22L12 18L9 22L12 2Z" />
            </svg>
        </div>
    );
};

// --- LOOT ITEM (Gravity Physics) ---
const LootItem = ({ loot, onCollect }) => {
    const [pos, setPos] = useState({ x: loot.x, y: loot.y });
    const [velY, setVelY] = useState(0); // Velocity

    // Simple gravity simulation
    useEffect(() => {
        let frameId;
        let y = pos.y;
        let dy = 0;
        const gravity = 0.5;
        const bounce = 0.6;
        const floor = 85; // % from top

        const update = () => {
            dy += gravity;
            y += dy;

            if (y > floor) {
                y = floor;
                dy *= -bounce;
                if (Math.abs(dy) < 1) dy = 0; // Stop
            }

            setPos(p => ({ ...p, y }));
            if (Math.abs(dy) > 0.1 || y < floor) frameId = requestAnimationFrame(update);
        };
        update();
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div
            onClick={(e) => { e.stopPropagation(); onCollect(loot.id, loot.item); }}
            className="absolute z-[100] pointer-events-auto cursor-pointer animate-bounce text-4xl hover:scale-125 transition-transform p-4"
            style={{ left: `${loot.x}%`, top: `${pos.y}%` }}
        >
            {/* Hitbox visual aid logic could go here, but p-4 expands click area */}
            {loot.item.includes("Mouse") ? "🐭" :
                loot.item.includes("Fish") ? "🐟" :
                    loot.item.includes("Yarn") ? "🧶" :
                        loot.item.includes("Catnip") ? "🌿" :
                            loot.item.includes("Bell") ? "🔔" :
                                loot.item.includes("Feather") ? "🪶" :
                                    loot.item.includes("Diamond") ? "💎" :
                                        loot.item.includes("Holo") ? "🃏" :
                                            loot.item.includes("Hat") ? "🎩" : "📦"}
        </div>
    );
};

// --- LO-FI DECOR COMPONENTS ---
const Plant = () => (
    <div className="absolute bottom-[25%] left-[5%] w-24 h-40 origin-bottom hover:scale-105 transition-transform z-20 group">
        <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-xl">
            {/* Pot */}
            <path d="M20 100 L 30 140 L 70 140 L 80 100 Z" fill="#795548" />
            <path d="M20 100 L 80 100 L 75 90 L 25 90 Z" fill="#5D4037" />

            {/* Leaves (animated) */}
            <g className="origin-bottom animate-breathe" style={{ animationDuration: '5s' }}>
                <path d="M50 100 Q 20 50 10 20 Q 30 50 50 100" fill="#4CAF50" />
                <path d="M50 100 Q 80 50 90 20 Q 70 50 50 100" fill="#43A047" />
                <path d="M50 100 Q 50 40 50 10 Q 60 40 50 100" fill="#388E3C" />
            </g>
        </svg>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-xs px-2 rounded shadow text-[#5D4037]">Monstera?</div>
    </div>
);

const CoffeeMug = () => (
    <div className="absolute bottom-[10%] left-[65%] w-8 h-8 z-30 group cursor-pointer hover:-translate-y-1 transition-transform">
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
            <path d="M10 10 L 10 30 Q 10 35 15 35 L 25 35 Q 30 35 30 30 L 30 10 Z" fill="#fff" />
            <path d="M30 15 Q 35 15 35 20 Q 35 25 30 25" stroke="#fff" strokeWidth="3" fill="none" />
            {/* Steam */}
            <path d="M15 5 Q 15 0 20 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="animate-pulse opacity-50" />
            <path d="M25 5 Q 25 0 30 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" className="animate-pulse opacity-50" style={{ animationDelay: '0.5s' }} />
        </svg>
    </div>
);

const WallClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
    return (
        <div className="absolute top-[10%] left-[20%] w-16 h-16 bg-[#FDF6E3] rounded-full border-4 border-[#5D4037] shadow-lg flex items-center justify-center z-10 hover:scale-110 transition-transform cursor-pointer group">
            <div className="relative w-full h-full">
                <div className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-[#5D4037] origin-bottom transition-transform" style={{ transform: `translate(-50%, -100%) rotate(${time.getHours() * 30 + time.getMinutes() * 0.5}deg)` }} />
                <div className="absolute top-1/2 left-1/2 w-0.5 h-7 bg-[#8D6E63] origin-bottom transition-transform" style={{ transform: `translate(-50%, -100%) rotate(${time.getMinutes() * 6}deg)` }} />
                <div className="absolute top-1/2 left-1/2 w-0.5 h-7 bg-red-400 origin-bottom transition-transform" style={{ transform: `translate(-50%, -100%) rotate(${time.getSeconds() * 6}deg)` }} />
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#5D4037] rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-xs px-2 whitespace-nowrap rounded shadow text-[#5D4037] font-mono">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};



export default WholesomeCatRoom;
