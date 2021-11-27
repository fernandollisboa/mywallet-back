import dotenv from 'dotenv';

let envFile;

if (process.env.NODE_ENV === 'prod') {
  envFile = '.env';
} else if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else {
  envFile = '.env.dev';
}

dotenv.config({
  path: envFile,
});
