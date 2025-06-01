const { Server } = require('socket.io');
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const errorHandler = require("./src/middlewares/errorHandler");
const connectToDB = require("./src/config/dbConnection");
const authRoute = require("./src/route_controller/Auth/AuthRoute");


const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);


app.use(cors({
  // origin: [process.env.FRONTEND_CUSTOMER_URL_PRODUCT, process.env.FRONTEND_CUSTOMER_URL_DEVELOPMENT],
  origin: true,
  credentials: true
}));

//Socket
const io = new Server(server, {
  cors: {
    // origin: [process.env.FRONTEND_CUSTOMER_URL_PRODUCT, process.env.FRONTEND_CUSTOMER_URL_DEVELOPMENT],
    origin: true,
    credentials: true
  }
});

// Kết nối DB
connectToDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/api/auth", authRoute);

const users = new Map();  // lưu trữ userId -> socketId

//socket.io
io.on('connection', (socket) => {
  socketHandler(io, socket, users);
});



//from errorHandle
app.use(errorHandler);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
