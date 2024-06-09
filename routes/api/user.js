const express = require("express");
const router = express.Router();

//user model
const usersData = require("../../models/clients");
const moment = require("moment");

// create client API
router.post("/createClient", async (req, res) => {
  const payload = new usersData(req.body);
  try {
    let user = await usersData.find({
      mobileNumber: payload?.mobileNumber,
    });
    if (user.length === 1) {
      let userDetails = {
        msg: "client already exist",
        data: { isClientExist: true },
      };
      res.status(200).json(userDetails);
    } else {
      let user = await payload.save();

      user = {
        _id: user._id,
        date: user.date || moment().valueOf(),
        userData: user?.userData || {},
        mobileNumber: user?.mobileNumber,
        name: user?.name,
      };

      let userDetails = {
        msg: "client created successfully",
        data: user,
      };

      if (!userDetails)
        throw Error("Something went wrong while saving the client data");
      res.status(200).json(userDetails);
    }
  } catch (err) {
    // Send a response with the error message
    res.status(400).json({
      msg: err.message,
    });
  }
});

// client Login
router.post("/loginClient", async (req, res) => {
  const payload = new usersData(req.body);
  try {
    let user = await usersData.findOne({
      mobileNumber: payload?.mobileNumber,
      password: payload?.password,
    });

    if (user) {
      user = {
        _id: user._id,
        userData: user?.userData || {},
        mobileNumber: user?.mobileNumber,
        name: user?.name,
      };

      let userDetails = {
        msg: "client Login successfully",
        data: user,
      };

      res.status(200).json(userDetails);
    } else {
      let userDetails = {
        msg: "Incorrect mobile number or password",
        data: { isClientDataIncorrect: true },
      };
      res.status(200).json(userDetails);
    }
  } catch (err) {
    // Send a response with the error message
    res.status(400).json({
      msg: err.message,
    });
  }
});

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
router.patch("/updateClientDetails", async (req, res) => {
  try {
    const userDetails = await usersData.findOneAndUpdate(
      { pk: req.body.pk }, // Find by the provided ID
      { $set: { userData: req.body?.userData } }, // Set the fields to update
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
