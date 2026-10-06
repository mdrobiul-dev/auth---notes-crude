import connectDb from "./config/database.js";
import app from "./app.js";
import config from "./config/index.js";

const startServer = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port} [${config.env}]`);
    });
  } catch (error) {
    console.error(`there is some problem in starting server ${error}`);
    process.exit(1);
  }
};

startServer();                    
