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
