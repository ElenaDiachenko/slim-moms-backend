const { Schema, model } = require('mongoose');

const sessionSchema = Schema(
  {
    uid: Schema.Types.ObjectId,
  },
  { versionKey: false, timestamps: true }
);

const Session = model('session', sessionSchema);

module.exports = { Session };
