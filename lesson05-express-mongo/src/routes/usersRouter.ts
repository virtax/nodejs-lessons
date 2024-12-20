import { Router, Request, Response } from "express";
import { usersService } from "../services/UsersService";

const usersRouter = Router();

// *** CREATE: Add a new user ***
usersRouter.post("/", async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  try {
    const user = await usersService.createUser({ name, email, age });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get users with age > 49 ***
usersRouter.get("/old-users", async (req: Request, res: Response) => {
  try {
    // example of complex filter
    const filter = {
      age: {
        $gt: 49
      }
    }
    const users = await usersService.getAllUsers(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get all users ***
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get a user by ID ***
usersRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** UPDATE: Update a user by ID ***
usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await usersService.updateUser(id, { name, email, age});
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** DELETE: Delete a user by ID ***
usersRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await usersService.deleteUser(id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default usersRouter;
