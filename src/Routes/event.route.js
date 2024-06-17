import { PrismaClient } from "@prisma/client";
import express from "express";

export const eventRouter = express.Router();
const prisma = new PrismaClient();

// POST
eventRouter.post("/", async (req, res, next) => {
  try {
    // Tangkap request body
    const { event_name, venue_id, description, date } = req.body;

    // Validasi request body
    if (!event_name || !venue_id || !description || !date) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Validasi venue_id harus berupa angka
    if (!/^\d+$/.test(venue_id)) {
      return res.status(400).json({ message: "event_id tidak valid" });
    }

    // Query ke dalam database
    const venue = await prisma.venue.findUnique({
      where: { venue_id: parseInt(venue_id) },
    });

    // Cek apakah venue_id ditemukan ?
    if (!venue) {
      return res.status(404).json({ message: "Venue tidak ditemukan" });
    }

    // Membuat objek Date baru berdasarkan nilai yang diberikan oleh variabel date
    const eventDate = new Date(date);

    // Memeriksa apakah hasil dari eventDate.getTime() adalah NaN (Not-a-Number)
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    // Buat event baru
    const newEvent = await prisma.event.create({
      data: {
        event_name,
        venue_id: parseInt(venue_id),
        description,
        date: eventDate,
      },
    });

    // Format tanggal untuk respons
    const formattedEvent = {
      ...newEvent, // Menyalin properti di dalam objek newEvent
      date: newEvent.date.toISOString().split("T")[0], // Hanya mengambil bagian tanggal
    };

    res.status(201).json(formattedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get
// Menangani apabila tidak menyertakan event_id
eventRouter.get("/", (req, res) => {
  return res.status(400).json({ message: "Event_id tidak dimasukkan" });
});

// Menyertakan event_id
eventRouter.get("/:event_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const eventId = req.params.event_id;

    // Validasi event_id yang dimasukkan
    if (!/^\d+$/.test(eventId)) {
      return res.status(400).json({ message: "Event_id tidak valid" });
    }

    // Query ke dalam database
    const event = await prisma.event.findUnique({
      where: { event_id: parseInt(eventId) },
    });

    // Mengecek apakah event_id ditemukan
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }

    // Format tanggal untuk respons
    const formattedEvent = {
      ...event, // Menyalin properti di dalam objek event
      date: event.date.toISOString().split("T")[0], // Hanya mengambil bagian tanggal
    };

    res.status(200).json(formattedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT
// Tidak menyertakan event_id
eventRouter.put("/", (req, res) => {
  return res.status(400).json({ message: "Event_id tidak dimasukkan" });
});

// Menyertakan event_id
eventRouter.put("/:event_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const eventId = req.params.event_id;
    const { event_name, venue_id, description, date } = req.body;

    // Validasi event_id (harus berupa angka)
    if (!/^\d+$/.test(eventId)) {
      return res.status(400).json({ message: "Event_id tidak valid" });
    }

    // Validasi body
    if (!event_name || !venue_id || !description || !date) {
      return res
        .status(400)
        .json({ message: "Body tidak boleh kosong, semua field harus diisi" });
    }

    // Validasi venue_id (harus angka)
    if (!/^\d+$/.test(venue_id)) {
      return res.status(400).json({ message: "Venue_id tidak valid" });
    }

    // Query ke dalam database
    const venue = await prisma.venue.findUnique({
      where: { venue_id: parseInt(venue_id) },
    });

    // Pengecekan apakah venue yang dicari ada/ tidak
    if (!venue) {
      return res.status(404).json({ message: "Venue tidak ditemukan" });
    }

    // Membuat objek Date dengan isi req.body. date
    const eventDate = new Date(date);

    // Memeriksa format tanggal
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    // Query ke dalam database
    const updatedEvent = await prisma.event.update({
      where: { event_id: parseInt(eventId) },
      data: {
        event_name,
        venue_id: parseInt(venue_id),
        description,
        date: eventDate,
      },
    });

    // Format tanggal untuk respons
    const formattedEvent = {
      ...updatedEvent, // Membuat objek baru, dengan menyalin properti dari objek updatedEvent
      date: updatedEvent.date.toISOString().split("T")[0], // Hanya mengambil bagian tanggal
    };

    res.status(200).json(formattedEvent);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({
        message: "Gagal update event karena event_id tidak ditemukan",
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// DELETE
// Menangani apabila tidak menyertakan event_id
eventRouter.delete("/", (req, res) => {
  return res.status(400).json({ message: "Tidak menyertakan event_id" });
});

// Menyertakan event_id
eventRouter.delete("/:event_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const eventId = req.params.event_id;

    // Validasi event_id harus berupa angka
    if (!/^\d+$/.test(eventId)) {
      return res.status(400).json({ message: "Event_id tidak valid" });
    }

    // Query ke dalam database
    await prisma.event.delete({
      where: { event_id: parseInt(eventId) },
    });

    res.status(200).json({ message: "Event berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Event tidak ditemukan" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});
