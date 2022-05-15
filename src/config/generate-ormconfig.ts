import { existsSync, writeFileSync } from 'fs';
import { EnvironmentConfig } from './environment.config';
/**
 * Call this function on main to generate an ORM config JSON file.
 */
export default function generateOrmConfig() {
  const isFileCreated = existsSync('ormconfig.json');

  if (!isFileCreated) {
    writeFileSync(
      'ormconfig.json',
      JSON.stringify(new EnvironmentConfig().getTypeOrmConfig(), null, 2),
    );
  }
}
