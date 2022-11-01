import { ethers } from 'ethers';
import { LogDescription, Result } from 'ethers/lib/utils';

import { ABI } from '../contract';

const AddNewPlayerEvent = (
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

export type createNewPlayerEventHandlerParams = {
  contract: ethers.Contract;
  provider: ethers.providers.Web3Provider;
  address: string;
  callbackWithResult: (result: Result) => void;
};

export const createNewPlayerEventHandler = ({
  contract,
  provider,
  address,
  callbackWithResult,
}: createNewPlayerEventHandlerParams) => {
  const newPlayerEvent = contract.filters.NewPlayer();
  AddNewPlayerEvent(newPlayerEvent, provider, ({ args }: LogDescription) => {
    console.log('new player created', args);

    if (address === args.owner) {
      callbackWithResult(args);
    }
  });
};
