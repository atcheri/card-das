import { ethers } from 'ethers';
import { LogDescription, Result } from 'ethers/lib/utils';

import { ABI } from '../contract';

const AddNewEvent = (
  event: ethers.EventFilter,
  provider: ethers.providers.Web3Provider,
  cb: (logs: LogDescription) => void,
) => {
  const eventListener = (logs: { topics: string[]; data: string }) => {
    const contractInterface = new ethers.utils.Interface(ABI);
    const parsedLogs = contractInterface.parseLog(logs);
    cb(parsedLogs);
  };
  provider.removeListener(event, eventListener);

  provider.on(event, eventListener);
};

export type ContractEventHandlerParams = {
  contract: ethers.Contract;
  provider: ethers.providers.Web3Provider;
  address?: string;
  callbackWithResult: (result: Result) => void;
};

export const createNewPlayerEventHandler = ({
  contract,
  provider,
  address,
  callbackWithResult,
}: ContractEventHandlerParams) => {
  const newPlayerEvent = contract.filters.NewPlayer();
  AddNewEvent(newPlayerEvent, provider, ({ args }: LogDescription) => {
    console.log('new player created', args);

    if (address === args.owner) {
      callbackWithResult(args);
    }
  });
};

export const createJoinedArenaEventHandler = ({
  contract,
  provider,
  address,
  callbackWithResult,
}: ContractEventHandlerParams) => {
  const newBattleEvent = contract.filters.NewBattle();
  AddNewEvent(newBattleEvent, provider, ({ args }: LogDescription) => {
    console.log('a player joined an arena', args, address);

    if ([args.player1, args.player2].includes(address)) {
      callbackWithResult(args);
    }
  });
};

export const arenaMoveMadeEventHandler = ({ contract, provider, callbackWithResult }: ContractEventHandlerParams) => {
  const newMoveEvent = contract.filters.BattleMove();
  AddNewEvent(newMoveEvent, provider, ({ args }: LogDescription) => {
    console.log('newMoveEvent callback args:', args);
    console.log(`Arena: ${args._battleName}. A player made ${args._movesLeft === 1 ? 'an attack' : 'a defense'} move`);
    callbackWithResult([args._movesLeft === 1 ? 'attack' : 'defense']);
  });
};

export const roundEndedEventHandler = ({ contract, provider, callbackWithResult }: ContractEventHandlerParams) => {
  const roundEndedEvent = contract.filters.RoundEnded();
  AddNewEvent(roundEndedEvent, provider, (desc: LogDescription) => {
    console.log('roundEndedEvent desc:', desc);
    const { args } = desc;
    console.log('roundEndedEvent args:', args);

    callbackWithResult(desc.args);
  });
};
