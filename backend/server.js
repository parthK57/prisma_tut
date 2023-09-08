const express = require("express");
const cors = require("cors");
const { PrismaClient, Prisma } = require("@prisma/client");

const app = express();

app.use(express.json());
app.use(cors());

const PRISMA = new PrismaClient();

app.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const validCreds = await PRISMA.user.findUnique({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (validCreds) return res.status(200).json({ res: "success" });
    else return res.status(401).json({ res: "Invalid credentials!" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await PRISMA.user.create({
      data: data,
    });
    res.status(200).json({ res: "success!", id: newUser });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(401).send("Email/Username is already taken!");
      }
    } else res.status(500).send("Server error");
  }
});

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is live at ${process.env.SERVER_PORT}`)
);
