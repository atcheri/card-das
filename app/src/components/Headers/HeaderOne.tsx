import { FC } from 'react';

import './styles.css';

type HeaderOneProps = {
  Title: JSX.Element;
  SubTitle: JSX.Element;
};

const HeaderOne: FC<HeaderOneProps> = ({ SubTitle, Title }) => {
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="font-omega flex headers-main font-bold text-white sm:text-6xl text-4xl mb-10">{Title}</div>
      </div>
      <div className="headers-sub text-gray-300 sm:text-3xl text-2xl ">{SubTitle}</div>
    </>
  );
};

export default HeaderOne;
