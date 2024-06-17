import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";

export const userRouter = express.Router();
const prisma = new PrismaClient();

// POST
userRouter.post("/", async (req, res, next) => {
  try {
    // Tangkap request body
    const { username, password, email, phone_number } = req.body;

    // Pengecekan request body
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, password, dan email tidak boleh kosong" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query ke database
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        phone_number,
      },
    });

    // Supaya password tidak ditampilkan
    const response = {
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
      phone_number: newUser.phone_number,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET
// Mengatasi apabila tidak menyertakan user_id
userRouter.get("/", (req, res, next) => {
  return res.status(400).json({ message: "User_id tidak disertakan" });
});

// Dengan meyertakan user_id
userRouter.get("/:user_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const userId = req.params.user_id;

    // Validasi User (supaya hanya berbentuk angka)
    if (!userId || !/^\d+$/.test(userId)) {
      return res.status(400).json({ message: "User_id tidak valid" });
    }

    // Query ke database
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(userId) },
    });

    // Pengecekan ada/tidaknya user
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Membuat objek baru dari objek user dengan tanpa password
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PUT
// Mengatasi apabila tidak menyertakan user_id
userRouter.put("/", (req, res) => {
  return res.status(400).json({ message: "Tidak ada User_id yang dimasukkan" });
});

// Menyertakan user_id
userRouter.put("/:user_id", async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const body = req.body;

    // Validasi user_id
    if (!userId || !/^\d+$/.test(userId)) {
      return res.status(400).json({ message: "UserId tidak valid" });
    }

    // Validasi body
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Body tidak boleh kosong" });
    }

    // Update user di database
    const updatedUser = await prisma.user.update({
      where: {
        user_id: parseInt(userId),
      },
      data: body,
    });

    // Membuat objek baru tanpa password dari objek updatedUser
    const { password, ...userWithoutPassword } = updatedUser;

    // Respon sukses tanpa password
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    if (error.code === "P2025") {
      // Menangani ketika user_id yang diberikan tidak ditemukan
      res.status(404).json({
        message: "Tidak bisa melakukan update, karena User_Id tidak ditemukan",
      });
    } else {
      // Respon error lainnya
      res.status(500).json({ message: error.message });
    }
  }
});

//Delete
// Mengatasi apabila tidak menyertakan user_id
userRouter.delete("/", (req, res) => {
  return res.status(400).json({ message: "Tidak ada GuestId yang dimasukkan" });
});

// Menyertakan user_id
userRouter.delete("/:user_id", async (req, res, next) => {
  try {
    // Tangkap request params
    const userId = req.params.user_id;

    // Pengecekan user Id (Harus valid)
    if (!userId || !/^\d+$/.test(userId)) {
      return res.status(400).json({ message: "UserId tidak valid" });
    }

    // Query ke database
    const user = await prisma.user.delete({
      where: {
        user_id: parseInt(userId),
      },
    });

    res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      // Menangani user_id yang diberikan tidak ditemukan
      res.status(404).json({
        message: "User_id yang ingin dihapus tidak ditemukan",
      });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});
