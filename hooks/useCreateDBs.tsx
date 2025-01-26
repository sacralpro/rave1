import { database, ID } from '@/libs/AppWriteClient';

const useCreateDBs = async (telegram: string, email: string): Promise<boolean> => {
    if (!telegram || !email) {
        console.error("Error: Telegram and email cannot be empty.");
        throw new Error("Please fill in all fields.");
    }

    if (typeof window === 'undefined') {
        console.warn("useCreateDBs called on the server, skipping AppWrite interaction.");
        return false; // Indicate failure, but don't throw an error
    }

    try {
        const documentId = ID.unique();
        const response = await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_DB),
            documentId,
            { telegram, email }
        );
        console.log('Данные успешно отправлены. Document ID:', response.$id);
        return true;
    } catch (error: any) {
        console.error('Ошибка при отправке данных:', error);
        console.error('Error details:', error.message, error.response);
        throw new Error("Failed to submit the form. Please try again later.");
    }
};

export default useCreateDBs;