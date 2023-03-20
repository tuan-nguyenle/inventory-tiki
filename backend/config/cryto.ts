import { scryptSync, randomBytes } from "crypto";

export class Password {
  static async hashedPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 64);
    return `${hash.toString("hex")}.${salt}`;
  }

  static async comparePassword(newPassword: string, passwordDatabase: string) {
    const [hashedPassword, salt] = passwordDatabase.split(".");
    const hashNewPassword = scryptSync(newPassword, salt, 64);
    return hashNewPassword.toString("hex") === hashedPassword;
  }
}
