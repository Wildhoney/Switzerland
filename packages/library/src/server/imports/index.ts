import { Project } from "ts-morph";
import { Generator } from "@jspm/generator";
import { Provider } from "./types.js";

const excludeDependencies = ["switzerland"];

export async function imports(
  path: string,
  provider: Provider = "jspm.io"
): Promise<string> {
  const imports = new Set<string>();

  const project = new Project({ useInMemoryFileSystem: false });
  const generator = new Generator({
    env: ["production", "browser", "module"],
    defaultProvider: provider,
  });

  const matcher = `${path}/**/*.{ts,tsx}`;
  project.addSourceFilesAtPaths(matcher);

  for (const source of project.getSourceFiles()) {
    for (const importDeclaration of source.getImportDeclarations()) {
      if (!importDeclaration.isModuleSpecifierRelative()) {
        const importName = importDeclaration
          .getModuleSpecifier()
          .getLiteralText();
        if (!excludeDependencies.includes(importName)) {
          imports.add(importName);
        }
      }
    }
  }

  await Promise.all([
    generator.install("preact"),
    generator.install("preact/compat"),
    generator.install("preact/hooks"),
    generator.install("preact/jsx-runtime"),
  ]);

  for (const importName of imports) {
    await generator.install(importName);
  }

  return JSON.stringify(
    {
      imports: {
        switzerland: "/client/library/dist/index.client.js",
        ...generator.getMap().imports,
      },
    },
    null,
    4
  );
}
