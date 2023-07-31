const app = require("./src/app");
const sequelize = require("./src/database/database");
// const { conn } = require("./src/database/database");
PORT = 3000;

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("ya estassssss");
    app.listen(PORT, () => {
      console.log("listening on pozrt", PORT);
    });
  } catch (error) {
    console.error("nooooo la cagaste", error);
  }
}

main();
