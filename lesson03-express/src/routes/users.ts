import { Router, Request, Response, NextFunction } from "express";

interface User {
  id: number;
  name: string;
}

const router = Router();
const users: User[] = [{ id: 1, name: "Ivan Petrenko" }, { id: 2, name: "Taras Bulba" }];

// GET All Users
router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

// GET User by ID
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    const err = new Error("User not found");
    // res.status(404).json({ error: "User not found" });
    return next(err);
  }
  res.json(user);
});

// POST New User
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    const err = new Error("Name is required");
    res.status(400);
    return next(err);
  }
  const newUser: User = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;
