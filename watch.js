const fs = require("fs");
const watch = require("node-watch");
const concat = require("./concat");

watch("./js/plugins_dev/", (evt, name) => {
  concat("./lunatic-core");
  console.log(`Lunatic-Core Updated after: ${name} changed.`);
});
