import { Avatar } from '../types';

const randomItem = <T>(slice: T[]): T => {
  const i = Math.floor(Math.random() * slice.length);
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
  {
    name: 'Musha Sazabi',
    path: '/assets/sd-musha-sazabi.png',
  },
  {
    name: 'Gundam F91',
    path: '/assets/sd-f91-gundam',
  },
  {
    name: 'Jio',
    path: '/assets/sd-jio.png',
  },
  {
    name: 'Night Gundam',
    path: '/assets/sd-night-gundam.png',
  },
  {
    name: 'Providence Gundam',
    path: '/assets/sd-providence-gundam.png',
  },
  {
    name: 'Sword Gundam',
    path: '/assets/sd-sword-gundam.png',
  },
  {
    name: 'Z-Gundam',
    path: '/assets/sd-z-gundam.png',
  },
];

const backgrounds: string[] = ['bg-spaceBattleships', 'bg-spaceSatellites'];

export const randomBackground = (): string => randomItem(backgrounds);

export const randomAvatar = (): Avatar => randomItem(avatars);
