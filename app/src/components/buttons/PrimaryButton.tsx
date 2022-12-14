import { FC, PropsWithChildren } from 'react';

import DefaultButton, { DefaultButtonProps } from './DefaultButton';

const PrimaryButton: FC<PropsWithChildren<DefaultButtonProps>> = (props) => {
  return <DefaultButton fontColor="text-white" color="bg-siteBlue" hoverColor="bg-siteDimBlue" {...props} />;
};

export default PrimaryButton;
