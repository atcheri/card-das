import { FC } from 'react';
import { Link } from 'react-router-dom';
import HeaderOne from '../../components/Headers/HeaderOne';
import { ROUTES } from '../../router/constants';

const JoinArena: FC = () => {
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
      <div className="text-white">Join Arena</div>
      <p className="font-omega text-white text-xl">OR</p>
      <Link to={`/${ROUTES.ARENA}/${ROUTES.CREATE}`} className="text-siteBlue text-xl">
        Create a new <span className="font-omega">Arena</span>
      </Link>
    </>
  );
};

export default JoinArena;
