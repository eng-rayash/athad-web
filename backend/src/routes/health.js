import express from "express";

const router = express.Router();

/**
 * GET /api/health
 * Simple health-check endpoint — used by deployment platforms & monitoring.
 */
router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "athad-web-backend",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

export default router;
