"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
    const Lottie = dynamic(() => import('lottie-react'), { ssr: false }); // Dynamic import of Lottie

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
                }, 2000); 
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error submitting form:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        //Clean up the error after a while
        const timeoutId = setTimeout(() => setError(null), 5000);  
        return () => clearTimeout(timeoutId);
    }, [error]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Reduced opacity */}
            <div className="relative"> {/*Added a relative div to contain the modal */}
              {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10"> {/* Overlay for loading */}
                      <div className="text-white text-xl">Loading...</div> 
                  </div>
              )}
              {success && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10"> {/* Overlay for success */}
                      <Lottie animationData={require('@/public/lottie/success.json')} className="w-48 h-48" loop={false} />
                  </div>
              )}
              {error && (
                  <div className="text-red-500 text-center mt-2 absolute bottom-0 left-0 w-full p-2">
                    {error}
                  </div>
                )}
              <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-96 bg-white text-gray-800 relative"> {/* Changed form background color */}
                  <button
                      type="button"
                      onClick={onClose}
                      className="absolute top-2 right-2 text-gray-800 hover:text-gray-600"
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
                          className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 placeholder-gray-400"
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
                          className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 placeholder-gray-400"
                          required
                      />
                  </div>

                  <button
                      type="submit"
                      className="w-full bg-pink-500 mt-4 text-white font-bold py-3 rounded-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                      disabled={isLoading}
                  >
                      {isLoading ? 'Submitting...' : 'Send'}
                  </button>
              </form>
            </div>
        </div>
    );
};

export default FormComponent;
