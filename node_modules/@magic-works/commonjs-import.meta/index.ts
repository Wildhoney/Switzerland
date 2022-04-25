import * as ts from 'typescript'
export default function () {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            if (ctx.getCompilerOptions().module !== ts.ModuleKind.CommonJS) return sourceFile
            const [meta, dec] = createImportMeta()
            function visitor(node: ts.Node): ts.Node {
                if (isImportMeta(node)) return meta
                return ts.visitEachChild(node, visitor, ctx)
            }
            sourceFile = ts.visitEachChild(sourceFile, visitor, ctx)
            sourceFile = ts.updateSourceFileNode(
                sourceFile,
                ([dec, nullPrototype(meta)] as ts.Statement[]).concat(sourceFile.statements),
                sourceFile.isDeclarationFile,
                sourceFile.referencedFiles,
                sourceFile.typeReferenceDirectives,
                sourceFile.hasNoDefaultLib,
                sourceFile.libReferenceDirectives
            )
            return sourceFile
        }
    }
}
// const __meta = { url: require('url').pathToFileURL(__filename).href }
function createImportMeta() {
    const identifier = ts.createFileLevelUniqueName('__meta')
    const urlModule = ts.createCall(ts.createIdentifier('require'), undefined, [ts.createStringLiteral('url')])
    const pathToFileURL = ts.createPropertyAccess(urlModule, ts.createIdentifier('pathToFileURL'))
    const normalizedFileName = ts.createPropertyAccess(
        ts.createCall(pathToFileURL, undefined, [ts.createIdentifier('__filename')]),
        ts.createIdentifier('href')
    )
    const metaObjectLiteral = ts.createObjectLiteral(
        [ts.createPropertyAssignment(ts.createIdentifier('url'), normalizedFileName)],
        false
    )
    const importMeta = ts.createVariableStatement(
        undefined,
        ts.createVariableDeclarationList(
            [ts.createVariableDeclaration(identifier, undefined, metaObjectLiteral)],
            ts.NodeFlags.Const
        )
    )
    return [identifier, importMeta] as const
}
function nullPrototype(node: ts.Identifier) {
    return ts.createExpressionStatement(
        ts.createCall(
            ts.createPropertyAccess(ts.createIdentifier('Object'), ts.createIdentifier('setPrototypeOf')),
            undefined,
            [node, ts.createNull()]
        )
    )
}
function isImportMeta(node: ts.Node): node is ts.MetaProperty {
    return ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword && node.name.text === 'meta'
}
