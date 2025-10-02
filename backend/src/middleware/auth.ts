import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export interface AuthRequest extends Request { user?: { id: string; email: string } }

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const decoded = verifyJwt(token) as any;
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}


