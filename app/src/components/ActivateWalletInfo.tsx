import { FC } from 'react';

import { CoinbaseIcon, CoreIcon, MetamaskIcon, WalletconnectIcon } from './icons';

const ActivateWalletInfo: FC = () => {
  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <h4 className="text-xl">
          Your browser doesn't have a valid wallet brower extension.
          <br />
          To play the game, and for a better experience, please install one of the wallet below.
        </h4>
      </div>
      <div className="flex gap-4">
        <a href="https://metamask.io/" target="_blank">
          <MetamaskIcon height={48} width={48} />
        </a>
        <a href="https://core.app/" target="_blank">
          <CoreIcon height={48} width={48} />
        </a>
        <a href="https://www.coinbase.com/" target="_blank">
          <CoinbaseIcon height={48} width={48} />
        </a>
        <a href="https://walletconnect.com/" target="_blank">
          <WalletconnectIcon height={48} width={48} />
        </a>
      </div>
    </div>
  );
};

export default ActivateWalletInfo;
