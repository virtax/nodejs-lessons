import { User } from "../models/User";

export class UserService {
  // Method to get all users
  async getAllUsers(filters: Record<string, any> = {}) {
    return await User.find(filters);
  }

  // Method to get a user by ID
  async getUserById(id: string) {
    return await User.findById(id);
  }

  // Method to create a new user
  async createUser(data: { name: string; email: string; age: number }) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.age = data.age;
    await user.save();
  }

  // Method to update a user
  async updateUser(id: string, data: { name?: string; email?: string; age: number }) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found!`)
    }
    user.name = data.name;
    user.email = data.email;
    user.age = data.age;
    await user.save();
  }

  // Method to delete a user
  async deleteUser(id: string) {
    return User.deleteOne({_id: id});
  }
}

export const userService = new UserService();