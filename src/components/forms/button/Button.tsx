'use client';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  wFull?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseStyles = 'text-white cursor-pointer rounded w-full';

  const variantStyles = {
    primary: 'border-indigo-600 border bg-indigo-600',
    secondary: 'bg-light-gray text-text-secondary',
  };
  const sizeStyles = {
    sm: 'p-2 text-[14px]',
    md: 'p-4',
    lg: 'p-6 text-[18px]',
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      type={type}
    >
      {children}
    </button>
  );
}
