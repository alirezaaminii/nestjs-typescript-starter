import { registerAs } from '@nestjs/config';

// Same as configuration.ts
export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  };
});
