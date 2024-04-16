import { useToast, ToastPosition } from "@chakra-ui/react";

interface ToastOptions {
  title: string;
  description?: string;
  status: "success" | "error";
  position?: ToastPosition;
}

const useToastNotification = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status,
    position = "top-right",
  }: ToastOptions) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position,
      containerStyle: {
        marginTop: '2rem', 
        marginRight: '2rem',
      },
    });
  };

  return showToast;
};

export default useToastNotification;