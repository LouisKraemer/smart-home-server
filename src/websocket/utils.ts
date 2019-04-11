import { routes } from "./routes";

export const parseIncomingMessage = async (userId, message) => {
  const { type, payload } = JSON.parse(message);
  if (!type) throw new Error("INVALID_INCOMING_MESSAGE");
  if (!routes[type]) throw new Error("INVALID_TYPE");
  const { shouldRespond, payload: responsePayload } = await routes[type]({
    ...payload,
    userId
  });
  const stringifiedResponsePayload = JSON.stringify(responsePayload);
  return { shouldRespond, payload: stringifiedResponsePayload };
};
