import express from 'express';
import controllerRouting from './routes/index';

const PORT = process.env.PORT || 5000;
const app = express();

controllerRouting(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
