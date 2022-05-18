import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class EnvironmentConfig {
  private getValue(key: string, throwOnUndefined = true): string {
    const value = process.env[key];
    if (!value && throwOnUndefined) {
      throw new Error(`Missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public isOnProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'dev';
  }

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
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.{ts,js}'],
      entities: ['dist/entities/*entity.{ts,js}'],
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migration',
      },
      ssl: this.isOnProduction(),
    };
  }
}
