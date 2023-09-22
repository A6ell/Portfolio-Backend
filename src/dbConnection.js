import mongoose from "mongoose";

const MONGO_URL ="mongodb+srv://a6el:60isVkAfVDJNhl7B@sage.8jrilu0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

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
