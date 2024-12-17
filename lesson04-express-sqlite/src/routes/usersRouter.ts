// routes/usersRouter.ts
import { Router, Request, Response } from 'express';
import { usersService } from '../services/UsersService';

const usersRouter = Router();

// *** CREATE: Add a new user ***
usersRouter.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const user = await usersService.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    if (err.message === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
      res.status(400).json({ error: "Please change your email" });
    }
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get all users ***
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** READ: Get a user by ID ***
usersRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await usersService.getUserById(Number(id));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** UPDATE: Update a user by ID ***
usersRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await usersService.updateUser(Number(id), name, email);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// *** DELETE: Delete a user by ID ***
usersRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const message = await usersService.deleteUser(Number(id));
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default usersRouter;
