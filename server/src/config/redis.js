import { createClient } from "redis";

let redisClient;

const connectRedis = async () => {
  redisClient = createClient({
    url: "redis://localhost:6379"
  });

  redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

  await redisClient.connect();
  console.log("✅ Redis Connected");
};

export { connectRedis, redisClient };