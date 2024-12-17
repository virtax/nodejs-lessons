import sqlite3 from 'sqlite3';
import path from 'path';
import getLogger from '../utils/logger';

const logger = getLogger("db");

export class DatabaseService {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        logger.error('Error opening database', err.message);
      } else {
        logger.log('Connected to the SQLite database');
        this.init();
      }
    });
  }

  // Executing a query
  public query<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }

  // Executing a query returning one row (e.g., getting a user by ID)
  public get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });
  }

  // Executing updates (INSERT, UPDATE, DELETE)
  public run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  // Close the database connection
  public close(): void {
    logger.log('Closing database connection');
    this.db.close((err) => {
      if (err) {
        logger.error('Error closing database', err.message);
      }
    });
  }

    // Method to initialize the database (create the users table if it doesn't exist)
    private init() {
      const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE
        );
      `;

      this.db.run(createTablesSQL, (err) => {
        if (err) {
          logger.error('Error creating users table', err.message);
        } else {
          logger.log('Users table is ready');
        }
      });
    }

}

// Build the path to the database file in the 'db' folder
const dbPath = path.join('db', 'database.db');

// Create an instance of DatabaseService, passing the dbPath
export const dbService = new DatabaseService(dbPath);
