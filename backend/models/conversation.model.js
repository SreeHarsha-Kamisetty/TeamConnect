const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true },
  {
    versionKey:false
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);