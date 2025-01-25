import { database, ID } from '@/libs/AppWriteClient';

const useCreateDBs = async (telegram: string, email: string): Promise<boolean> => {
    if (!telegram || !email) {
        console.error("Error: Telegram and email cannot be empty.");
        throw new Error("Please fill in all fields."); //Throw a custom error for better user feedback
    }

    try {
        const documentId = ID.unique();
        const response = await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_DB),
            documentId,
            { telegram, email }
        );
        console.log('Данные успешно отправлены. Document ID:', response.$id); // Log the document ID
        return true; // Indicate success
    } catch (error: any) {
        console.error('Ошибка при отправке данных:', error);
        console.error('Error details:', error.message, error.response); //Add more detailed error logging
        // Consider more specific error handling based on the error type from AppWrite
        throw new Error("Failed to submit the form. Please try again later."); //User-friendly error
    }
};

export default useCreateDBs;
