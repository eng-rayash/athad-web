import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";

const router = express.Router();

// Store file in memory — we forward it directly to ImageKit
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (JPEG, PNG, WebP, GIF)"));
    }
  },
});

/**
 * POST /api/upload
 * Accepts: multipart/form-data { file, fileName, folder }
 * Forwards to ImageKit using the private key stored in .env
 */
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
      return res.status(500).json({ error: "IMAGEKIT_PRIVATE_KEY not configured in .env" });
    }

    const fileName = req.body.fileName || `upload_${Date.now()}_${req.file.originalname}`;
    const folder   = req.body.folder   || "uploads";

    const credentials = Buffer.from(`${privateKey}:`).toString("base64");
    const form = new FormData();
    form.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append("fileName", fileName);
    form.append("folder", folder);

    const ikRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        ...form.getHeaders(),
      },
      body: form,
    });

    if (!ikRes.ok) {
      const text = await ikRes.text();
      return res.status(ikRes.status).json({ error: `ImageKit error: ${text}` });
    }

    const data = await ikRes.json();
    return res.json({ url: data.url, fileId: data.fileId, name: data.name });
  } catch (err) {
    next(err);
  }
});

export default router;
