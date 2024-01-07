const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	positive: {
		type: Array,
		required: true
	},
	negative: {
		type: Array,
		required: true
	}
})

module.exports = mongoose.model('chips', postSchema);
