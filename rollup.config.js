import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import fs from "fs";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import { minify } from "html-minifier";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

const minifyHtml = (input, output, options) => ({
  generateBundle() {
    if (!fs.existsSync("dist")) fs.mkdirSync("dist");
    fs.writeFileSync(
      output,
      minify(fs.readFileSync(input).toString(), options)
    );
  },
});

export default {
  input: "src/script.ts",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: false,
  },
  plugins: [
    babel({
      presets: ["@babel/preset-typescript"],
      plugins: ["@babel/plugin-proposal-nullish-coalescing-operator", "macros"],
      extensions: ["js", "ts"],
    }),
    json(),
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: "src/assets/**", dest: "dist/assets/" }],
    }),
    css({ output: "dist/bundle.css" }),
    minifyHtml("src/index.html", "dist/index.html", {
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
        contentBase: "dist",
        open: true,
      }),
    !production &&
      livereload({
        watch: "dist",
        verbose: true,
      }),
  ],
};
