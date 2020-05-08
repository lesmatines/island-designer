const { task, src, dest, watch, registry } = require('gulp');
const fs = require('fs');
const path = require('path');

const outDir = require('minimist')(process.argv.slice(2), {string: 'o'}).o || './build';
const sourceDir = path.join(outDir, 'dist');

const sourceFile = ['src/**/*.js', 'src/**/*.ts'];
const extraFile = ['./package.json', './README.md', './CHANGELOG.md'];
const project = require('gulp-typescript').createProject('./tsconfig.json');

const configSource = () => {
  const package = require('./package.json');
  return `{"version":"${package.version}","projectName":"${package.name}"}`;
}

function recursiveMakeDirectories(filedir) {
  if (fs.existsSync(filedir)) {
    return true;
  }

  var parent = path.dirname(filedir);
  if (fs.existsSync(parent)) {
    fs.mkdirSync(filedir);
    return true;
  }

  recursiveMakeDirectories(parent);
  fs.mkdirSync(filedir);
  return true;
}

const build = () => {
  recursiveMakeDirectories(sourceDir);
  fs.writeFileSync(path.join(sourceDir, 'config.json'), configSource());
  src(extraFile).pipe(dest(outDir));
  return src(sourceFile).pipe(project()).pipe(dest(sourceDir));
}

task('default', build);

task('build-watch', function() {
  build();
  return watch(sourceFile, {events: 'all'}, registry().get('default'));
});
