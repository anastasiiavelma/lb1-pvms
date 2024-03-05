const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const filePath = __dirname + "/words.json";
    const data = await fs.promises.readFile(filePath);
    const words = JSON.parse(data);
    const filteredWords = words.filter((word) =>
      word.toLowerCase().endsWith("во")
    );
    res.json(filteredWords);
  } catch (err) {
    console.error("Error reading words.json:", err);
    res.status(500).json({ error: "Ошибка при чтении файла" });
  }
});

const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
