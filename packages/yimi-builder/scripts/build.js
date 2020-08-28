// 设置 ENV
process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

// 保证 unhandle process 能抛出异常
process.on("unhandledRejection", err => {
  throw err;
});

const less = require("less");
const webpack = require("webpack");
const path = require("path");
const babel = require("babel-core");
const assert = require("assert");
const chalk = require("chalk");
const glob = require("glob");
const fs = require("fs-extra");
const { rmdir, mkdir } = require("./utils");
const babelConfig = require("./lib/babelConfig");
const getConfig = require('./lib/webpack.config')

const ES_PATTERN = /\.(js|jsx|mjs|ts|tsx)$/;
const D_PATTERN = /\.(d.ts)$/
const CSS_PATTERN = /\.(less)$/;
const formName = require('../../yimi-form/package.json').name

async function run(basedir) {
  const srcDir = path.join(basedir, "src");
  const destDir = path.join(basedir, "lib");
  const distDir = path.join(basedir, 'dist')
  assert(fs.existsSync(srcDir), `${srcDir} directory should exists`);
  // remove old destDir
  console.log(" - %s %s", chalk.yellow("remove"), destDir);
  await rmdir(destDir);
  console.log(" - %s %s", chalk.yellow("remove"), distDir);
  await rmdir(distDir);
  await mkdir(destDir);
  try {
    const compiler = webpack(getConfig({}))
    compiler.run(async (err) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) console.error(err.details);
        return;
      }
    })
    compiler.hooks.done.tapAsync("CompileDonePlugin", async (stats) => {
      console.log(
        stats.toString({
          chunks: false, // Makes the build much quieter
          chunkModules: false,
          colors: true, // Shows colors in the console
          children: false,
          builtAt: true,
          modules: false
        })
      );
      console.log(chalk.yellowBright("\nCompile Done! Start transform!"));

      const files = glob.sync("**/*.*", {
        cwd: srcDir
      });
      for (const file of files) {
        const srcFile = path.join(srcDir, file);
        let destFile = path.join(destDir, file);
        // 如果是 ES 代码, 就 transform
        if (file.match(ES_PATTERN) && !file.match(D_PATTERN)) {
          console.log(" - %s %s", chalk.green("transform"), file);
          destFile = destFile.replace(ES_PATTERN, ".tsx");
          console.log(destFile);
          let content = fs.readFileSync(srcFile, "utf8");
          // ......yimi-form/src to yimi-form/lib
          content = content.replace(/".+yimi-form\/src/g, `"${formName}/lib`);
          await mkdir(path.dirname(destFile));
          fs.writeFileSync(
            destFile.replace(".tsx", ".js"),
            babel.transform(content, { ...babelConfig, filename: destFile }).code
          );
        } else if (file.match(CSS_PATTERN)) {
          console.log(" - %s %s", chalk.green("less"), file, srcFile);
          destFile = destFile.replace(CSS_PATTERN, ".css");
          let content = fs.readFileSync(srcFile, "utf8");
          content = content.replace(/\.less/g, '.css')
          await mkdir(path.dirname(destFile));
          const { css } = await less.render(content);
          fs.writeFileSync(destFile, css);
        } else {
          console.log(" - %s %s", chalk.green("copy"), file);
          let content = fs.readFileSync(srcFile, "utf8");
          // ......yimi-form/src to yimi-form/lib
          content = content.replace(/".+yimi-form\/src/g, `"${formName}/lib`);
          await mkdir(path.dirname(destFile));
          await fs.writeFileSync(destFile, content);
        }
      }
      console.log(chalk.green("\nTransform successfully!"));
    })

  } catch (e) {
    console.log(e);
  }
}

run(process.cwd()).catch(err => {
  console.error(chalk.red(err.stack || err));
  process.exit(1);
});
