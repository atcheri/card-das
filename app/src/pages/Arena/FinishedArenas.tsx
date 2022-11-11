import { FC, useEffect, useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { InfinitySpin } from 'react-loader-spinner';
import useContractContext from '../../hooks/useContractContext';
import { Arena, Player } from '../../types';

import * as styles from '../../styles';
import { getPlayerInfo, loadFinishedArenas } from '../../utils/ethereum';

type ArenaAndWinner = {
  arena: Arena;
  winner: Player;
};

const FinishedArenas: FC = () => {
  const { contract } = useContractContext();
  const [loading, setLoading] = useState(true);
  const [arenaAndWinners, setArenaAndWinners] = useState<ArenaAndWinner[]>([]);

  useEffect(() => {
    if (!contract) {
      return;
    }
    (async () => {
      try {
        const arenas = await loadFinishedArenas(contract);
        const aws = await Promise.all(
          arenas.map(async (arena) => {
            const winner = await getPlayerInfo(contract, arena.winner);
            return { arena, winner };
          }),
        );
        setArenaAndWinners(aws);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [contract]);

  return (
    <>
      <h3 className="text-2xl">
        Finished <span className="font-omega">Fights</span>
      </h3>
      {loading ? (
        <InfinitySpin width="100" color="#0E79B2" />
      ) : (
        <div className="flex flex-col gap-3 mt-3 mb-5">
          {arenaAndWinners.map(({ arena, winner }) => (
            <div key={`arena-${arena.hash}`} className={`${styles.flexCenteredBetween} max-sm:flex-col gap-10`}>
              <span className="flex-1 text-lg text-bold">{arena.name}</span>
              <div className="flex gap-2 items-center">
                <span className="bold">Winner: </span>
                <span className="font-omega italic">{winner.name}</span>
                <Jazzicon diameter={28} seed={jsNumberForAddress(winner.address)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FinishedArenas;
