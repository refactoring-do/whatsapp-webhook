import { LogLevel } from "./logger.enum";

export class Logger {
  static log(message: any): void {
    const date = new Date().toISOString();

    console.log({
      level: LogLevel.INFO,
      message: `${LogLevel.INFO} [${date}]: ${message}`,
      date,
    });
  }

  static error(message: any): void {
    const date = new Date().toISOString();

    console.log({
      level: LogLevel.ERROR,
      message: `${LogLevel.ERROR} [${date}]: ${message}`,
      date,
    });
  }

  static warning(message: any): void {
    const date = new Date().toISOString();

    console.log({
      level: LogLevel.WARNING,
      message: `${LogLevel.WARNING} [${date}]: ${message}`,
      date,
    });
  }
}
