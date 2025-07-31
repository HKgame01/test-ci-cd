import express from "express";
import { prisma } from "@repo/db/client";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await prisma.user.findFirst({
			where: {
				username,
			},
		});
		if (!user) {
			const user = await prisma.user.create({
				data: {
					username,
					password,
				},
			});

			res.json({
				message: "User Created",
				user,
			});
		} else {
			res.json({
				message: "User already exists",
			});
		}
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
