import { FC, PropsWithChildren } from 'react';

import DefaultButton, { DefaultButtonProps } from './DefaultButton';

const PrimaryButton: FC<PropsWithChildren<DefaultButtonProps>> = (props) => {
  return <DefaultButton color="bg-siteBlue" {...props} />;
};

export default PrimaryButton;
