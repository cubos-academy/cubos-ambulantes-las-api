import { UnauthorizedException } from '@nestjs/common';

export class AdminTempHelper {
  public static isPasswordCorrect(key: string): boolean {
    if (key === process.env.ADMIN_KEY) {
      return true;
    }

    return false;
  }

  public static adminOrThrown(key: string) {
    const isAdmin = this.isPasswordCorrect(key);

    if (!isAdmin) {
      throw new UnauthorizedException(
        'The admin password is incorrect, are you really from Cubos?!!!!',
      );
    }
  }
}
