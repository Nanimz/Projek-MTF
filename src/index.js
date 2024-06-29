import express from "express"; //Import express dari node_modules di dalam folder
import { userRouter } from "./Routes/user.route.js";
import { venueRouter } from "./Routes/venue.route.js";
import { eventRouter } from "./Routes/event.route.js";
import { ticketRouter } from "./Routes/ticket.route.js";
import { paymentRouter } from "./Routes/payment.route.js";

const server = express(); // Inisialisasi express
const PORT = 3000; // Port yang digunakan untuk menjalankan server

// MiddleWare
server.use(express.json());

// User Router
server.use("/api/users", userRouter);

// Venue Router
server.use("/api/venues", venueRouter);

// Event Router
server.use("/api/events", eventRouter);

// Tiket Router
server.use("/api/tickets", ticketRouter);

// Payment Router
server.use("/api/payments", paymentRouter);

server.listen(PORT, function () {
  console.log("Lets go !");
});
