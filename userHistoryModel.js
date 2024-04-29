const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
	{
		id: { type: Number },
		'5mintime': { type: Date },
		username: { type: String },
		hostipv6: { type: String },
		src_zone: { type: String },
		domain: { type: String },
		dst_zone: { type: String },
		content: { type: String },
		category: { type: String },
		url: { type: String },
		hits: { type: Number },
		bytes: { type: Number },
		application: { type: String },
		categorytype: { type: String },
		usergroup: { type: String },
		eduusergroup: { type: String },
		ruleid: { type: Number },
		msgid: { type: Number },
		activityname: { type: String },
		conn_id: { type: String },
		upload_filename: { type: String },
		download_filename: { type: String },
		upload_filetype: { type: String },
		download_filetype: { type: String },
		classification: { type: Number },
		app_id: { type: Number },
		is_cloud_application: { type: Number },
		app_parent: { type: Number }
	},
	{ versionKey: false, timestamps: true, collection: 'userHistory' }
);
dataSchema.index({ '5mintime': 1, hostipv6: 1, domain: 1, username: 1 }, { unique: true, sparse: true });
module.exports = mongoose.model("userHistory", dataSchema);

