import React from 'react';

interface ITextGradientProps {
  text: string;
  className?: string;
}

const TextGradient = ({ text, className = '' }: ITextGradientProps) => {
  return (
    <span
      className={`inline-block text-[22px] leading-[30px] font-semibold sm:text-[28px] sm:leading-[38px] md:text-[36px] md:leading-[46px] ${className}`}
      style={{
        background:
          'linear-gradient(90deg, #E7485A 0%, #EB6E80 52.4%, #FF82F5 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </span>
  );
};

export default TextGradient;
