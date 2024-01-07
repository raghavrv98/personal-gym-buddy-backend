const express = require('express');
const router = express.Router();

//user model
const chipsData = require('../../models/chips')
const usersData = require('../../models/users')
const commentsData = require('../../models/comments')

// Get userLists for display
router.get('/users', async (req, res) => {
	try {
		let users = await usersData.find();
		if (!users) throw Error('No users');
		res.status(200).json({ data: users, msg: "Users Fetch Successfully" });
	}
	catch (err) {
		res.status(400).json({ msg: err })
	}
})

router.get('/chips', async (req, res) => {
	try {
		let chips = await chipsData.find();
		if (!chips) throw Error('No Chips');
		res.status(200).json({ data: chips[0], msg: "Chips Fetch Successfully" });
	}
	catch (err) {
		res.status(400).json({ msg: err })
	}
})

router.get('/comments/:pk', async (req, res) => {
	try {
		const comments = await commentsData.findOne({ pk: req.params.pk });
		if (!comments) throw Error('No comments');
		res.status(200).json({ data: comments, msg: "Comments Fetch Successfully" });
	}
	catch (err) {
		res.status(400).json({ msg: err })
	}
})

// Update comments for a user
router.patch('/addComment/:pk', async (req, res) => {
	try {
		const user = await commentsData.findOneAndUpdate(
			{ pk: req.params.pk }, // Find by the provided ID
			{ $set: { comments: req.body } }, // Set the fields to update
			{
				returnOriginal: false // Return the updated document (optional) 
			}
		);
		if (!user) throw Error('Something went wrong while adding the comment');
		res.status(200).json({ data: user, msg: "comment added successfully" });
	}
	catch (err) {
		res.status(400).json({ msg: err })
	}
});



module.exports = router;