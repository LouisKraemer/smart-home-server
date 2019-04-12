import * as WebSocket from "ws";

import { parseIncomingMessage } from "./websocket.service";
import { checkJWT, extractIdFromJWT } from "../user";
import { isUserAllowedToReceiveUpdates } from "../yeelight";
import { UNAUTHORIZED } from "./webscoket.constants";

const wss = new WebSocket.Server({
  port: process.env.WEBSOCKET_PORT,
  verifyClient: (info, cb) => {
    const token = info.req.url.substring(1);
    if (!token) cb(false, 401, UNAUTHORIZED);
    else {
      const isJWTValid = checkJWT(token);
      if (isJWTValid) {
        cb(true);
      } else {
        cb(false, 401, UNAUTHORIZED);
      }
    }
  }
});

export const initWs = () => {
  wss.on("connection", (ws, request) => {
    console.log("New ws connection !");
    const token = request.url.substring(1);
    const id = extractIdFromJWT(token);
    ws.userId = id;
    ws.on("message", async message => {
      try {
        const { shouldRespond, payload } = await parseIncomingMessage(
          id,
          message
        );
        if (shouldRespond) ws.send(payload);
      } catch (error) {
        console.error(`Error executing message ${message}`, error);
      }
    });
  });
};

export const broadcast = (deviceId, message) => {
  wss.clients.forEach(async client => {
    const userShouldBeUpdated = await isUserAllowedToReceiveUpdates(
      deviceId,
      client.userId
    );
    if (userShouldBeUpdated && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
