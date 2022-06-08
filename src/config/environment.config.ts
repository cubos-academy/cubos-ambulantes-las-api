import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class EnvironmentConfig {
  /**
   * @description get a specific value from .env file
   * @param key key to be searched in .env
   * @param throwOnUndefined throw an error whether key not found on .env
   * @default throwOnUndefined true
   */
  private getValue(key: string, throwOnUndefined = true): string {
    const value = process.env[key];
    if (!value && throwOnUndefined) {
      throw new Error(`Missing env: ${key}`);
    }

    return value;
  }

  /**
   * @description ensure that all values from received array of keys exists on .env
   * @param keys array of keys
   * @throws true
   */
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  /**
   * @description determine whether the application is on production
   */
  public isOnProduction(): boolean | object {
    const mode = this.getValue('NODE_ENV', false);

    if (mode === 'dev') {
      return false;
    } else {
      return { rejectUnauthorized: false };
    }
  }

  /**
   * @description typeorm configuration for the project.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    this.ensureValues([
      'POSTGRES_HOST',
      'POSTGRES_PORT',
      'POSTGRES_USER',
      'POSTGRES_PASSWORD',
      'POSTGRES_DATABASE',
    ]);

    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: false,
      migrationsTableName: 'migrations',
      migrations: ['dist/migrations/*.{ts,js}'],
      entities: ['dist/**/*entity.{ts,js}'],
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
      },
      ssl: this.isOnProduction(),
    };
  }
}
