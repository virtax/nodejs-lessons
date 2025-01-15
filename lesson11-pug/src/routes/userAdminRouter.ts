import { Router, Request, Response } from "express";
import { userService } from "../services/UserService";
import bcrypt from "bcrypt";

const userAdminRouter = Router();

userAdminRouter.get("/register", (req, res) => {
  res.render("register");
})


userAdminRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  //const user = users.find(u => u.username === username);
  const user = await userService.getUserBy({
    email
  });

  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  // users.push({ username, passwordHash });
  await userService.createUser( { name: email, email, age: 0, passwordHash})

  res.status(201).send('User registered');
});

export default userAdminRouter;
