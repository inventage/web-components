import { fromRollup } from '@web/dev-server-rollup';
import { chromeLauncher } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import rollupJson from '@rollup/plugin-json';
import globby from 'globby';

const json = fromRollup(rollupJson);

/**
 * Single browser default.
 *
 * @type {ChromeLauncher[]}
 */
const SINGLE_BROWSER = [chromeLauncher({ launchOptions: { args: ['--no-sandbox'] } })];

/**
 * Define playwright browsers to launch.
 *
 * @type {PlaywrightLauncher[]}
 */
const ALL_BROWSERS = [
  playwrightLauncher({ product: 'chromium' }),
  playwrightLauncher({ product: 'webkit' }),
  playwrightLauncher({
    product: 'firefox',
    launchOptions: {
      firefoxUserPrefs: {
        'toolkit.telemetry.reportingpolicy.firstRun': false,
        'browser.shell.checkDefaultBrowser': false,
        'browser.bookmarks.restore_default_bookmarks': false,
        'dom.disable_open_during_load': false,
        'dom.max_script_run_time': 0,
        'dom.min_background_timeout_value': 10,
        'extensions.autoDisableScopes': 0,
        'extensions.enabledScopes': 15,
      },
    },
  }),
];

/**
 * Analyses all requests to paths that contain 'data/' and rewrites them to files found in 'packages/…/data' directories.
 *
 * This allows us to keep package-relevant data files in each package while using the same paths as when serving the built
 * storybook package (for storybook, these data directories from all packages are copied and merged (!) into the storybook
 * dist dir and a single 'data' directory.

 * @param context
 * @param next
 * @returns {Promise<*>}
 */
export async function rewriteDataJsonPaths(context, next) {
  if (context.url.match(/data\//)) {
    const { url } = context.request;

    // Create glob to search for data file inside packages
    const trimmed = url.replace(/^\//, 'packages/**/');

    const paths = await globby([trimmed], {
      gitignore: true,
    });

    // Bail if we did not find anything
    if (paths.length < 1) {
      return next();
    }

    if (paths.length > 1) {
      console.warn(`Multiple paths found for ${url}`, paths);
    }

    // Change url to the first file we found
    context.url = `/${paths[0]}`;
  }

  return next();
}

export default {
  nodeResolve: true,
  plugins: [
    json(),
    {
      name: 'serve-json-files-as-json',
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
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline'),
      // @see https://github.com/mapbox/pixelmatch#api
      diffOptions: {
        threshold: 0.1,
        includeAA: false,
      },
    }),
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
    rewriteDataJsonPaths,
  ],
  groups: [
    {
      name: 'single',
      files: 'packages/**/*.test.js',
      browsers: SINGLE_BROWSER,
    },
    {
      name: 'all',
      files: 'packages/**/*.test.js',
      browsers: ALL_BROWSERS,
    },
    {
      name: 'vrt',
      files: 'packages/**/*.test-vrt.js',
      browsers: SINGLE_BROWSER,
    },
  ],
  coverageConfig: {
    exclude: ['coverage/**/*', 'packages/**/*.test.{ts,js}', '**/node_modules/**/*'],
  },
  testFramework: {
    config: {
      timeout: 2000,
    },
  },
};
