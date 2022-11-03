import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'bottom-center',
};

export const thereWasAnError = (
  message: string = 'Something went wrong, please try again later or contact the IT team.',
) => toast.error(message, toastConfig);

export const playerCreated = (address: string) => toast.success(`Player successfuly created: ${address}`, toastConfig);

export const arenaCreated = (name: string) =>
  toast.success(`The arena ${name} has succesfully been created.`, toastConfig);
