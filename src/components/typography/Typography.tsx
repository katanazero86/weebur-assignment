type AllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
interface TypographyProps<T extends AllowedElements = 'div'> {
  as?: T;
  className?: string;
  children: React.ReactNode;
}

export default function Typography<T extends AllowedElements = 'div'>({
  as,
  className,
  children,
  ...props
}: TypographyProps<T> & React.ComponentPropsWithoutRef<T>) {
  const Component = as || 'div';

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}
