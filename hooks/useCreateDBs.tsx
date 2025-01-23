import { database, ID } from '@/libs/AppWriteClient';

const useCreateDBs = async (telegram: string, email: string) => {
    try {
        await database.createDocument(
            String(process.env.NEXT_PUBLIC_DATABASE_ID),
            String(process.env.NEXT_PUBLIC_COLLECTION_ID_DB),
            ID.unique(),
            { telegram, email }
        );
        console.log('Данные успешно отправлены');
    } catch (error) {
        console.error('Ошибка при отправке данных:', error);
        throw error; // Propagate the error
    }
};

export default useCreateDBs;
