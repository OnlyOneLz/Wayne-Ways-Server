const User = require("../schemas/userSchema");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/user/get", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(401)
        .json({ cause: "email", message: "No user with this email." });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({ user, token });
      } else {
        res
          .status(401)
          .json({ cause: "password", message: "Incorrect password" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token: token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
