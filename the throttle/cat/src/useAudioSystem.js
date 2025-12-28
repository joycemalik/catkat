import { useEffect, useRef } from 'react';

export const useAudioSystem = (sanity, isWitchingHour, musicVibe) => {
    const audioCtx = useRef(null);
    const humOsc = useRef(null);
    const humGain = useRef(null);
    const rainNode = useRef(null);
    const rainGain = useRef(null);
    const musicNode = useRef(null); // To store the <audio> element or BufferSource
    const musicGain = useRef(null);
    const isInit = useRef(false);

    // Initialize Audio Context on first interaction
    const initAudio = () => {
        if (isInit.current) return;
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtx.current = new Ctx(); // Create global context

        // --- LAYER 1: 19Hz INFRASOUND HUM (Low Sanity) ---
        humOsc.current = audioCtx.current.createOscillator();
        humGain.current = audioCtx.current.createGain();

        humOsc.current.type = 'sine';
        humOsc.current.frequency.value = 19; // Infrasound
        humGain.current.gain.value = 0; // Start silent

        humOsc.current.connect(humGain.current);
        humGain.current.connect(audioCtx.current.destination);
        humOsc.current.start();

        // --- LAYER 1.5: PINK NOISE (Rain/Static) ---
        // We'll create a buffer for noise
        const bufferSize = 2 * audioCtx.current.sampleRate;
        const noiseBuffer = audioCtx.current.createBuffer(1, bufferSize, audioCtx.current.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02; // Filtered brown/pink noise
            lastOut = output[i];
            output[i] *= 3.5;
        }

        rainNode.current = audioCtx.current.createBufferSource();
        rainNode.current.buffer = noiseBuffer;
        rainNode.current.loop = true;
        rainGain.current = audioCtx.current.createGain();
        rainGain.current.gain.value = 0.05; // Base rain volume

        rainNode.current.connect(rainGain.current);
        rainGain.current.connect(audioCtx.current.destination);
        rainNode.current.start();

        // --- LAYER 2: MUSIC ---
        // Setup Music Gain Node
        musicGain.current = audioCtx.current.createGain();
        musicGain.current.gain.value = 0;
        musicGain.current.connect(audioCtx.current.destination);

        isInit.current = true;
    };

    // --- MUSIC MANAGER (DEBUGGED) ---
    useEffect(() => {
        if (!isInit.current || !audioCtx.current) {
            // Only warn if we actually have a music vibe intended, otherwise it's just idle
            if (musicVibe) console.warn("Audio System: Context not initialized yet.");
            return;
        }

        const now = audioCtx.current.currentTime;
        console.log(`Audio System: Music Vibe changed to '${musicVibe}'. Ctx State: ${audioCtx.current.state}`);

        if (audioCtx.current.state === 'suspended') {
            audioCtx.current.resume().then(() => console.log("Audio System: Context Resumed for Music"));
        }

        if (musicVibe === 'lofi') {
            // Check if already playing
            if (!musicNode.current) {
                console.log("Audio System: Creating new Audio instance for /music/lofi.mp3");
                const audio = new Audio('/music/lofi.mp3');
                audio.loop = true;
                audio.crossOrigin = 'anonymous';

                // Connect HTML5 Audio to Web Audio API for gain control
                try {
                    const source = audioCtx.current.createMediaElementSource(audio);
                    source.connect(musicGain.current);
                    console.log("Audio System: Connected MediaElementSource");
                } catch (err) {
                    console.error("Audio System: Failed to connect source", err);
                }

                audio.play()
                    .then(() => console.log("Audio System: Playback started successfully"))
                    .catch(e => console.error("Audio System: Audio play failed:", e));

                musicNode.current = audio;
            } else {
                // Ensure it's playing if it was paused
                musicNode.current.play().catch(e => console.error("Audio System: Resume failed:", e));
            }
            // Fade In
            console.log("Audio System: Fading In...");
            musicGain.current.gain.cancelScheduledValues(now);
            musicGain.current.gain.setValueAtTime(0, now); // Reset to 0 first
            musicGain.current.gain.linearRampToValueAtTime(0.5, now + 2); // Target volume 0.5
        } else {
            console.log("Audio System: Stopping/Fading Out...");
            // Fade Out & Stop
            if (musicNode.current) {
                musicGain.current.gain.cancelScheduledValues(now);
                musicGain.current.gain.linearRampToValueAtTime(0, now + 1.5);

                // Cleanup after fade
                setTimeout(() => {
                    if (musicNode.current && musicVibe !== 'lofi') {
                        musicNode.current.pause();
                        musicNode.current.currentTime = 0;
                        musicNode.current = null;
                        console.log("Audio System: Track paused and nulled.");
                    }
                }, 1550);
            }
        }
    }, [musicVibe]);


    // Dynamic Mix based on Sanity
    useEffect(() => {
        if (!isInit.current || !audioCtx.current) return;

        const now = audioCtx.current.currentTime;
        // High Sanity = Rain (0.05) -> Low Sanity = Hum (0.5)
        // Invert: Sanity 100 -> Hum 0. Sanity 0 -> Hum 0.5.
        const humVol = ((100 - sanity) / 100) * 0.5;
        const rainVol = (sanity / 100) * 0.05;

        // Smooth transition
        humGain.current.gain.setTargetAtTime(humVol, now, 2);
        rainGain.current.gain.setTargetAtTime(rainVol, now, 2);

    }, [sanity]);

    // UI Sounds (Synthesized)
    const playSound = (type) => {
        if (!audioCtx.current) { initAudio(); return; } // Try init if not ready
        if (audioCtx.current.state === 'suspended') audioCtx.current.resume();

        const osc = audioCtx.current.createOscillator();
        const gain = audioCtx.current.createGain();
        const now = audioCtx.current.currentTime;

        osc.connect(gain);
        gain.connect(audioCtx.current.destination);

        if (type === 'click_high_sanity') {
            // Cute Pop
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'click_low_sanity') {
            // Wet Squelch / Static Burst
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(50, now);
            osc.frequency.linearRampToValueAtTime(20, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'whisper') {
            // Stereo Panned Noise Burst (Ghost Whisper)
            // Just simulate with oscillator for now
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.5);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.05, now + 0.2);
            gain.gain.linearRampToValueAtTime(0, now + 0.5);

            osc.start(now);
            osc.stop(now + 0.5);
        }
    };

    return { initAudio, playSound };
};
