const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
