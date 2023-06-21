const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;

const route = require("./routes");
const db = require("./config/db");
const SortMiddleware = require("./app/middlewares/SortMiddleware");

//connect to Db

db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// custom sort middle
app.use(SortMiddleware);
// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
<span class="${icon}"></span>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
