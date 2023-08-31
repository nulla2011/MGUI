import { atom } from 'recoil';

export const url = atom({ key: 'url', default: '' });
export const options = atom<ArchiveDownloaderConfig>({ key: 'options', default: {} });
