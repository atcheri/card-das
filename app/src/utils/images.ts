import { Avatar } from '../types';

const randomItem = <T>(slice: T[]): T => {
  const i = Math.floor(Math.random() * (slice.length - 1));
  return slice[i];
};

const avatars: Avatar[] = [
  {
    name: 'Nu Gundam',
    path: '/assets/sd-nue-gundam.png',
  },
  {
    name: 'Hi Nu Gundam',
    path: '/assets/sd-hi-nue-gundam.png',
  },
  {
    name: 'Sazabi',
    path: '/assets/sd-sazabi.png',
  },
  {
    name: 'Zaku Kai',
    path: '/assets/sd-zaku-kai.png',
  },
];

const backgrounds: string[] = ['bg-spaceBattleships', 'bg-spaceSatellites'];

export const randomBackground = (): string => randomItem(backgrounds);

export const randomAvatar = (): Avatar => randomItem(avatars);
