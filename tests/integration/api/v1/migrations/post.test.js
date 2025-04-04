import database from "infra/database.js";
import migrations from "pages/api/v1/migrations";

beforeAll(cleaDatabase);

async function cleaDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to api/v1/status should return 200", async () => {
  // porem await so pode esperar em uma função assincrona
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  }); //await fica esperando, esperar o retorno do fetch

  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(response1Body.length).toBeGreaterThan(0);
  expect(Array.isArray(response1Body)).toBe(true);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  }); //await fica esperando, esperar o retorno do fetch
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
