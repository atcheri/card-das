import { FC } from 'react';

import './styles.css';

type HeaderOneProps = {
  title: string;
  subTitle?: string;
};

const HeaderOne: FC<HeaderOneProps> = ({ subTitle, title }) => {
  return (
    <>
      <div className="flex flex-row w-full">
        <h1 className="font-omega flex headers-main font-bold text-white sm:text-6xl text-4xl mb-10">{title}</h1>
      </div>
      <h2 className="headers-sub text-gray-300 sm:text-3xl text-2xl ">{subTitle}</h2>
    </>
  );
};

export default HeaderOne;
