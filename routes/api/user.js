const express = require("express");
const router = express.Router();

//user model
// const chipsData = require('../../models/chips')
const usersData = require("../../models/users");

// // Get userLists for display
// router.get('/users', async (req, res) => {
// 	try {
// 		let users = await usersData.find();
// 		if (!users) throw Error('No users');
// 		res.status(200).json({ data: users, msg: "Users Fetch Successfully" });
// 	}
// 	catch (err) {
// 		res.status(400).json({ msg: err })
// 	}
// })

// router.get('/users/:name', async (req, res) => {
// 	try {
// 		let users = await usersData.find({ name: { $regex: req.params.name, $options: 'i' } });
// 		if (!users) throw Error('No users');
// 		res.status(200).json({ data: users, msg: "Users Fetch Successfully" });
// 	}
// 	catch (err) {
// 		res.status(400).json({ msg: err })
// 	}
// })

// router.get('/chips', async (req, res) => {
// 	try {
// 		let chips = await chipsData.find();
// 		if (!chips) throw Error('No Chips');
// 		res.status(200).json({ data: chips[0], msg: "Chips Fetch Successfully" });
// 	}
// 	catch (err) {
// 		res.status(400).json({ msg: err })
// 	}
// })

// // Update excercise Details for a user
// router.patch('/addComment/:pk', async (req, res) => {
// 	try {
// 		const comments = await commentsData.findOneAndUpdate(
// 			{ pk: req.params.pk }, // Find by the provided ID
// 			{ $set: { comments: req.body } }, // Set the fields to update
// 			{
// 				returnOriginal: false // Return the updated document (optional)
// 			}
// 		);
// 		if (!comments) throw Error('Something went wrong while adding the comment');
// 		res.status(200).json({ data: comments, msg: "comment added successfully" });
// 	}
// 	catch (err) {
// 		res.status(400).json({ msg: err })
// 	}
// });

// // add user details for a client
// router.post("/addExcercise", async (req, res) => {
//   try {
//     const data = new usersData(req.body);
//     const userDetails = await data.save();
//     console.log("userDetails: ", userDetails);
//     if (!userDetails)
//       throw Error("Something went wrong while adding the excercise Data");
//     res
//       .status(200)
//       .json({ data: userDetails, msg: "excercise added successfully" });
//   } catch (err) {
//     res.status(400).json({ msg: err });
//   }
// });

// get user data
router.get("/user/:pk", async (req, res) => {
  try {
    const userDetails = await usersData.findOne({ pk: req.params.pk });
    if (!userDetails) throw Error("No Data");
    res
      .status(200)
      .json({ data: userDetails, msg: "userDetails fetch successfully" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// Update Excersises for a user
router.patch("/addExcercise", async (req, res) => {
  try {
    const userDetails = await usersData.findOneAndUpdate(
      { pk: req.body.pk }, // Find by the provided ID
      { $set: { excercises: req.body.excercises, cardType: "Workout" } }, // Set the fields to update
      {
        returnOriginal: false, // Return the updated document (optional)
      }
    );
    if (!userDetails)
      throw Error("Something went wrong while adding the excercise");
    res
      .status(200)
      .json({ data: userDetails, msg: "excercise added successfully" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
