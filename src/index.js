import express from "express";
import { engine } from "express-handlebars";
// import path
import * as path from "path";
// import url
import { fileURLToPath } from "url";

const app = express();
// set const __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Template engine
app.engine("hbs", engine({
  // change tall file name from handlebar to hbs
  extname: ".hbs",
}));

// set location in views layouts
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.listen("3000");
