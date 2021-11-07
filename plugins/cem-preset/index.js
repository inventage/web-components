import { moduleFileExtensionsPlugin } from 'cem-plugin-module-file-extensions';
import { readonlyPlugin } from 'cem-plugin-readonly';

import { excludePrivateProtectedPlugin } from './plugins/excludePrivate.js';

export const plugins = [moduleFileExtensionsPlugin(), readonlyPlugin(), excludePrivateProtectedPlugin()];
