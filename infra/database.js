import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  console.log("##########");
  console.log({
    databaseUrl: process.env.DATABASE_URL,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  console.log("##########");
  console.log("Node env: ", process.env.NODE_ENV);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client.end();
  }
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  return process.env.NODE_ENV === "development"
    ? false
    : true || process.env.NODE_ENV === "test"
      ? false
      : true;
}

export default {
  query: query,
};
