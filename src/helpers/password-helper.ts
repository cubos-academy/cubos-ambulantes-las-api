import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
  public static async hash(plainPassword: string, salt = 10): Promise<string> {
    return bcrypt.hash(plainPassword, salt);
  }

  public static async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
