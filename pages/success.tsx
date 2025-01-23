"use client";
import { useRouter } from 'next/router';
import { useState } from 'react';
import AudioPlayerDownloads from '@/components/AudioPlayerDownloads';
import FormComponent from '@/components/FormComponent'; // Импортируем FormComponent

const Success: React.FC = () => {
    const router = useRouter();
    const { session_id } = router.query;
    const [isFormVisible, setIsFormVisible] = useState(true); // Стейт для управления видимостью формы

    const handleFormClose = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-5">
            <p className="text-lg mb-4">Here you can download wav track. Enjoy {session_id}</p>
            <AudioPlayerDownloads />
            {isFormVisible && <FormComponent onClose={handleFormClose} />} {/* Используем новый компонент */}
        </div>
    );
};

export default Success;
