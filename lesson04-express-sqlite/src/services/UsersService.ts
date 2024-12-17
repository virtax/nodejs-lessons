import { dbService, DatabaseService } from './DatabaseService';

export class UsersService {
  private dbService: DatabaseService;

  constructor(dbService: DatabaseService) {
    this.dbService = dbService;
  }

  // Method to get all users
  public getAllUsers() {
    const sql = 'SELECT * FROM users';
    return this.dbService.query(sql);
  }

  // Method to get a user by ID
  public getUserById(id: number) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return this.dbService.get(sql, [id]);
  }

  // Method to create a new user
  public createUser(name: string, email: string) {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    return this.dbService.run(sql, [name, email]);
  }

  // Method to update a user
  public updateUser(id: number, name: string, email: string) {
    const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    return this.dbService.run(sql, [name, email, id]);
  }

  // Method to delete a user
  public deleteUser(id: number) {
    const sql = 'DELETE FROM users WHERE id = ?';
    return this.dbService.run(sql, [id]);
  }
}

export const usersService = new UsersService(dbService);
