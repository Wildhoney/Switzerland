export interface GeneratorSchema {
  name: string;
  directory: string;
}

export type NormalizedSchema = GeneratorSchema & {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  version: string;
};
