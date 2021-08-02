import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';

const json = fromRollup(rollupJson);

export default {
  files: 'packages/**/*.test.js',
  nodeResolve: true,
  plugins: [
    json(),
    {
      name: 'serve-json!-files-as-json',
      resolveMimeType(context) {
        const { originalUrl, path } = context;
        if (path.endsWith('.json')) {
          // If the original URL requested was a custom json path, we really want this to be served as JSON
          if (originalUrl && originalUrl.endsWith('.json!')) {
            return 'json';
          }

          // Otherwise, JSON files should be serves as JS modules so normal .json file imports work
          return 'js';
        }
      },
    },
  ],
  middleware: [
    /**
     * Removes custom json path suffix so it becomes a valid file to serve: .json! → .json
     */
    function rewriteCustomJsonPath(context, next) {
      if (context.url.endsWith('.json!')) {
        context.url = context.url.replace(/\.json!$/, '.json');
      }

      return next();
    },
  ],
  coverageConfig: {
    exclude: ['coverage/**/*', 'packages/**/*.test.{ts,js}', '**/node_modules/**/*'],
  },
};
