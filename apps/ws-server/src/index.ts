import { WebSocket, WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws) => {
	const x = await prisma.user.create({
		data: {
			username: Math.random().toString(),
			password: Math.random().toString(),
		},
	});
	console.log(x);
	ws.send("Hi there");
});
