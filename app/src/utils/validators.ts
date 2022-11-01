const nameRegex = /^[A-Z-a-z0-9]+$/;

export const validateName = (name: string): boolean => {
  return !name || nameRegex.test(name);
};
