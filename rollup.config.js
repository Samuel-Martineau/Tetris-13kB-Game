import commonjs from '@rollup/plugin-commonjs';
import flow from 'rollup-plugin-flow';
import fs from 'fs';
import { minify } from 'html-minifier';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

const minifyHtml = (input, output, options) => ({
  generateBundle() {
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');
    fs.writeFileSync(
      output,
      minify(fs.readFileSync(input).toString(), options),
    );
  },
});

export default {
  input: 'src/script.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    flow(),
    resolve(),
    commonjs(),
    minifyHtml('src/index.html', 'dist/index.html', {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    }),
    production && terser(),
  ],
};
