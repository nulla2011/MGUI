import { ArchiveDownloader, LiveDownloader } from 'minyami';

declare global {
  // eslint-disable-next-line no-var
  var downloader: ArchiveDownloader | LiveDownloader;
}
