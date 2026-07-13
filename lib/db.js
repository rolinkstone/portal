import mysql from "mysql2/promise";

// Validasi environment variables — beri pesan jelas jika belum di-set
const REQUIRED_ENV = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASS: process.env.MYSQL_PASS,
  MYSQL_DB: process.env.MYSQL_DB,
};

const missing = Object.entries(REQUIRED_ENV)
  .filter(([, val]) => !val)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(
    `❌ Database tidak bisa terkoneksi — environment variable berikut belum di-set:\n   ${missing.join(', ')}`
  );
}

let pool;

if (!pool && REQUIRED_ENV.MYSQL_HOST && REQUIRED_ENV.MYSQL_USER && REQUIRED_ENV.MYSQL_DB) {
  pool = mysql.createPool({
    host: REQUIRED_ENV.MYSQL_HOST,
    user: REQUIRED_ENV.MYSQL_USER,
    password: REQUIRED_ENV.MYSQL_PASS || '',
    database: REQUIRED_ENV.MYSQL_DB,
    connectionLimit: 10,
  });
}

export default pool;
