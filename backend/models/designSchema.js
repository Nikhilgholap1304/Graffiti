const mongoose = require('mongoose');


const FileSchema = new mongoose.Schema({
  filename: String,
  data: String, // Store file content as a base64 encoded string
  filesize: String, // File size in MB
  type: String, // File type (e.g., image, video, audio)
});

const DesignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  UserPic: {
    type: String,
  },
  title: String,
  description: String,
  tags: [String],
  files: [FileSchema], // Array of file details
  no_files: Number,
  uploadDate: { type: Date, default: Date.now }, // File upload date
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reportsCount: String,
  downloadUserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  commentsCount: Number
});

const ReportSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  designId: {
    type: String, // If you want to associate the report with a specific design
  },
  reason: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CommentSchema = new mongoose.Schema({
  userId: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  userName: {
    type: String,
  },
  UserPic: {
    type: String,
  },
  designId: {
    type: String,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Design = mongoose.model('Design', DesignSchema);
const Report = mongoose.model('Report', ReportSchema);
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
  Design,
  Report,
  Comment
};