const { GoogleGenerativeAI } = require("@google/generative-ai");
const { redisClient } = require("../client/redis_client");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enrich(inp, email) {
  // const rateLimitFlag = await redisClient.get(`RATE_LIMIT:ENRICH_TEXT:${email}`);
  console.log("Here is the inp ",inp);
  // if (rateLimitFlag) {
  //   throw new Error("Please wait before enriching more text.");
  // }
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `
  Please generate a very short story on the following text:
  ${inp} 
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  text.replace("*", "");
  // await redisClient.setex(`RATE_LIMIT:ENRICH_TEXT:${email}`, 60, 1); // Set rate limit for 60 seconds
  return text;
}

module.exports = { enrich };
