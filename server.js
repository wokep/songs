// server.js
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.static("public"));

// Configure file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Handle uploads
app.post("/upload", upload.single("music"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({
    file: `/uploads/${req.file.filename}`,
    name: req.file.originalname
  });
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(3000, () =>
  console.log("✅ Server running at http://localhost:3000")
);

