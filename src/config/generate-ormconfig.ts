import { existsSync, writeFileSync } from 'fs';
import { EnvironmentConfig } from './environment.config';

/**
 * @description generate an ormconfig.json on root of project whether not exists.
 */
export default function generateOrmConfig(): void {
  const isFileCreated = existsSync('ormconfig.json');

  if (!isFileCreated) {
    writeFileSync(
      'ormconfig.json',
      JSON.stringify(new EnvironmentConfig().getTypeOrmConfig(), null, 2),
    );
  }
}
