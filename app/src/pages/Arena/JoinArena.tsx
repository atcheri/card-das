import { FC } from 'react';
import { Link } from 'react-router-dom';

import HeaderOne from '../../components/Headers/HeaderOne';
import useEthContext from '../../hooks/useEthContext';
import { ROUTES } from '../../router/constants';
import PendingArenas from './PendingArenas';
import StartedArenas from './StartedArenas';

const JoinArena: FC = () => {
  const { player } = useEthContext();

  if (!player) {
    return null;
  }

  return (
    <>
      <HeaderOne
        Title={<h1>Join an existing Arena</h1>}
        SubTitle={
          <h2>
            And leave your mark to <span className="font-omega">NFT History</span>
          </h2>
        }
      />
      <div className="text-white">
        <h3 className="text-2xl">
          Join an existing <span className="font-omega">Arena</span>
        </h3>
        <PendingArenas />
        <p className="font-omega text-xl my-8">OR</p>
        <h3 className="text-2xl">
          Resume a <span className="font-omega">Fight</span>
        </h3>
        <StartedArenas />
        <div className="flex flex-col gap-4">
          <p className="font-omega text-xl">OR</p>
          <Link to={`/${ROUTES.ARENA}/${ROUTES.CREATE}`} className="text-siteBlue text-xl">
            Create a new <span className="font-omega">Arena</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default JoinArena;
