"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Download } from "lucide-react";
import Image from 'next/image';

export default function AudioPlayerDownloads() {
    const audioRef = useRef(null); // Use useRef() to create a reference for the audio element
    const [playing, setPlaying] = useState(false);

    const track = {
        id: 1,
        src: "/Rave.mp3",
        downloadSrc: "/Audentity_Ghost_-_Rave_(Sacral_dJ_Remix)_IDALLLab.wav",
        title: "AUDENTITY GHOST - RAVE (SACRAL dJ REMIX)"
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
            setPlaying(!playing);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setPlaying(false);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    return (
        <div className="relative w-full max-w-[300px] h-[300px] bg-gray-800 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                <Image
                    src="/player.png"
                    alt="Track Artwork"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 space-y-3">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={handlePlayPause} 
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
                        aria-label={playing ? "Pause" : "Play"}
                    >
                        {playing ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">
                            {track.title}
                        </h3>
                    </div>
                </div>
                
                <a
                    href={track.downloadSrc}
                    download
                    className="flex items-center justify-center gap-2 w-full bg-pink-600 hover:bg-pink-700 text-white p-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
                >
                    <Download size={16} />
                    <span>Download WAV</span>
                </a>
            </div>
            <audio ref={audioRef} src={track.src} preload="metadata" />
        </div>
    );
}
