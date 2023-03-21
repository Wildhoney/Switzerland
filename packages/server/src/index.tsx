import App from "app";
import express from "express";
import * as path from "node:path";
import { imports, preload, render } from "switzerland";

const app = express();
const root = path.resolve("./src");
const vendor = {
  prefix: "client",
  root: path.resolve(".."),
};

const options = {
  path: process.env["DOMAIN"]
    ? `https://${process.env["DOMAIN"]}/${vendor.prefix}`
    : `http://localhost:3000/${vendor.prefix}`,
  root: vendor.root,
};

app.get("/", async (_, response) => {
  const app = await render(<App city="London" />, options);

  response.send(`<html lang="en">
      <head>
        <title>Switzerland</title>
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
          ${JSON.stringify(
            {
              imports: {
                switzerland: `/${vendor.prefix}/library/dist/index.client.js`,
                ...JSON.parse(
                  await imports({
                    path: path.resolve("../app/src"),
                    excludeDependencies: ["switzerland"],
                  })
                ).imports,
              },
            },
            null,
            4
          )}
        </script>

        <script
          type="module"
          src="/${vendor.prefix}/app/dist/index.js"
          async
          defer
        ></script>
      </head>
      <body>
        ${app}
      </body>
    </html>`);
});

app.use(`/${vendor.prefix}`, express.static(vendor.root));
app.use(express.static(root));

app.listen(3000);
