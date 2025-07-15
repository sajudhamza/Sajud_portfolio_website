import React, { useState, useEffect } from 'react';

const TypingEffect = ({ phrases, className }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullTxt = phrases[currentPhraseIndex];
      if (isDeleting) {
        setCurrentText(fullTxt.substring(0, currentText.length - 1));
        setTypingSpeed(75);
      } else {
        setCurrentText(fullTxt.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullTxt) {
        setTimeout(() => setIsDeleting(true), 1000);
        setTypingSpeed(1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(500);
      }
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentText, isDeleting, typingSpeed, phrases, currentPhraseIndex]);

  return <span className={className}>{currentText}</span>;
};

export default TypingEffect;