import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongodb:27017/Inventory-tiki", {});
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export { ConnectDB };
