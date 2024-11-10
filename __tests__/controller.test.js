const request = require("supertest");
const TodoModel = require("../model/todoModel");

const app = require("../app");

jest.mock("../model/todoModel");

describe("[Controller] GET - tests", () => {
  it("GET function should be defined and a function", () => {
    expect(TodoModel.getTodos).toBeDefined();
    expect(typeof TodoModel.getTodos).toBe("function");
  });

  it("GET /api/todos should have 200 status code when data recived", async () => {
    const mockTodo = {
      task: "this is our task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.getTodos.mockResolvedValue(mockTodo);

    const status = 200;

    const res = await request(app).get("/api/todos");

    expect(res.body).toEqual(mockTodo);
    expect(res.statusCode).toBe(status);
  });

  it("GET /api/todos should have 500 status code when DB fails ", async () => {
    const errorMsg = "Database error while retrieving todos";
    const status = 500;

    TodoModel.getTodos.mockRejectedValue(new Error(errorMsg));
    const res = await request(app).get("/api/todos");

    expect(res.status).toBe(status);
    expect(JSON.parse(res.error.text)).toEqual({ err: errorMsg });
  });
});

describe("[Controller] POST - tests", () => {
  it("POST function should be defined and a function", () => {
    expect(TodoModel.postTodo).toBeDefined();
    expect(typeof TodoModel.postTodo).toBe("function");
  });

  it("POST /api/todos should have 200 status code when data is sent", async () => {
    const status = 201;

    const mockTodo = {
      task: "this is our task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.postTodo.mockResolvedValue(mockTodo);

    const res = await request(app).post("/api/todos").send(mockTodo);

    expect(res.body).toEqual(mockTodo);
    expect(res.statusCode).toBe(status);
    expect(TodoModel.postTodo).toHaveBeenCalledWith(mockTodo);
  });

  it("POST /api/todos should return 400 bad requets if insertion goes wrong ", async () => {
    const status = 500;

    const mockTodo = {
      task: "this is our task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.postTodo.mockRejectedValue(new Error("error while adding todo"));

    const res = await request(app).post("/api/todos").send(mockTodo);

    expect(res.statusCode).toBe(status);
    expect(TodoModel.postTodo).toHaveBeenCalledWith(mockTodo);
  });
});

describe("[Controller] DELETE - tests", () => {
  it("DELETE function should be defined and a function", () => {
    expect(TodoModel.postTodo).toBeDefined();
    expect(typeof TodoModel.postTodo).toBe("function");
  });

  it("DELETE /api/todos should have 204 status code when todo is deleted", async () => {
    const status = 204;

    const mockTodo = {
      id: "5",
      task: "this is our task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.deleteTodo.mockResolvedValue(mockTodo);

    const res = await request(app).delete("/api/todos/" + mockTodo.id);

    expect(res.statusCode).toBe(status);
    expect(TodoModel.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it("DELETE /api/todos should have 404 not found requets if todo does not exist", async () => {
    const status = 404;

    const mockTodo = {
      id: "5",
      task: "this is our task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.deleteTodo.mockResolvedValue(null);

    const res = await request(app).delete("/api/todos/" + mockTodo.id);

    expect(res.statusCode).toBe(status);
    expect(TodoModel.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it("DELETE /api/todos should return 500 server error if database error ", async () => {
    const status = 500;

    const mockTodo = {
      id: "5",
      task: "this is our deleting task",
      description: "this is a nice formatted description",
      status: "incomplete",
      priority: "low",
    };

    TodoModel.deleteTodo.mockRejectedValue(
      new Error("error while deleting todo")
    );

    const res = await request(app)
      .delete("/api/todos/" + mockTodo.id)
      .send(mockTodo);

    expect(res.statusCode).toBe(status);
    expect(TodoModel.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });
});

describe("[Controller] UPDATE - tests", () => {
    it("UPDATE function should be defined and a function", () => {
      expect(TodoModel.updateTodo).toBeDefined();
      expect(typeof TodoModel.updateTodo).toBe("function");
    });
  
    it("UPDATE /api/todos should have 200 status code when todo is updated", async () => {
      const status = 200;
  
      const mockTodo = {
        id: "5",
        task: "this is our updating task",
        description: "this is a nice formatted description",
        status: "incomplete",
        priority: "low",
      };
  
      TodoModel.updateTodo.mockResolvedValue(mockTodo);
  
      const res = await request(app).put("/api/todos/" + mockTodo.id).send(mockTodo);
  
      expect(res.statusCode).toBe(status);
      expect(TodoModel.updateTodo).toHaveBeenCalledWith(mockTodo);
    });
  
    it("UPDATE /api/todos should have 404 not found requets if todo does not exist", async () => {
      const status = 404;
  
      const mockTodo = {
        id: "5",
        task: "this is our updating task",
        description: "this is a nice formatted description",
        status: "incomplete",
        priority: "low",
      };
  
      TodoModel.updateTodo.mockResolvedValue(null);
  
      const res = await request(app).put("/api/todos/" + mockTodo.id).send(mockTodo);
  
      expect(res.statusCode).toBe(status);
      expect(TodoModel.updateTodo).toHaveBeenCalledWith(mockTodo);
    });
  
    it("UPDATE /api/todos should return 500 server error if database error ", async () => {
      const status = 500;
  
      const mockTodo = {
        id: "5",
        task: "this is our updating task",
        description: "this is a nice formatted description",
        status: "incomplete",
        priority: "low",
      };
  
      TodoModel.updateTodo.mockRejectedValue(
        new Error("error while updating todo")
      );
  
      const res = await request(app)
        .put("/api/todos/" + mockTodo.id)
        .send(mockTodo);
  
      expect(res.statusCode).toBe(status);
      expect(TodoModel.updateTodo).toHaveBeenCalledWith(mockTodo);
    });
  });
  
