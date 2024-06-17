import { PrismaClient } from "@prisma/client";
import express from "express";

export const venueRouter = express.Router();
const prisma = new PrismaClient();

// POST
venueRouter.post("/", async (req, res, next) => {
  try {
    // Tangkap request body
    const body = req.body;

    // Cek body, kosong atau tidak
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Body tidak boleh kosong" });
    }

    // Query ke database
    const newVenue = await prisma.venue.create({
      data: body,
    });

    res.status(201).json(newVenue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
// Mengatasi apabila tidak menyertakan venue_id
venueRouter.get("/", (req, res) => {
  return res.status(400).json({ message: "Tidak ada venue_id yang dimasukkan" });
});

// Menyertakan venue_id
venueRouter.get("/:venue_id", async (req, res, next) => {
  try {
    // Menangkap request param
    const venueId = req.params.venue_id;

    // Cek venue Id apakah valid (angka)
    if (!venueId || !/^\d+$/.test(venueId)) {
      return res.status(400).json({ message: "Venue_id tidak valid" });
    }

    // Query ke dalam database
    const venue = await prisma.venue.findUnique({
      where: {
        venue_id: parseInt(venueId),
      },
    });

    // Mengecek apakah venue_id ditemukan ?
    if (!venue) {
      return res.status(404).json({ message: "Venue tidak ditemukan" });
    }

    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
// Menangani apabila tidak menyertakan venue_id
venueRouter.put("/", (req, res) => {
  return res.status(400).json({ message: "Tidak ada venue_id yang dimasukkan" });
});

// Menyertakan venue_id
venueRouter.put("/:venue_id", async (req, res, next) => {
  try {
    // Menangkap request params dan request body
    const venueId = req.params.venue_id;
    const body = req.body;

    // Pengecekan venue_id, valid atau tidak
    if (!venueId || !/^\d+$/.test(venueId)) {
      return res.status(400).json({ message: "venue_id tidak valid" });
    }

    // Pengecekan apakah body kosong atau tidak
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Body tidak boleh kosong" });
    }

    // Query ke dalam database
    const updatedVenue = await prisma.venue.update({
      where: {
        venue_id: parseInt(venueId),
      },
      data: body,
    });

    res.status(200).json(updatedVenue);
  } catch (error) {
    if (error.code === "P2025") {
      // User dengan user_id yang diberikan tidak ditemukan
      res.status(404).json({
        message: "Tidak bisa melakukan update, karena Venue_Id tidak ditemukan",
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete
// Mengatasi apakah venue_id disertakan
venueRouter.delete("/", (req, res) => {
  return res.status(400).json({ message: "Tidak ada venue_id yang dimasukkan" });
});

// Menyertakan venue_id 
venueRouter.delete("/:venue_id", async (req, res, next) => {
  try {
    // Menangkap request params
    const venueId = req.params.venue_id;

    // Validasi venue_id agar benar-benar angka
    if (!venueId || !/^\d+$/.test(venueId)) {
      return res.status(400).json({ message: "Venue_id tidak valid" });
    }

    // Query ke dalam database
    await prisma.venue.delete({
      where: {
        venue_id: parseInt(venueId),
      },
    });

    res.status(200).json({ message: "Venue berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      // Venue dengan venue_id yang diberikan tidak ditemukan
      res.status(404).json({
        message: "Tidak bisa melakukan delete, karena Venue_Id tidak ditemukan",
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});
