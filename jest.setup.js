// import "whatwg-fetch";
// import "setimmediate";
// import { config } from "dotenv";

// config({
//   path: ".env.test",
// });

require("dotenv").config({
  path: ".env.test",
});

jest.mock("./src/helpers/getEnvVariables", () => ({
  getEnvVariables: () => ({ ...process.env }),
}));
