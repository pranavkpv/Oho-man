import { Button } from '@/components/ui/button';

interface Props {
   children: React.ReactNode;
   loading?: boolean;
}

export default function AppButton({ children, loading }: Props) {
   return (
      <Button
         className='w-full'
         disabled={loading}
      >
         {loading ? 'Loading...' : children}
      </Button>
   )
}