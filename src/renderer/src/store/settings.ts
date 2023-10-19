import { atom } from 'recoil';

export const isProxy = atom<boolean>({ key: 'isProxy', default: false });
export const defaultPath = atom<string>({ key: 'defaultPath', default: '' });
