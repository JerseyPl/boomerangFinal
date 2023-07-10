const { Score } = require("../db/models");
async function saveInDB(name, scores) {
  await Score.create(
    {
      name,
      scores,
    },
    { logging: false }
  );
}
module.exports = saveInDB;
