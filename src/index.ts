import log from './helper/log';
import connectDB from './config/db';
import { app } from './server';
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  if (process.env.NODE_ENV != 'test') {
    await connectDB(); // Connecting to DB
  }
  log.info(`Salt Auth Server Running @ -  ${process.env.HOST}api/v1`);
});
