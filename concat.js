const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const Concat = require('concat-with-sourcemaps');

const lunaticCore = new Concat(true, "LunaticCore.js", "\n");

function concatSource(name, sourceMap) {
  const order = JSON.parse(readFileSync(`./${name}.json`, "utf8"));
  
  order.forEach(fileName => {
    lunaticCore.add(fileName, readFileSync(`./${fileName}`, "utf8"));
  });


  const outFolder = "js/plugins/";
  writeFileSync(`./${outFolder}/${name}.js`, lunaticCore.content);
  if(sourceMap) {
    writeFileSync(`./${outFolder}/${name}.js.map`, lunaticCore.sourceMap);
  }
}

if(require.main === module) {
  concatSource(process.argv[2], process.argv[3]);
}

module.exports = concatSource;