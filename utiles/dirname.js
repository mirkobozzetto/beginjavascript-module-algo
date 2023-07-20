import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
export const currentDirPath = dirname(currentFilePath);
