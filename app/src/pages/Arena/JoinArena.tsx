import { FC, useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import HeaderOne from '../../components/Headers/HeaderOne';
import useContractContext from '../../hooks/useContractContext';
import { ROUTES } from '../../router/constants';
import { Arena } from '../../types';
import { loadPendingArenas } from '../../utils/ethereum';

import * as styles from '../../styles';

const JoinArena: FC = () => {
  const { contract } = useContractContext();
  const [pendindArenas, setPendingArenas] = useState<Arena[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!contract) {
      return;
    }
    setLoading(true);
    const load = async () => {
      try {
        const arenas = await loadPendingArenas(contract);
        setPendingArenas(arenas);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contract]);

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
        {loading ? (
          <InfinitySpin width="100" color="#0E79B2" />
        ) : (
          <div className="flex flex-col gap-3 mt-3 mb-5">
            {pendindArenas.map((a) => (
              <div key={`arena-${a.hash}`} className={`${styles.flexCenteredBetween} max-sm:flex-col gap-10`}>
                <span className="flex-1 text-lg text-bold">{a.name}</span>
                <pre>{a.hash.slice(0, 20)}...</pre>
                <Link to={`/${ROUTES.ARENA}/${ROUTES.WAITING_ROOM}/${a.name}`}>
                  <PrimaryButton>Join</PrimaryButton>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="font-omega text-white text-xl">OR</p>
        <Link to={`/${ROUTES.ARENA}/${ROUTES.CREATE}`} className="text-siteBlue text-xl">
          Create a new <span className="font-omega">Arena</span>
        </Link>
      </div>
    </>
  );
};

export default JoinArena;
