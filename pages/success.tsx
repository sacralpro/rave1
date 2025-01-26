"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const AudioPlayerDownloads = dynamic(() => import('@/components/AudioPlayerDownloads'), { 
  ssr: false 
});

const FormComponent = dynamic(() => import('@/components/FormComponent'), { 
  ssr: false 
});

export default function Success() {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = useSearchParams();
            setSessionId(searchParams.get('session_id') || '');
        }
    }, []);

    const handleFormClose = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-5">
            <p className="text-lg mb-4">{sessionId}</p>
            <AudioPlayerDownloads />
            {isFormVisible && <FormComponent onClose={handleFormClose} />}
        </div>
    );
}