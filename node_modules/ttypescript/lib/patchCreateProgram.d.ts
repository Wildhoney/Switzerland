import * as ts from 'typescript';
import { Diagnostic } from 'typescript/lib/tsserverlibrary';
declare module 'typescript' {
    interface CreateProgramOptions {
        rootNames: ReadonlyArray<string>;
        options: ts.CompilerOptions;
        projectReferences?: ReadonlyArray<ts.ProjectReference>;
        host?: ts.CompilerHost;
        oldProgram?: ts.Program;
        configFileParsingDiagnostics?: ReadonlyArray<ts.Diagnostic>;
    }
    interface ProjectReference {
        path: string;
        originalPath?: string;
        prepend?: boolean;
        circular?: boolean;
    }
}
export declare const transformerErrors: WeakMap<ts.Program, Diagnostic[]>;
export declare function addDiagnosticFactory(program: ts.Program): (diag: ts.Diagnostic) => void;
export declare function patchCreateProgram(tsm: typeof ts, forceReadConfig?: boolean, projectDir?: string): typeof ts;
