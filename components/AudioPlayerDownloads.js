"use client";
import { useRef, useEffect, useState } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import Image from 'next/image';

const AudioPlayerDownloads = () => {
    const audioRefs = useRef([]);
    const [playingTrackIndex, setPlayingTrackIndex] = useState(null);
    const [progressValues, setProgressValues] = useState([]); //Store progress for each track

    const tracks = [
        { id: 1, src: "/Rave.mp3", downloadSrc: "/Audentity_Ghost_-_Rave_(Sacral_dJ_Remix).wav", title: "AUDENTITY GHOST - RAVE (SACRAL dJ REMIX)" },
    ];

    useEffect(() => {
        const audioElements = audioRefs.current;
        audioElements.forEach((audio, index) => {
            audio.addEventListener("timeupdate", () => {
                const newProgressValues = [...progressValues];
                newProgressValues[index] = (audio.currentTime / audio.duration) * 100;
                setProgressValues(newProgressValues);
            });
        });

        return () => {
            audioElements.forEach((audio, index) => {
                audio.removeEventListener("timeupdate", () => {}); //Clean up event listener
            });
        };
    }, [progressValues]); // Add progressValues to dependency array

    const handleTrackClick = async (index) => {
        const audioEl = audioRefs.current[index];
        if (!audioEl) return;

        if (playingTrackIndex === index) {
            audioEl.paused ? await audioEl.play() : audioEl.pause();
            setPlayingTrackIndex(audioEl.paused ? index : null);
        } else {
            audioRefs.current.forEach((audio, i) => { //Pause all other audio
              if (i !== index) audio.pause();
            });
            await audioEl.play();
            setPlayingTrackIndex(index);
        }
    };

    const handleProgressClick = (e, index) => {
        const audioEl = audioRefs.current[index];
        if (audioEl && audioEl.duration > 0) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            audioEl.currentTime = percentage * audioEl.duration;
        }
    };
    
    return (
        <div className="relative w-full max-w-[300px] h-[300px] bg-gray-800 rounded-2xl overflow-hidden">
            {/* ... Image remains the same ... */}
            <div className="absolute bottom-0 left-0 w-full p-4">
                {tracks.map((track, index) => (
                    <div key={track.id} className="flex items-center justify-between mb-2">
                        <button onClick={() => handleTrackClick(index)} className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded">
                            {playingTrackIndex === index ? <FaPause size={20} /> : <FaPlay size={20} />}
                        </button>
                        <div className="flex-grow text-left ml-2 text-white">
                            <span className={styles.marquee}>{track.title}</span>
                        </div>
                        <div
                            className="w-full h-1 bg-gray-600 rounded-full mt-1 cursor-pointer"
                            onClick={(e) => handleProgressClick(e, index)}
                        >
                            <div
                                style={{
                                    width: `${progressValues[index] || 0}%`, // Use progress from state
                                    height: "100%",
                                    backgroundColor: "pink",
                                    transition: "width 0.2s ease",
                                }}
                            />
                        </div>
                    </div>
                ))}
                <button
                    className="w-full bg-black text-white p-2 rounded-lg hover:bg-pink-500 hover:shadow-lg hover:shadow-pink-500/50 transition-colors duration-300 mt-2"
                >
                    <a href={tracks[0].downloadSrc} download className="flex items-center">
                        <FaDownload size={16} className="mr-2" /> Download
                    </a>
                </button>
            </div>
            {tracks.map((track, index) => (
                <audio
                    key={track.id}
                    ref={(el) => (audioRefs.current[index] = el)}
                    src={track.src}
                    preload="auto"
                />
            ))}
        </div>
    );
};

export default AudioPlayerDownloads;