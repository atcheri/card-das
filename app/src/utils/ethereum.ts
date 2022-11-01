export const isEthereum = (): boolean => {
  return !!window.ethereum;
};

export const isNotEthereum = () => !isEthereum();
