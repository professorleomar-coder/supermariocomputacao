/**
 * Super Bit Bros - Sintetizador de Áudio Procedural (Web Audio API)
 * Efeitos sonoros retrô 8-bit e trilha chiptune procedural sem dependências externas.
 */

class SoundSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
        this.musicPlaying = false;
        this.musicTimer = null;
        this.tempo = 140; // BPM
        this.step = 0;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted) {
            this.stopMusic();
        } else {
            this.startMusic();
        }
        return this.isMuted;
    }

    // Toca som de pulo (Mario jump style)
    playJump() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
    }

    // Toca som de moeda / bit coletado
    playCoin() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';

        // Nota B5 para E6
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    // Bate no bloco
    playBump() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.11);
    }

    // Pisar no Bug/Inimigo
    playStomp() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.19);
    }

    // PowerUp / Item Revelado
    playPowerUp() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [330, 392, 659, 523, 587, 784];
        
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const noteStart = now + i * 0.07;

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, noteStart);

            gain.gain.setValueAtTime(0.2, noteStart);
            gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteStart);
            osc.stop(noteStart + 0.09);
        });
    }

    // Resposta Correta do Desafio BNCC
    playQuizCorrect() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C

        chord.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + idx * 0.08;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.45);
        });
    }

    // Resposta Incorreta
    playQuizWrong() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.setValueAtTime(110, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.36);
    }

    // Fanfarra de Vitória da Fase
    playVictory() {
        if (this.isMuted) return;
        this.init();
        const now = this.ctx.currentTime;
        const melody = [
            { f: 523.25, d: 0.15 }, // C5
            { f: 659.25, d: 0.15 }, // E5
            { f: 783.99, d: 0.15 }, // G5
            { f: 1046.50, d: 0.3 }, // C6
            { f: 880.00, d: 0.2 },  // A5
            { f: 1046.50, d: 0.6 }  // C6
        ];

        let offset = 0;
        melody.forEach(item => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const t = now + offset;

            osc.type = 'square';
            osc.frequency.setValueAtTime(item.f, t);

            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + item.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + item.d + 0.05);
            offset += item.d + 0.05;
        });
    }

    // Trilha Chiptune Retrô Contínua (BGM Procedural)
    startMusic() {
        if (this.isMuted || this.musicPlaying) return;
        this.init();
        this.musicPlaying = true;
        this.step = 0;

        // Linha melódica clássica estilo plataforma arcade
        const notes = [
            659.25, 659.25, 0, 659.25, 0, 523.25, 659.25, 0, // E, E, _, E, _, C, E, _
            783.99, 0, 0, 0, 392.00, 0, 0, 0,                // G, _, _, _, g, _, _, _
            523.25, 0, 0, 392.00, 0, 0, 329.63, 0,          // C, _, _, G, _, _, E, _
            0, 440.00, 0, 493.88, 466.16, 440.00, 0, 0      // _, A, _, B, Bb, A, _, _
        ];

        const bassNotes = [
            130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0,
            98.00, 0, 98.00, 0, 98.00, 0, 98.00, 0,
            130.81, 0, 130.81, 0, 130.81, 0, 130.81, 0,
            87.31, 0, 87.31, 0, 98.00, 0, 98.00, 0
        ];

        const stepDuration = 60 / (this.tempo * 2); // semicocheias

        const playTick = () => {
            if (!this.musicPlaying || this.isMuted) return;
            const now = this.ctx.currentTime;
            const noteIdx = this.step % notes.length;
            const freqLead = notes[noteIdx];
            const freqBass = bassNotes[noteIdx];

            if (freqLead > 0) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freqLead, now);

                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + stepDuration);
            }

            if (freqBass > 0) {
                const bassOsc = this.ctx.createOscillator();
                const bassGain = this.ctx.createGain();
                bassOsc.type = 'triangle';
                bassOsc.frequency.setValueAtTime(freqBass, now);

                bassGain.gain.setValueAtTime(0.12, now);
                bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration * 0.95);

                bassOsc.connect(bassGain);
                bassGain.connect(this.ctx.destination);
                bassOsc.start(now);
                bassOsc.stop(now + stepDuration);
            }

            this.step++;
            this.musicTimer = setTimeout(playTick, stepDuration * 1000);
        };

        playTick();
    }

    stopMusic() {
        this.musicPlaying = false;
        if (this.musicTimer) {
            clearTimeout(this.musicTimer);
            this.musicTimer = null;
        }
    }
}

// Instância Global
const sounds = new SoundSystem();
