const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { Server: SocketServer } = require("socket.io");

const topicRoutes = require("./routes/topicRoutes.js");
const certificateRoutes = require("./routes/certificateRoutes");
const groupRoutes = require("./routes/groupRoutes.js");
const submissionRoutes = require("./routes/submissionRoutes");
const questionRoutes = require("./routes/questionRoutes.js");
const answerRoutes = require("./routes/answerRoutes.js");
const moduleRoutes = require("./routes/modulRoutes.js");
const userAuthRoutes = require("./routes/userAuthRoutes.js");
const adminCmsRoutes = require("./routes/adminCmsRoutes");
const adminRoutes = require("./routes/adminroutes.js");
const userRoutes = require("./routes/userRoutes.js");
require("dotenv").config();

const app = express();

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.cpslaboratory.com",
    "https://be-cyber-academy.vercel.app",
    "https://be-cyber-academy-git-main-adamwisnups-projects.vercel.app",
    "https://be-cyber-academy-7wkpnj4ck-adamwisnups-projects.vercel.app",
    "https://fe-cyberacademy2024.vercel.app",
    "https://cyberacademy2024.vercel.app",
    "https://ca.cpslaboratory.com",
    "https://cyberacademy.cpslaboratory.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "layout");

app.use((req, res, next) => {
  req.io = io; // Attach io to the request object
  next();
});

app.get("/", (req, res) => {
  res.send("CPS API!");
});

app.use("/api/auth", userAuthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/cms", adminCmsRoutes);
app.use("/api/user", userRoutes);
app.use("/api", moduleRoutes);

// by Mitchel
app.use("/api/moduls", moduleRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/submissions", submissionRoutes);

// Routes
app.use("/discussion", topicRoutes);
app.use("/discussion", questionRoutes);
app.use("/discussion", answerRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Server and Socket.io setup
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: corsOptions,
});

// Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("newQuestion", (questionData) => {
    io.emit("questionBroadcast", questionData);
  });

  socket.on("newAnswer", (answerData) => {
    io.emit("answerBroadcast", answerData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Export app and server correctly
(module.exports = app), server;
