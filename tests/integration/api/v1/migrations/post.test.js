test("POST to api/v1/status should return 200", async () => {
  // porem await so pode esperar em uma função assincrona
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  }); //await fica esperando, esperar o retorno do fetch
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
});
