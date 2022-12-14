import { toast, ToastOptions } from 'react-toastify';

import { MoveType, Player } from '../types';

const toastConfig: ToastOptions = {
  position: 'bottom-center',
};

const getAttackOrDefense = (move: MoveType): string =>
  move === MoveType.Attack ? 'attack' : move === MoveType.Defense ? 'defense' : '- not known -';

export const thereWasAnError = (
  message: string = 'Something went wrong, please try again later or contact the IT team.',
) => toast.error(message, toastConfig);

export const playerCreated = (address: string) => toast.success(`Player successfuly created: ${address}`, toastConfig);

export const arenaCreated = (name: string) =>
  toast.success(`The arena ${name} has succesfully been created.`, toastConfig);

export const playerJoinedArena = (name: string) => toast.success(`A new challenger joined arena ${name}.`, toastConfig);

export const playerMadeAMove = ({ name }: Player, move: MoveType) =>
  toast.info(`Player ${name} made a ${move} move.`, toastConfig);

export const playerAlreadyMadeAMove = ({ name }: Player) =>
  toast.warn(`Player ${name} already made move. Waiting for the oponent to make a move`, toastConfig);

export const roundEnded = () =>
  toast.info('The round ended. Each player can execute an attack of a defense move again.');

export const mustBeRegistered = () => toast.warn('You must become a player to access the arena.', toastConfig);

export const alreadyRegistered = (name: string) =>
  toast.warn(`You are already registered as a player as ${name}.`, toastConfig);

export const moveCancelled = (move: MoveType, reason: string = '') =>
  toast.warn(`Your ${getAttackOrDefense(move)} move was cancelled. ${reason && `Reasons: ${reason}`}`, toastConfig);
