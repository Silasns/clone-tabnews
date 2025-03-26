import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const dataBaseVersion = await database.query("SHOW server_version;");
  const dataBaseMaxConnections = await database.query("SHOW max_connections;");
  const dataBaseName = process.env.POSTGRES_DB;
  const dataBaseConnectionsUsed = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        max_connections: parseInt(
          dataBaseMaxConnections.rows.find((m) => m).max_connections,
        ),
        opened_connections: dataBaseConnectionsUsed.rows[0].count,
        version: dataBaseVersion.rows.find((v) => v).server_version,
      },
    },
  });
}

export default status;
