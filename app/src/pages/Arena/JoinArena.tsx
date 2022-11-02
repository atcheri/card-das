import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderOne from '../../components/Headers/HeaderOne';
import useArenaContext from '../../hooks/useArenaContext';
import { ROUTES } from '../../router/constants';
import { Arena } from '../../types';

const JoinArena: FC = () => {
  const { getPendingArenas } = useArenaContext();
  const [pendindArenas, setPendingArenas] = useState<Arena[]>([]);
  console.log('pendindArenas:', pendindArenas);

  useEffect(() => {
    const load = async () => {
      const arenas = await getPendingArenas();
      setPendingArenas(arenas);
    };
    load();
  }, []);

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
        <h3 className="text-2xl">Join Arena</h3>
        <div className="flex flex-col gap-3 mt-3 mb-5">
          {pendindArenas.map((a) => (
            <div key={`arena-${a.hash}`}>
              {a.name} <pre>{a.hash}</pre>
            </div>
          ))}
        </div>
        <p className="font-omega text-white text-xl">OR</p>
        <Link to={`/${ROUTES.ARENA}/${ROUTES.CREATE}`} className="text-siteBlue text-xl">
          Create a new <span className="font-omega">Arena</span>
        </Link>
      </div>
    </>
  );
};

export default JoinArena;
