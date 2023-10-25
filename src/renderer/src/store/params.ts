import { atom } from 'recoil';

export const url = atom({ key: 'url', default: '' });
// export const options = atom<ArchiveDownloaderConfig>({ key: 'options', default: {} });
export const frontOptions = atom<IFrontOptions>({
  key: 'frontOptions',
  default: { output: 'output.ts' }
});
export const headers = atom<string[][]>({ key: 'headers', default: [] });
export const settings = atom<Isettings>({ key: 'settings', default: {} });
export const path = atom<string>({ key: 'path', default: '' });
// export const frontOptionsSelector = selectorFamily({
//   key: 'frontOptionsSelector',
//   get:
//     (key) =>
//     ({ get }) => {
//       return get(frontOptions)[key as string];
//     },
//   set:
//     (key) =>
//     ({ set }, newValue) => {
//       set(frontOptions, { ...frontOptions, [key as string]: newValue });
//     }
// });
