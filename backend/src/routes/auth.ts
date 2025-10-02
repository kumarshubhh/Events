import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signJwt } from "../utils/jwt";

const prisma = new PrismaClient();
const router = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

router.post("/signup", async (req, res) => {
  const parse = credentialsSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
  const { email, password } = parse.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already registered" });
  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, password: hashed } });
  const token = signJwt({ id: user.id, email: user.email });
  return res.status(201).json({ token, user: { id: user.id, email: user.email } });
});

router.post("/login", async (req, res) => {
  const parse = credentialsSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
  const { email, password } = parse.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signJwt({ id: user.id, email: user.email });
  return res.json({ token, user: { id: user.id, email: user.email } });
});

export default router;


