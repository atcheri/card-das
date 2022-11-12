import { atom } from 'jotai';

export const eventsCount = atom<number>(0);
export const registering = atom<boolean>(false);
