import { connectDB } from '#config/neon.js';
import { SERVER_PORT } from '#config/env.js';
import { server } from './app.js';

async function serverStart() {
  try {
    if (!SERVER_PORT) {
      console.log(
        'Error: SERVER_PORT  is not defined in environment variables.'
      );
      return;
    }

    await connectDB();

    server.listen(SERVER_PORT, () => {
      console.log(
        `Success: ⚡ Server is running on http://localhost:${SERVER_PORT}`
      );
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

serverStart();