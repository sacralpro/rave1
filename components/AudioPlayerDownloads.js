"use client";
import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import Image from 'next/image';


const AudioPlayerDownloads = () => {
    const audioRefs = useRef([]);
    const [playingTrackIndex, setPlayingTrackIndex] = useState(null);

    const tracks = [
        { id: 1, src: "/Rave.mp3", downloadSrc: "/Audentity_Ghost_-_Rave_(Sacral_dJ_Remix).wav", title: "AUDENTITY GHOST - RAVE (SACRAL dJ REMIX)" },
    ];

    useEffect(() => {
        const audioElements = audioRefs.current;
        const timeUpdateHandlers = [];

        audioElements.forEach((audio, index) => {
            const handler = () => {
                if (audio) {
                    const progressBar = document.getElementById(`progress-bar-${index}`);
                    if (progressBar) {
                        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                    }
                }
            };
            timeUpdateHandlers[index] = handler;
            audio.addEventListener("timeupdate", handler);
        });

        return () => {
            audioElements.forEach((audio, index) => {
                audio.removeEventListener("timeupdate", timeUpdateHandlers[index]);
            });
        };
    }, []);

    const handleTrackClick = async (index) => {
        const audioEl = audioRefs.current[index];
        if (!audioEl) return;

        try {
            if (playingTrackIndex === index) {
                if (audioEl.paused) {
                    await audioEl.play();
                } else {
                    audioEl.pause();
                    setPlayingTrackIndex(null);
                }
            } else {
                if (playingTrackIndex !== null) {
                    audioRefs.current[playingTrackIndex].pause();
                }
                await audioEl.play();
                setPlayingTrackIndex(index);
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    const handleProgressClick = (e, index) => {
        const audioEl = audioRefs.current[index];
        if (!audioEl || audioEl.duration === 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;

        audioEl.currentTime = percentage * audioEl.duration;
    };

    return (
        <div className="relative w-full max-w-[600px] h-[500px] bg-gray-800 rounded-2xl overflow-hidden">
            <Image
                src="/player.png" // Replace with your image path
                alt="Track Artwork"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg mb-4"
            />
            <div className="absolute bottom-0 left-0 w-full h-[100px] p-12 mb-5">
                {tracks.map((track, index) => (
                    <div key={track.id} className="flex items-center justify-between">
                        <button onClick={() => handleTrackClick(index)} className="text-white p-2">
                            {playingTrackIndex === index ? <FaPause size={24}/> : <FaPlay size={24} />}
                        </button>
                        <div className="flex-grow text-left ml-2">
                            <span className="text-lg absolute top-0 left-12">{track.title}</span>
                        </div>
                       
                        <div
                            className="w-full h-1 bg-white mt-2 cursor-pointer rounded-full"
                            onClick={(e) => handleProgressClick(e, index)}
                        >
                            <div
                                id={`progress-bar-${index}`}
                                style={{
                                    width: "0%",
                                    height: "100%",
                                    backgroundColor: "pink",
                                    transition: "width 0.2s ease",
                                }}
                            />
                        </div>
                        <a href={track.downloadSrc} download className="text-white ml-2 p-2">
                            <FaDownload size={24} />
                        </a>
                        <audio
                            ref={(el) => (audioRefs.current[index] = el)}
                            src={track.src}
                            preload="auto"
                            data-index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioPlayerDownloads;
