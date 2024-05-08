import { useToast, Button } from '@chakra-ui/react';

export default function Toaster({ message }: { message: string }) {
  const toast = useToast();
  const id = 'test-toast';
  return (
    <Button
      onClick={() => {
        if (!toast.isActive(id)) {
          toast({
            id,
            title: 'Hey! You can create a duplicate toast',
          });
        }
      }}
    >
      Click me!
    </Button>
  );
}
