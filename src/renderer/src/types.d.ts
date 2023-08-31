interface DownloaderConfig {
  threads?: number;
  output?: string;
  tempDir?: string;
  key?: string;
  verbose?: boolean;
  cookies?: string;
  headers?: string | string[];
  retries?: number;
  proxy?: string;
  format?: string;
  noMerge?: boolean;
  keep?: boolean;
  keepEncryptedChunks?: boolean;
  chunkNamingStrategy?: NamingStrategy;
  cliMode?: boolean;
}

declare interface ArchiveDownloaderConfig extends DownloaderConfig {
  slice?: string;
}

declare interface LiveDownloaderConfig extends DownloaderConfig {}
