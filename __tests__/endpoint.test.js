const request = require("supertest");

const app = require("../app");

describe("API POST-interferce", () => {
  it("POST /api/todos should add new todo with given values", async () => {
    const statusCode = 201;
    const mockTodo = {
      task: "new task",
      description: "its fresh decription",
      status: "idle",
      priority: "high",
    };

    const res = await request(app).post("/api/todos").send(mockTodo);

    const { task, description, status, priority } = res.body;

    expect(res.statusCode).toBe(statusCode);
    expect(res.body).toHaveProperty("id");
    expect({ task, description, status, priority }).toEqual(mockTodo);
  });

  it("POST /api/todos should return 400 bad request invalid given values", async () => {
    const statusCode = 400;
    const mockTodo = {
      // task: "new task",
      description: "its fresh decription",
      status: "idle",
      priority: "high",
    };

    const res = await request(app).post("/api/todos").send(mockTodo);

    expect(res.status).toBe(statusCode);
  });
});

describe("API PUT-interferce", () => {
  it("UPDATE /api/todos should update todo with given values", async () => {
    const statusCode = 200;
    const mockTodo = {
      task: "newly updated task",
      description: "its new decription",
      status: "completed",
      priority: "high",
    };

    const postRes = await request(app).post("/api/todos").send(mockTodo);

    const { id } = postRes.body;

    const putRes = await request(app)
      .put("/api/todos/" + id)
      .send(mockTodo);

    expect(putRes.statusCode).toBe(statusCode);
    expect(putRes.body).toEqual({ ...mockTodo, id });
  });

  it("UPDATE /api/todos should return 400 bad request invalid given values", async () => {
    const statusCode = 400;
    const mockTodo = {
      // task: "new task",
      description: "its fresh decription",
      status: "idle",
      priority: "high",
    };

    const postRes = await request(app).post("/api/todos").send(mockTodo);

    const { id } = postRes.body;

    const putRes = await request(app)
      .put("/api/todos/" + id)
      .send(mockTodo);

    expect(putRes.status).toBe(statusCode);
  });

  it("UPDATE /api/todos should return 404 not found if { id } value does not exist", async () => {
    const statusCode = 404;
    const mockTodo = {
      task: "new task",
      description: "its fresh decription",
      status: "idle",
      priority: "high",
    };

    const id = 999;

    const putRes = await request(app)
      .put("/api/todos/" + id)
      .send(mockTodo);

    expect(putRes.status).toBe(statusCode);
  });
});

describe("API GET-interferce", () => {
  it("GET /api/todos should return a list of todos in database", async () => {
    const statusCode = 200;
    const res = await request(app).get("/api/todos");

    const todo = res.body[0]

    expect(res.status).toBe(statusCode);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(todo).toHaveProperty("id");
    expect(todo).toHaveProperty("task");
    expect(todo).toHaveProperty("description");
    expect(todo).toHaveProperty("status");
    expect(todo).toHaveProperty("priority");
  });
});

describe("API DELETE-interferce", () => {
  it("DELETE /api/todos should delete todo with given { id }", async () => {
    const statusCode = 204;
    const mockTodo = {
      task: "newly updated task",
      description: "its new decription",
      status: "completed",
      priority: "high",
    };

    const postRes = await request(app).post("/api/todos").send(mockTodo);

    const { id } = postRes.body;

    const deleteRes = await request(app).delete("/api/todos/" + id);

    expect(deleteRes.statusCode).toBe(statusCode);
  });

  it("DELETE /api/todos should return 400 bad request invalid given { id } value", async () => {
    const statusCode = 400;

    const id = null;

    const putRes = await request(app).delete("/api/todos/" + id);

    expect(putRes.status).toBe(statusCode);
  });

  it("DELETE /api/todos should return 404 not found if { id } value does not exist", async () => {
    const statusCode = 404;

    const id = 999;

    const putRes = await request(app).delete("/api/todos/" + id);

    expect(putRes.status).toBe(statusCode);
  });
});
