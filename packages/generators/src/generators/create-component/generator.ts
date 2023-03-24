import pkg from "../../../../../package.json";
import type { GeneratorSchema, NormalizedSchema } from "./types.js";
import {
  Tree,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
} from "@nrwl/devkit";
import path from "node:path";

function normalizeOptions(
  tree: Tree,
  options: GeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(/\//g, "-");
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    version: pkg.version,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema): void {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: "",
  };

  generateFiles(
    tree,
    path.join(__dirname, "files"),
    path.join(options.directory, names(options.name).fileName),
    templateOptions
  );
}

export default async function runGenerator(
  tree: Tree,
  options: GeneratorSchema
): Promise<void> {
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
