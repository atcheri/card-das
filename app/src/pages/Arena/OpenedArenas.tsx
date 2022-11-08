import { FC, useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { Arena } from '../../types';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import useContractContext from '../../hooks/useContractContext';

import * as styles from '../../styles';

type OpenedArenasProps = { arenasLoader: () => Promise<Arena[]>; buttonText?: string; path: string };

const OpenedArenas: FC<OpenedArenasProps> = ({ arenasLoader, buttonText = 'Join', path }) => {
  const { contract } = useContractContext();
  const [loading, setLoading] = useState(false);
  const [arenas, setArenas] = useState<Arena[]>([]);

  useEffect(() => {
    if (!contract) {
      return;
    }
    setLoading(true);
    (async () => {
      try {
        const arenas = await arenasLoader();
        setArenas(arenas);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [contract]);

  return (
    <>
      {loading ? (
        <InfinitySpin width="100" color="#0E79B2" />
      ) : (
        <div className="flex flex-col gap-3 mt-3 mb-5">
          {arenas.map((a) => (
            <div key={`arena-${a.hash}`} className={`${styles.flexCenteredBetween} max-sm:flex-col gap-10`}>
              <span className="flex-1 text-lg text-bold">{a.name}</span>
              <pre>{a.hash.slice(0, 20)}...</pre>
              <Link to={`${path}/${a.name}`}>
                <PrimaryButton>{buttonText}</PrimaryButton>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OpenedArenas;
