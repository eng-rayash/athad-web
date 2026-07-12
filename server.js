import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── API Routes ────────────────────────────────────────────────────────────────

// GET /api/health
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "athad-web-backend",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// Setup multer for uploading files directly to ImageKit via backend API
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

// POST /api/upload
app.post("/api/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey || privateKey === "your_private_key_here") {
      return res.status(500).json({ error: "IMAGEKIT_PRIVATE_KEY not configured or using placeholder in .env" });
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

// GET /api/local-images
app.get("/api/local-images", (_req, res, next) => {
  try {
    const localPhotosDir = path.resolve(__dirname, "صور الاعمال");
    if (!fs.existsSync(localPhotosDir)) {
      return res.json({ files: [] });
    }
    const files = fs.readdirSync(localPhotosDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
      });
    return res.json({ files });
  } catch (err) {
    next(err);
  }
});

// POST /api/migrate-image
app.post("/api/migrate-image", async (req, res, next) => {
  try {
    const { filename, category } = req.body;
    if (!filename) {
      return res.status(400).json({ error: "Filename is required" });
    }

    const localPhotosDir = path.resolve(__dirname, "صور الاعمال");
    const filePath = path.join(localPhotosDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Local file not found" });
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey || privateKey === "your_private_key_here") {
      return res.status(500).json({ error: "IMAGEKIT_PRIVATE_KEY not configured or using placeholder in .env" });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const mimeType = filename.endsWith(".png") ? "image/png" : filename.endsWith(".webp") ? "image/webp" : "image/jpeg";

    const credentials = Buffer.from(`${privateKey}:`).toString("base64");
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: filename,
      contentType: mimeType,
    });
    form.append("fileName", `migrated_${Date.now()}_${filename}`);
    form.append("folder", "projects");

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
    return res.json({
      url: data.url,
      fileId: data.fileId,
      name: data.name,
      title: filename.replace(/\.[^/.]+$/, "").replace(/-/g, " "),
      category: category || "أعمال متنوعة",
      desc: "تم استيرادها تلقائياً من مجلد صور الأعمال المحلي"
    });
  } catch (err) {
    next(err);
  }
});

// ─── Frontend Integration ──────────────────────────────────────────────────────

const isProd = process.env.NODE_ENV === "production" || !fs.existsSync(path.resolve(__dirname, "vite.config.ts"));

if (!isProd) {
  // Development mode: load Vite in middleware mode
  console.log("🚀 Running in development mode with Vite HMR middleware...");
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  // Production mode: serve static files from dist/
  console.log("📦 Running in production mode, serving built static files...");
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));

  // Catch-all route to serve index.html for SPA routing (HashRouter or BrowserRouter)
  app.get("*", (req, res, next) => {
    // If request asks for /api, do not fallback to index.html (return 404 instead)
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// ─── 404 handler for API / other unhandled requests ────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[Error]", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// ─── Start Server ──────────────────────────────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

export default app;
