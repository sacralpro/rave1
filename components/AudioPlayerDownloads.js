"use client";

import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa"; // Импортируем иконки

const AudioPlayerDownloads = () => {
    const audioRefs = useRef([]);
    const [playingTrackIndex, setPlayingTrackIndex] = useState(null);

    // Обновленный массив треков с указанием .wav для загрузки и .mp3 для воспроизведения
    const tracks = [
        { id: 1, src: "/Rave.mp3", downloadSrc: "/Audentity_Ghost_-_Rave_(Sacral_dJ_Remix).wav", title: "AUDENTITY GHOST - RAVE (SACRAL dJ REMIX)" },
    ];

    useEffect(() => {
        const audioElements = audioRefs.current;

        audioElements.forEach(audio => {
            audio.addEventListener("timeupdate", () => {
                if (audio) {
                    const progressBar = document.getElementById(`progress-bar-${audio.dataset.index}`);
                    if (progressBar) {
                        progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
                    }
                }
            });
        });

        return () => {
            audioElements.forEach(audio => {
                audio.removeEventListener("timeupdate", () => {});
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
        if (!audioEl) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;

        audioEl.currentTime = percentage * audioEl.duration;
    };

    return (
        <div className="flex flex-col items-center w-full mb-4">
            {tracks.map((track, index) => (
                <div
                    key={track.id}
                    className={`relative flex flex-col text-white rounded-lg mx-2 my-2 bg-gray-900 ${playingTrackIndex === index ? "border-2 border-pink-400" : ""} p-2`}  // Added padding for better spacing
                    style={{ width: '600px', height: '100px' }} // Fixed dimensions
                >
                    <div className="flex items-center justify-between w-full">
                        <button onClick={() => handleTrackClick(index)} className="text-white">
                            {playingTrackIndex === index ? <FaPause /> : <FaPlay />}
                        </button>
                        <span className="flex-grow text-left ml-2">{track.title}</span>
                        <a href={track.downloadSrc} download className="text-pink-400">
                            <FaDownload />
                        </a>
                    </div>
                    {/* Полоса для перемотки с прижатием к низу */}
                    <div
                        className="w-full h-1 bg-gray-600 mt-2 cursor-pointer rounded-full"
                        onClick={(e) => handleProgressClick(e, index)}
                    >
                        <div
                            id={`progress-bar-${index}`}
                            style={{
                                width: "0%",
                                height: "100%",
                                backgroundColor: "pink", // Set color of the playing progress bar to pink
                                transition: "width 0.2s ease",
                            }}
                        />
                    </div>
                    <audio
                        ref={(el) => (audioRefs.current[index] = el)}
                        src={track.src}
                        preload="auto"
                        data-index={index}
                    />
                </div>
            ))}
            {/* Responsive Design */}
            <style jsx>{`
                @media (max-width: 640px) { 
                    div {
                        width: 100%; // Full width on smaller screens
                        height: auto; // Allow height to adjust accordingly
                    }
                }
            `}</style>
        </div>
    );
};

export default AudioPlayerDownloads;
