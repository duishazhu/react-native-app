/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('metro-config');

function generateExtensions() {
  const type = 'native';
  let prefixList = [type];
  const suffixList = ['js', 'jsx', 'json', 'ts', 'tsx'];
  /** file-remove-begin */
  const subProjectName = process.env.PROJECT_SUB_TYPE;
  if (subProjectName) {
    prefixList = [`${subProjectName}.${type}`, type, subProjectName];
  }
  /** file-remove-end */
  const extensions = [];
  /** file-remove-begin */
  const projectName = process.env.PROJECT_TYPE;
  if (projectName) {
    extensions.push(`${projectName}.js`);
  }
  /** file-remove-end */
  prefixList.forEach((prefix) => {
    suffixList.forEach((it) => {
      extensions.push(`${prefix}.${it}`);
    });
  });
  extensions.push(...suffixList);
  extensions.push('cjs');
  return extensions;
}

module.exports = (async () => {
  const {
    resolver: { resolverMainFields },
  } = await getDefaultConfig();
  return {
    transformer: {
      minifierPath: 'metro-minify-terser', // replace metro-minify-uglify to prevent some amazing bugs...
    },

    resolver: {
      resolverMainFields: ['native', ...resolverMainFields],
      sourceExts: generateExtensions(),
    },
  };
})();
