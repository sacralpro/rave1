"use client";
import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import Image from 'next/image';

const AudioPlayerDownloads = () => {
    const audioRef = useRef<HTMLAudioElement>(null); // Correct ref usage
    const [playing, setPlaying] = useState(false);

    const track = {
        id: 1,
        src: "/Rave.mp3",
        downloadSrc: "/Audentity_Ghost_-_Rave_(Sacral_dJ_Remix).wav",
        title: "AUDENTITY GHOST - RAVE (SACRAL dJ REMIX)"
    };

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if(audioRef.current){
                audioRef.current.play();
                setPlaying(true);
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
            }
        };
    }, []);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setPlaying(!playing);
        }
    };


    return (
        <div className="relative w-full max-w-[300px] h-[300px] bg-gray-800 rounded-2xl overflow-hidden">
            <div className="relative w-full h-full">
                <Image
                    src="/player.png"
                    alt="Track Artwork"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="flex items-center justify-between mb-2">
                    <button onClick={handlePlayPause} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded">
                        {playing ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <div className="flex-grow text-left ml-2 text-white">
                        <span className="">{track.title}</span>
                    </div>
                </div>
                <button
                    className="w-full bg-black text-white p-2 rounded-lg hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-500/50 transition-colors duration-300 mt-2"
                >
                    <a href={track.downloadSrc} download className="flex items-center">
                        <FaDownload size={16} className="mr-2" /> Download
                    </a>
                </button>
            </div>
            <audio ref={audioRef} src={track.src} preload="auto"/> {/* Corrected line */}
        </div>
    );
};

export default AudioPlayerDownloads;
