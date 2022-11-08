export type Player = {
  address: string;
  name: string;
  mana: number;
  health: number;
  inBattle: boolean;
};

export type PlayerGameToken = {
  id: number;
  name: string;
  attack: number;
  defense: number;
};

export enum ArenaStatus {
  NULL = -1,
  PENDING,
  STARTED,
  ENDED,
}

export type Arena = {
  status: ArenaStatus;
  hash: string;
  name: string;
  players: string[];
  moves: number[];
  winner: string;
};

export type AlertType = {
  status: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
};

export type Avatar = {
  name: string;
  path: string;
};

const sizeUnit = 4;

export const sizes = {
  xs: 2 * sizeUnit,
  sm: 3 * sizeUnit,
  md: 6 * sizeUnit,
  lg: 8 * sizeUnit,
  xl: 9 * sizeUnit,
  '2xl': 10 * sizeUnit,
  '3xl': 11 * sizeUnit,
  '4xl': 12 * sizeUnit,
  '5xl': 13 * sizeUnit,
  '6xl': 15 * sizeUnit,
};

export type ImageSizes = keyof typeof sizes;

export enum MoveType {
  Attack = 1,
  Defense,
}
