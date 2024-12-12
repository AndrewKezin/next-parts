'use client';

import { Input } from '../ui';
import { ErrorText, RequiredSymbol, ClearButton } from '../shared';
import { useFormContext } from 'react-hook-form';

// наследуется от базового HTML инпута, поэтому будет доступен placeholder
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, className, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  // значение поля формы
  const value = watch(name);

  // ошибки валидации
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  }

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} required={required} {...props} />
        
        {value && <ClearButton onClick={onClickClear}/>}
      </div>

      {errorText &&<ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
