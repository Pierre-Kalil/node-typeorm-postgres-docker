const devEnv = {
  type: "postgres",
  host: process.env.PG_HOST,
  port: "5420",
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: true,
  synchronize: true,
};

module.exports = devEnv;
