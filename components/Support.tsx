import React from 'react';
//import TelegramIcon from '@mui/icons-material/Telegram'; // Или другой иконки библиотеки


interface SupportButtonProps {
  onClick?: () => void; // Добавлен onClick для функциональности
}

const SupportButton: React.FC<SupportButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 20px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        color: '#fff', // Пример цвета, можно изменить
      }}
    >
   Support
    </button>
  );
};

export default SupportButton;
