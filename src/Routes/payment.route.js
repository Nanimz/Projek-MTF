import { PrismaClient } from "@prisma/client";
import express from "express";

export const paymentRouter = express.Router();
const prisma = new PrismaClient();

// POST
paymentRouter.post("/", async (req, res) => {
  try {
    // Menangkap request body
    const { user_id, ticket_id, amount } = req.body;

    // Validasi request body
    if (!user_id || !ticket_id || !amount) {
      return res
        .status(400)
        .json({ message: "User_id, ticket_id, dan amount harus diisi" });
    }

    // Pastikan user_id dan ticket_id adalah angka
    if (!/^\d+$/.test(user_id) || !/^\d+$/.test(ticket_id)) {
      return res
        .status(400)
        .json({ message: "User_id dan ticket_id harus angka" });
    }

    // Query ke dalam database
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    // Mengecek apakah user_id ada atau tidak
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Query ke dalam database
    const ticket = await prisma.ticket.findUnique({
      where: { ticket_id: parseInt(ticket_id) },
    });

    // Cek apakah ticket_id ada atau tidak
    if (!ticket) {
      return res.status(404).json({ message: "Ticket tidak ditemukan" });
    }

    // Query ke dalam database
    const newPayment = await prisma.payment.create({
      data: {
        user_id: parseInt(user_id),
        ticket_id: parseInt(ticket_id),
        amount: parseFloat(amount),
        payment_date: new Date(),
      },
    });

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
// Menangani ketika payment_id tidak disertakan
paymentRouter.get("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan payment_id" });
});

// Menyertakan payment_id
paymentRouter.get("/:payment_id", async (req, res, next) => {
  try {
    // Menangkap request params
    const paymentId = req.params.payment_id;

    // Validasi payment_id harus berupa angka
    if (!/^\d+$/.test(paymentId)) {
      return res.status(400).json({ message: "Payment ID tidak valid" });
    }

    // Query ke dalam database
    const payment = await prisma.payment.findUnique({
      where: { payment_id: parseInt(paymentId) },
    });

    // Mengecek payment_id ada atau tidak
    if (!payment) {
      return res.status(404).json({ message: "Payment tidak ditemukan" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
// Menangani ketika tidak menyertakan payment_id
paymentRouter.put("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan payment_id" });
});

paymentRouter.put("/:payment_id", async (req, res, next) => {
  try {
    // Menangkap request params dan request body
    const paymentId = req.params.payment_id;
    const { user_id, ticket_id, amount } = req.body;

    // Validasi payment_id supaya hanya berupa angka
    if (!/^\d+$/.test(paymentId)) {
      return res.status(400).json({ message: "Payment ID tidak valid" });
    }

    // Validasi request body
    if (!user_id || !ticket_id || !amount) {
      return res
        .status(400)
        .json({ message: "User_id, ticket_id, dan amount harus diisi" });
    }

    // Validasi user_id dan ticket_id supaya harus berupa angka
    if (!/^\d+$/.test(user_id) || !/^\d+$/.test(ticket_id)) {
      return res
        .status(400)
        .json({ message: "User_id dan ticket_id harus angka" });
    }

    // Query ke dalam database
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(user_id) },
    });

    // Mengecek user_id ada atau tidak
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Query ke dalam database
    const ticket = await prisma.ticket.findUnique({
      where: { ticket_id: parseInt(ticket_id) },
    });

    // Mengecek ticket_id ada atau tidak
    if (!ticket) {
      return res.status(404).json({ message: "Ticket tidak ditemukan" });
    }

    // Query ke dalam database
    const updatedPayment = await prisma.payment.update({
      where: { payment_id: parseInt(paymentId) },
      data: {
        user_id: parseInt(user_id),
        ticket_id: parseInt(ticket_id),
        amount: parseFloat(amount),
      },
    });

    res.status(200).json(updatedPayment);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Payment tidak ditemukan" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// DELETE
// Menangani ketika tidak menyertakan payment_id
paymentRouter.delete("/", (req, res) => {
  res.status(400).json({ message: "Tidak menyertakan payment_id" });
});

// Menyertakan payment_id
paymentRouter.delete("/:payment_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const paymentId = req.params.payment_id;

    // Validasi payment_id harus berupa angka
    if (!/^\d+$/.test(paymentId)) {
      return res.status(400).json({ message: "Payment ID tidak valid" });
    }

    // Query ke dalam database
    await prisma.payment.delete({
      where: { payment_id: parseInt(paymentId) },
    });

    res.status(200).json({ message: "Payment berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Payment tidak ditemukan" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});
