import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship"],
    },
    salary: {
      type: Number,
      required: false,
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
