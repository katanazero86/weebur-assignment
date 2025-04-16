interface SelectProps {
  initOptions: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  value: string;
  onChange: (targetValue: string) => void;
}

export default function Select({ initOptions, size = 'md', name = '', value, onChange }: SelectProps) {
  const baseStyles = 'border border-gray-200 outline-none cursor-pointer w-full';
  const sizeStyles = {
    sm: 'p-2 text-[14px]',
    md: 'p-4',
    lg: 'p-6 text-[18px]',
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select className={`${baseStyles} ${sizeStyles[size]}`} name={name} value={value} onChange={handleChange}>
      {initOptions.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
