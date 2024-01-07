const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true,
	},
	pk: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('users', postSchema);
