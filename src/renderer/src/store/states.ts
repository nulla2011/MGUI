import { atom } from 'recoil';

export const isLoadingM3U8 = atom<boolean>({ key: 'isLoadingM3U8', default: true });
export const isEditing = atom<boolean>({ key: 'isEditing', default: false });
