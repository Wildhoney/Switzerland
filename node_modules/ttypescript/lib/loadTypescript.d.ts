import * as TS from 'typescript';
declare type ts = typeof TS;
export declare function loadTypeScript(filename: string, { folder, forceConfigLoad }?: {
    folder?: string;
    forceConfigLoad?: boolean;
}): ts;
export {};
