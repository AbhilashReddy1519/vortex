interface AppLayoutProps {
  children: ReactNode;
}

type PasswordInputProps = {
  label: string;
  id: string;
  labelStyles?: string;
  inputStyles?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: Record<string, any>;
} & React.InputHTMLAttributes<HTMLInputElement>;
