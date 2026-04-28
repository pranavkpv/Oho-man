import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
   label: string;
   placeholder: string;
   register: any;
   name: string;
   error?: string;
   type?: string;
}

export default function AppInput({
   label,
   placeholder,
   register,
   name,
   error,
   type = 'text'
}: Props) {
   return (
      <div className='space-y-2'>
         <Label>{label}</Label>
         <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
         />
         {error && (
            <p className='text-red-500 text-sm'>
               {error}
            </p>
         )}
      </div>
   )
}