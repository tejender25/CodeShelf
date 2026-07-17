import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      default: "",
      maxlength: 1000,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      enum: [
        "cpp",
        "java",
        "python",
        "javascript",
        "typescript",
        "go",
        "rust",
        "php",
        "sql",
      ],
    },

    code: {
      type: String,
      required: [true, "Code cannot be empty"],
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

snippetSchema.index({
  title: "text",
  description: "text",
  tags: "text",
},
  {
    language_override: "mongoLanguage",
  });

snippetSchema.index({
  language: 1,
});

snippetSchema.index({
  user: 1,
});

const Snippet = mongoose.model("Snippet", snippetSchema);

export default Snippet;