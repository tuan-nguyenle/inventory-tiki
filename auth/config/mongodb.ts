import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/Authencation", {});
    console.log(`🟢  Connected to Mongodb with ports 27017`);
  } catch (error) {
    console.error("🔴  " + error);
  }
};

export { ConnectDB };
