import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, className = '', href, variant = 'primary', ...props }) => {
  const baseStyles = "px-8 py-3 font-bold rounded-lg transition-all inline-block text-center";
  const primaryStyles = "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-[0_0_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)]";
  const secondaryStyles = "bg-transparent border border-indigo-400 text-indigo-100 hover:bg-indigo-900/30 hover:border-indigo-300";
  
  const styles = `${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};
