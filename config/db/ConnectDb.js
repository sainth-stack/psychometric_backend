import mongoose from "mongoose";

const connectDB = async () => {
 const DATABASE_URL = `mongodb+srv://prashanth:BnHRQrqZHdnosfEe@cluster0.cpydc.mongodb.net/CommonDatabase?retryWrites=true&w=majoritys`;

  try {
    const conn = await mongoose.connect(DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
