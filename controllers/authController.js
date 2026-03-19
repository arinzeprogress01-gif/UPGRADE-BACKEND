import bcrypt from "bcryptjs";
import User from "../models/User.js";
import loggerUtils from "../utils/loggerUtils.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            loggerUtils.warn(`User with email ${email} already exists`);

            return res.status(400).json({
                error: "User already exists"
            });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 4. Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });
        loggerUtils.info(`USER CREATED SUCCESSFULLY ${user.id}-${user.email}`);

    } catch (error) {

        loggerUtils.error(`Error in registerUser: ${error.message}`);

        console.error("Error in registerUser:", error);

        res.status(500).json({
            error: error.message || "Server error"
        });
    }
};



import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid email or password"
      });
    }

    // 3. Generate token
    const token = jwt.sign(
      { id: user._id }, // payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};