interface InputTextProps {
  type?: 'text' | 'passowrd';
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  value: string;
  onChange: (targetValue: string) => void;
}

export default function InputText({
  type = 'text',
  name = '',
  size = 'md',
  placeholder = '',
  value,
  onChange,
}: InputTextProps) {
  const baseStyles = 'w-full outline-none rounded border border-gray-300';
  const sizeStyles = {
    sm: 'p-2 text-[14px]',
    md: 'p-4',
    lg: 'p-6 text-[18px]',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={`${baseStyles} ${sizeStyles[size]}`}
      type={type}
      name={name}
      placeholder={placeholder}
      autoFocus={true}
      onChange={handleChange}
      value={value}
    />
  );
}
