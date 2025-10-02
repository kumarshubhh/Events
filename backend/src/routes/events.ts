import { Router } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";
import type { AuthRequest } from "../middleware/auth";
import crypto from "crypto";

const prisma = new PrismaClient();
const router = Router();

const eventSchema = z.object({
  title: z.string().min(1).max(200),
  dateTime: z.string(),
  location: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
});

router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parse = eventSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
  const { title, dateTime, location, description } = parse.data;
  const event = await prisma.event.create({
    data: { title, dateTime: new Date(dateTime), location, description, userId: req.user!.id },
  });
  res.status(201).json(event);
});

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const { filter } = req.query; // upcoming | past | all
  const now = new Date();
  const where: any = { userId: req.user!.id };
  if (filter === "upcoming") where.dateTime = { gte: now };
  if (filter === "past") where.dateTime = { lt: now };
  const events = await prisma.event.findMany({ where, orderBy: { dateTime: "asc" } });
  res.json(events);
});

router.get("/:id", requireAuth, async (req: AuthRequest, res) => {
  const event = await prisma.event.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
  if (!event) return res.status(404).json({ message: "Not found" });
  res.json(event);
});

router.put("/:id", requireAuth, async (req: AuthRequest, res) => {
  const parse = eventSchema.partial().safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
  const data: any = { ...parse.data };
  if (data.dateTime) data.dateTime = new Date(data.dateTime);
  const updated = await prisma.event.updateMany({ where: { id: req.params.id, userId: req.user!.id }, data });
  if (updated.count === 0) return res.status(404).json({ message: "Not found" });
  const event = await prisma.event.findUnique({ where: { id: req.params.id } });
  res.json(event);
});

router.delete("/:id", requireAuth, async (req: AuthRequest, res) => {
  const deleted = await prisma.event.deleteMany({ where: { id: req.params.id, userId: req.user!.id } });
  if (deleted.count === 0) return res.status(404).json({ message: "Not found" });
  res.status(204).send();
});

router.post("/:id/share", requireAuth, async (req: AuthRequest, res) => {
  const event = await prisma.event.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
  if (!event) return res.status(404).json({ message: "Not found" });
  const token = crypto.randomBytes(16).toString("hex");
  const share = await prisma.eventShare.upsert({
    where: { eventId: event.id },
    update: { token },
    create: { eventId: event.id, token },
  });
  res.json({ token: share.token });
});

router.get("/public/:token", async (req, res) => {
  const share = await prisma.eventShare.findUnique({ where: { token: req.params.token }, include: { event: true } });
  if (!share) return res.status(404).json({ message: "Not found" });
  res.json(share.event);
});

export default router;


