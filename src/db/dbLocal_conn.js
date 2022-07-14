const mongoose = require("mongoose");

const DataBase = process.env.DATABASE_KEY;

const cluSterDb = process.env.CLUSTER_DB;

mongoose
  .connect(cluSterDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Good Job Your Data Base connection is Success. ${cluSterDb}`);
  })
  .catch((err) => {
    console.log("............. No connection ..............." + err);
  });
