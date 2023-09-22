import mongoose from "mongoose";

const MONGO_URL ="mongodb://127.0.0.1:27017/sms";

const ConnectDb = async () => {
  /**
   * Options
   */
  mongoose.set("strictQuery", false);

  /**
   * Connect to DB server
   */
  mongoose
    .connect(MONGO_URL, {})
    .then((value) => {
      console.log("Connected to DB server");
    })
    .catch((error) => console.error(error));
};

export default ConnectDb;
