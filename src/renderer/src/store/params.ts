import { atom, selectorFamily } from 'recoil';

export const url = atom({ key: 'url', default: '' });
export const options = atom<ArchiveDownloaderConfig>({ key: 'options', default: {} });
export const frontOptions = atom<FrontOptions>({ key: 'frontOptions', default: {} });
export const frontOptionsSelector = selectorFamily({
  key: 'frontOptionsSelector',
  get:
    (key) =>
    ({ get }) => {
      return get(frontOptions)[key as string];
    },
  set:
    (key) =>
    ({ set }, newValue) => {
      set(frontOptions, { ...frontOptions, [key as string]: newValue });
    }
});
