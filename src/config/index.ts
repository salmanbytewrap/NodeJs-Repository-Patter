type env = {
  PORT: Number;
  NODE_ENV: string;
  JWTSECRET: string;
  ISSUER?: string;
  MONGODB_URI: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;

};

const config: env = {
  PORT: parseInt(process.env.PORT || '8080'),
  NODE_ENV: process.env.NODE_ENV || '',
  JWTSECRET: process.env.JWTSECRET as string,
  ISSUER: process.env.ISSUER,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

console.log(process.env.PORT);

export default config;