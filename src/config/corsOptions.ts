import { CorsOptions } from "cors";

import { allowedOrigins } from "./allowedOrigins";
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
