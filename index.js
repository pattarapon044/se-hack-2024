const express = require("express");
const prisma = require("./prisma");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/users", async (req, res) => {
  try {
    const data = await prisma.user.create({ data: req.body });
    res.status(201).send(data);
  } catch (error) {
    console.error("Create user error", error);
    res.status(500).send(error.message);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const data = await prisma.user.findFirst({ where: { id: req.params.id } });
    if (!data) {
      return res.status(404).send("not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Get user by id error", error);
    res.status(500).send(error.message);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const data = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    if (!data) {
      return res.status(404).send("not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Update user by id error", error);
    res.status(500).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const data = await prisma.user.delete({
      where: { id: req.params.id },
    });
    if (!data) {
      return res.status(404).send("not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Delete user by id error", error);
    res.status(500).send(error.message);
  }
});

app.listen(8080);
