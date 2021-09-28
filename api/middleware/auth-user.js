"use strict";
// load modules
const auth = require("basic-auth");
const bcrypt = require("bcrypt");
const { User } = require("../models");

/**
 * Middleware to authenticate the request using Basic 
 * Authentication.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response 
 * object.
 * @param {Function} next - The function to call to 
 * pass execution to the next middleware.
 */
exports.authenticateUser = async (req, res, next) => {
  let message; // store the message to display

  // Parse the user's credentials from the Authorization header.
  const credentials = auth(req);
  // If the user's credentials are available...
  if (credentials) {
    // Attempt to retrieve the user from the data 
    // store by their username (i.e. the user's "key"
    // from the Authorization header).
    const user = await User.findOne({
      where: { emailAddress: credentials.name }
    });
    if (user) {
      const authenticated = bcrypt
        .compareSync(credentials.pass, user.password);
      if (authenticated) { // If the passwords match
        console.log(
          `Authentication successful for username: ${user.emailAddress}`
        );

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = "Auth header not found";
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};