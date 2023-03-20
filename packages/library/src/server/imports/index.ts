import { Args } from "./types.js";
import { Generator } from "@jspm/generator";
import findPackage from "find-file-up";
import fs from "node:fs";
import { Project } from "ts-morph";

export async function imports({
  path,
  provider = "jspm.io",
  excludeDependencies = [],
}: Args): Promise<string> {
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
          const pkg = await findPackage(
            `./node_modules/${importName}/package.json`,
            source.getDirectoryPath()
          );
          const version = pkg
            ? JSON.parse(fs.readFileSync(pkg, "utf-8")).version
            : null;
          imports.add(version ? `${importName}@${version}` : importName);
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

  return JSON.stringify(generator.getMap(), null, 4);
}
