import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'fs';
import { minify } from 'html-minifier';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
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
    babel({
      presets: ['@babel/preset-flow'],
      plugins: ['@babel/plugin-proposal-nullish-coalescing-operator', 'macros'],
    }),
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: 'src/assets/**', dest: 'dist/assets/' }],
    }),
    css({ output: 'dist/bundle.css' }),
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
    !production &&
      serve({
        contentBase: 'dist',
        open: true,
      }),
    !production &&
      livereload({
        watch: 'dist',
        verbose: true,
      }),
  ],
};
