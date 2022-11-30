import express from "express";
import cors from "cors"
import appData from "./api/app.json" assert { type: "json" };
import categories from "./api/categories.json" assert { type: "json" };
import gameLists from "./api/game-lists.json" assert { type: "json" };
import games from "./api/games.json" assert { type: "json" };

const authorizedUsers = ['user1', 'user2', 'user3', 'user4']
const PORT = 8082;
const app = express();
const corsOptions = {
  methods: "GET, POST",
  "Access-Control-Allow-Methods": "POST, GET",
  "Access-Control-Allow-Origin": "*"
}
app.disable('x-powered-by')
app.use(express.json())
app.use(cors(corsOptions))

// app.post("/api/games");
app.post("/api/protected", function(req, res) {
  const { userId } = req.body
  if (authorizedUsers.indexOf(userId) === -1) {
    res.status(401).send()
  } else {
    res.status(201).send()
  }
});

app.get('/api', function(req, res) {
  res.json(
    { main: appData, categories, 'game-lists': gameLists, games},
  )
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
