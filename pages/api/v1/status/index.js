import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const dataBaseVersion = await database.query("SELECT version()");
  const dataBaseMaxConnections = await database.query("SHOW max_connections;");
  const dataBaseConnectionsUsed = await database.query(
    "SELECT count(*) FROM pg_stat_activity;",
  );

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: dataBaseMaxConnections.rows.find((m) => m)
          .max_connections,
        opened_connections: dataBaseConnectionsUsed.rows.find((c) => c).count,
        version: dataBaseVersion.rows.find((v) => v).version,
      },
    },
  });
}

export default status;
