import { FC, useState } from 'react';

import PrimaryButton from '../buttons/PrimaryButton';
import Drawer from '../Drawer';

const rules = [
  'Card with the same defense and attack point will  cancel each others.',
  'Attack points from the attacking card will deduct the opposing player’s health points.',
  "If the Player does not defend, their health wil be deducted by the Oponent's attack.",
  "If the Player defends, the Oponent's attack is equal to Oponent.attack - Player.defense.",
  'If a Player defends, they refill 3 Health Point',
  'If a player attacks, they spend 3 Health Point',
];

type ArenaRulesProps = {};

const ArenaRules: FC<ArenaRulesProps> = () => {
  const [drawerOpened, setDrawerOpened] = useState(true);
  const toggleOpen = () => {
    setDrawerOpened((p) => !p);
  };
  return (
    <>
      <button
        onClick={toggleOpen}
        type="button"
        className="inline-block rounded-full bg-blue-400 text-white leading-normal uppercase shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
        <svg width="24px" height="24px" viewBox="-11.5 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#EAEFF2">
          <path d="m8.436.006c.051-.004.111-.007.172-.007 1.237 0 2.239 1.003 2.239 2.239 0 .041-.001.081-.003.122v-.006c-.079 1.679-1.46 3.01-3.151 3.01-.022 0-.043 0-.065-.001h.003c-.069.008-.15.012-.231.012-1.188 0-2.151-.963-2.151-2.151 0-.088.005-.174.015-.259l-.001.01c.063-1.655 1.419-2.972 3.084-2.972.031 0 .062 0 .093.001h-.005zm-4.947 23.994c-1.268 0-2.199-.783-1.311-4.226l1.456-6.108c.254-.978.295-1.369 0-1.369-1.141.293-2.142.752-3.035 1.359l.033-.021-.633-1.057c3.086-2.622 6.638-4.159 8.158-4.159 1.268 0 1.48 1.526.845 3.874l-1.666 6.421c-.296 1.135-.168 1.526.126 1.526 1.106-.256 2.069-.761 2.863-1.456l-.008.007.72.979c-3.004 3.052-6.281 4.232-7.549 4.232z" />
        </svg>
      </button>
      <Drawer isOpen={drawerOpened} toggleOpen={toggleOpen}>
        <h3 className="font-omega text-3xl my-6">Arena Rules</h3>
        {rules.map((rule, i) => {
          return (
            <div key={`arena-rule-${i}`} className="font-medium text-white text-xl mb-4">
              <div className="italic">Rule {i + 1}: </div>
              <span className="ml-6">{rule}</span>
            </div>
          );
        })}
        <div className="flex justify-end my-10">
          <PrimaryButton onClick={toggleOpen}>Exit Arena</PrimaryButton>
        </div>
      </Drawer>
    </>
  );
};

export default ArenaRules;
