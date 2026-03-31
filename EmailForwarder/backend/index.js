import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";


const server = express();
dotenv.config();
server.use(cors());
server.use(express.json())

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

server.get("/", (req, res) => {
  res.json({ message: "Server is working." });
});

server.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;
  console.log(req.body);

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: message
    });

    res.json({
      success: true,
      message: "Email Sent Successfully",
      body: info,
    });

  } catch (e) {
    console.log(e);
    res.json({
        success: false,
        message: "Failed",
        error: e.message
    })
  }
});

server.listen(process.env.PORT, async () => {
  console.log(`Server is running. on http://localhost:${process.env.PORT}`);
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages.");
  } catch (err) {
    console.error("Verification Failed:", err);
  }
});
