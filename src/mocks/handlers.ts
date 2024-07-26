import { http, HttpResponse, ws } from "msw";
import { ExposureModel } from "../models/camera";
import { Iso, ExpMode, DRC } from "../models/camera";

//api/user

const chat = ws.link("ws://localhost:8000/ws/");

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("/api/snapimage", async () => {
    console.log("SNAP");
    // ...and respond to them using this JSON response.

    const buffer = await fetch("./image.jpg.base64").then((response) =>
      response.arrayBuffer()
    );

    return HttpResponse.arrayBuffer(buffer, {
      headers: { "Content-Type": "text/html" },
    });
  }),

  http.get("/api/exposure", async () => {
    // ...and respond to them using this JSON response.

    const expModel: ExposureModel = {
      iso: Iso.iso000,
      analog_gain: 0.1,
      digital_gain: 0.2,
      exposure_speed: 0.3,
      shutter_speed: 0.4,
      compensation: 0.5,
      mode: ExpMode.auto,
      drc_strength: DRC.low,
    };

    return HttpResponse.json(expModel);
  }),

  // chat.on("connection", async ({ client }) => {
  //   console.log("HELLO");
  //   client.send("hello from server!");
  // }),

  chat.on("connection", async ({ client }) => {
    console.log("HELLO");
    const buffer = await fetch("./stream.h264").then((response) =>
      response.arrayBuffer()
    );
    let i = 0;

    let loop = true;

    client.addEventListener("close", () => {
      console.log("CLOSE EVENT");
      loop = false;
    });

    while (loop) {
      client.send(buffer);
      await new Promise((r) => setTimeout(() => r(), 1000));
      i = i + 1;
    }

    console.log("STREAM END");
  }),
];
