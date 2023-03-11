import express from "express";
import * as path from "node:path";
import { render, node, preload } from "lausanne";
import App from "app";

const app = express();
const root = path.resolve("./src");
const vendor = path.resolve("..");

const options = {
  path: process.env["DOMAIN"]
    ? `https://${process.env["DOMAIN"]}/client`
    : "http://localhost:3000/client",
  root: vendor,
};

app.get("/", async (_, response) => {
  const app = await render(<App city="London" />, options);

  response.send(`<html lang="en">
      <head>
        <title>Lausanne</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <style type="text/css">
          body {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          x-weather::part(logo) {
            // filter: grayscale(100%);
          }
        </style>

        ${preload(app)}

        <script type="importmap">
          {"imports": {
              "lausanne": "/client/library/dist/index.client.js",
              "preact": "https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.0/preact.module.min.js",
              "preact/hooks": "https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.0/hooks.module.min.js",
              "preact/compat": "https://cdnjs.cloudflare.com/ajax/libs/preact/10.13.0/compat.module.min.js",
              "preact/jsx-runtime": "https://cdn.jsdelivr.net/npm/preact-jsx-runtime@1.2.0/jsx-runtime.min.js"
          }}
        </script>

        <script
          type="module"
          src="/client/app/dist/index.js"
          async
          defer
        ></script>
      </head>
      <body>
        ${app}
      </body>
    </html>`);
});

app.use("/client", express.static(vendor));
app.use(express.static(root));

app.listen(3000);
