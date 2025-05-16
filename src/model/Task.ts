import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
});
export default mongoose.model("Task", taskSchema);
