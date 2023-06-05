import { useEffect } from 'react';

export const Modal = ({ onModalClick, largeImageURL, tags }) => {
  const onClose = e => {
    if (e.code === 'Escape') {
      onModalClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onClose);
    return () => window.removeEventListener('keydown', onClose);
  });

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onModalClick();
    }
  };

  return (
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};
