import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  label?: string;
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
  type = 'text',
}: Props) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {label}
        </Label>
      )}

      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`
            w-full h-11 px-4 rounded-xl text-sm text-stone-800 placeholder:text-stone-300
            bg-stone-50 border transition-all duration-200 outline-none
            focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100
            ${error
              ? 'border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-red-100'
              : 'border-stone-200 hover:border-stone-300'
            }
          `}
        />

        {/* Error icon */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
          {error}
        </p>
      )}
    </div>
  );
}