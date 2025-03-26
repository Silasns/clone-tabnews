test("GET to api/v1/status should return 200", async () => {
  // porem await so pode esperar em uma função assincrona
  const response = await fetch("http://localhost:3000/api/v1/status"); //await fica esperando, esperar o retorno do fetch
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBe(parsedUpdateAt);

  const versionDataBase = "17.4";
  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toBe(versionDataBase);

  const maxConnectionsDataBase = 100;
  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBe(
    maxConnectionsDataBase,
  );

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
