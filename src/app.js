const express = require('express');
const uploadRoute = require('./fileManager/service');

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(uploadRoute);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
