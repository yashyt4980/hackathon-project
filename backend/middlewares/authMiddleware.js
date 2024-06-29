const jwt = require("jsonwebtoken");
const USER = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const { redisClient } = require("../client/redis_client");

require("dotenv").config();
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      // console.log(decoded);
      const _id = decoded.id;
      const cache_data = await redis.get(_id);
      if (cache_data) {
        req.user = cache_data;
      } else {
        const user = await USER.findOne({ _id }).select();
        req.user = user;
        await redis.set("user", JSON.stringify(user));
      }
      // console.log(req.user);
      next();
    } catch {
      res.status(500);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    console.log(req.body, req.headers);
    res.status(500);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
