import { PrismaClient } from "@prisma/client";
import express from "express";

export const ticketRouter = express.Router();
const prisma = new PrismaClient();

// POST
ticketRouter.post("/", async (req, res) => {
  try {
    // Menangkap request body
    const { event_id, user_id, seat_number, price } = req.body;

    // Validasi request body
    if (!event_id || !user_id || !price) {
      return res
        .status(400)
        .json({ message: "Event_id, user_id, dan price harus diisi" });
    }

    // Validasi event_id bernilai valid
    if (!/^\d+$/.test(event_id) || !/^\d+$/.test(user_id)) {
      return res
        .status(400)
        .json({ message: "Event_id dan user_id harus angka" });
    }

    // Query ke dalam database
    const event = await prisma.event.findUnique({
      where: { event_id: parseInt(event_id) },
    });

    // Pengecekan apakah event ada atau tidak
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    // Cek apakah user_id ada di database
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Buat tiket baru
    const newTicket = await prisma.ticket.create({
      data: {
        event_id: parseInt(event_id),
        user_id: parseInt(user_id),
        seat_number,
        price: parseFloat(price),
      },
    });

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET 
// Menangani ketika ticket_id tidak disertakan
ticketRouter.get("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan ticket_id" });
});

// Dengan menyertakan ticket_id
ticketRouter.get("/:ticket_id", async (req, res) => {
  try {
    // Menangkap request param
    const ticketId = req.params.ticket_id;

    // Validasi ticket_id harus berupa angka
    if (!/^\d+$/.test(ticketId)) {
      return res.status(400).json({ message: "Ticket ID tidak valid" });
    }

    // Query ke dalam database
    const ticket = await prisma.ticket.findUnique({
      where: { ticket_id: parseInt(ticketId) },
    });

    // Pengecekan ticket_id ada atau tidak
    if (!ticket) {
      return res.status(404).json({ message: "Ticket tidak ditemukan" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
// Menangani ketika ticket_id tidak disertakan
ticketRouter.put("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan ticket_id" });
});

// Meyertakan ticket_id
ticketRouter.put("/:ticket_id", async (req, res, next) => {
  try {
    // Menangkap request params dan request body
    const ticketId = req.params.ticket_id;
    const { event_id, user_id, seat_number, price } = req.body;

    // Validasi ticket_id harus berupa angka
    if (!/^\d+$/.test(ticketId)) {
      return res.status(400).json({ message: "Ticket ID tidak valid" });
    }

    // Validasi request body
    if (!event_id || !user_id || !price) {
      return res
        .status(400)
        .json({ message: "Event_id, user_id, dan price harus diisi" });
    }

    // Validasi event_id dan user_id harus berupa angka
    if (!/^\d+$/.test(event_id) || !/^\d+$/.test(user_id)) {
      return res
        .status(400)
        .json({ message: "Event_id dan user_id harus angka" });
    }

    // Query ke dalam database
    const event = await prisma.event.findUnique({
      where: { event_id: parseInt(event_id) },
    });

    // Mengecek apakah event ada atau tidak
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    // Query ke dalam database
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    // Mengecek apakah user ada atau tidak
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Query ke dalam database
    const updatedTicket = await prisma.ticket.update({
      where: { ticket_id: parseInt(ticketId) },
      data: {
        event_id: parseInt(event_id),
        user_id: parseInt(user_id),
        seat_number,
        price: parseFloat(price),
      },
    });

    res.status(200).json(updatedTicket);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Ticket tidak ditemukan" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// DELETE
// Menangani ketika ticket_id tidak disertakan
ticketRouter.delete("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan ticket_id" });
});

ticketRouter.delete("/:ticket_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const ticketId = req.params.ticket_id;

    // Validasi ticket_id harus berupa angka
    if (!/^\d+$/.test(ticketId)) {
      return res.status(400).json({ message: "Ticket_id tidak valid" });
    }

    // Query ke dalam database
    await prisma.ticket.delete({
      where: { ticket_id: parseInt(ticketId) },
    });

    res.status(200).json({ message: "Tiket berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Tiket tidak ditemukan" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

