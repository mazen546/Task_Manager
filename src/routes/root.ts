import express from "express";
import path from "path";
const rootRout = express.Router();
rootRout.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

export { rootRout };
