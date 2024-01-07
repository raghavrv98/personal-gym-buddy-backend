const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	comments: {
		type: Array,
		required: true
	},
	pk: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('comments', postSchema);
