"use client";

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from "@/public/lottie/success.json";
import useCreateDBs from '@/hooks/useCreateDBs';


interface FormComponentProps {
    onClose: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onClose }) => {
    const [telegram, setTelegram] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const success = await useCreateDBs(telegram, email);
            if (success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000); // Close after 2 seconds to show success animation
                if (typeof window !== 'undefined') {
                    setTimeout(() => {
                        onClose();
                    }, 2000); // Close after 2 seconds to show success animation
                }
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error submitting form:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
      //Optional: Add a visual cue like a checkmark instead of just hiding the form
    }, [success]);


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100 z-50">
            {isLoading && (
                <div className="flex flex-col top-0 absolute z-100 w-full justify-center items-center">
                    <div>Loading...</div> {/* Replace with a better loading indicator */}
                </div>
            )}
            {success && (
                <div className="flex flex-col top-0 absolute z-100 w-full justify-center items-center">
                    <Lottie animationData={animationData} className="flex justify-center items-center" loop={false} />
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center mt-2">
                  {error}
                </div>
              )}
            <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-96 relative  text-white">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white hover:text-gray-400"
                >
                    &times;
                </button>
                <h2 className="text-lg font-bold mb-4">Fill out the form to download a track WAV</h2>

                <div className="mb-4">
                    <label
                        htmlFor="telegram"
                        className="block text-sm font-medium text-gray-700"
                    >
                        @YourTelegramAccount
                    </label>
                    <input
                        type="text"
                        id="telegram"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        className="mt-1 block w-full bg-black text-white border border-gray-300 rounded-2xl p-2 placeholder-gray-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full bg-black text-white border border-gray-300 rounded-2xl p-2 placeholder-gray-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-pink-500 mt-4 text-white font-bold py-3 rounded-2xl hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default FormComponent;