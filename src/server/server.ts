import express, { Express } from "express";

export class Server {
  private readonly application: Express;

  constructor() {
    this.application = express();
    this.application.use(express.json());
  }

  get instance(): Express {
    return this.application;
  }
}
