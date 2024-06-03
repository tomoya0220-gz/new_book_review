import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is runnnig on port ${PORT}`);
});
