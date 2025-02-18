import * as fs from 'fs';
import * as ts from 'typescript';

const fixGqlImport = () => {
  // this will be the generated file from codegen
  const [, , file] = process.argv;
  if (!file) throw new Error('No file specified');
  const contents = fs.readFileSync(file, 'utf-8');
  fs.writeFileSync(
    file,
    contents.replace("import gql from 'graphql-tag'", "import { graphql as gql } from './gql'")
  );
};

const resolveTypeConflicts = () => {
  // this will be the generated file from codegen
  const [, , file] = process.argv;

  // we track how often we have seen a given variable name here
  const collisionsCounter: Record<string, number> = {};

  const transformerFactory: ts.TransformerFactory<ts.Node> = (context) => (rootNode) => {
    function visitTypeAliasDeclaration(node: ts.Node): ts.Node {
      // recurse through the Typescript AST of the file
      node = ts.visitEachChild(node, visitTypeAliasDeclaration, context);

      /**
       *
       * short-circuit logic to prevent handling nodes we don't
       * care about. This might need to be adjusted based on what
       * you need to de-dupe. In my case only types were being duped
       */
      if (!ts.isTypeAliasDeclaration(node)) {
        return node;
      }

      /**
       * you may not need to cast to lowercase. In my case I had
       * name collisions that different cases which screwed up a
       * later step
       */
      const nameInLowerCase = node.name.text.toLowerCase();
      const suffix = collisionsCounter[nameInLowerCase] ?? '';
      const encounterCount = collisionsCounter[nameInLowerCase];
      collisionsCounter[nameInLowerCase] =
        typeof encounterCount === 'undefined' ? 1 : encounterCount + 1;
      return context.factory.createTypeAliasDeclaration(
        node.modifiers,
        `${node.name.text}${suffix}`,
        node.typeParameters,
        node.type
      );
    }
    return ts.visitNode(rootNode, visitTypeAliasDeclaration);
  };

  const program = ts.createProgram([file], {});

  const sourceFile = program.getSourceFile(file);
  const transformationResult = ts.transform(sourceFile, [transformerFactory]);
  const transformedSourceFile = transformationResult.transformed[0];
  const printer = ts.createPrinter();

  // the deduped code is here as a string
  const result = printer.printNode(ts.EmitHint.Unspecified, transformedSourceFile, undefined);
  fs.writeFileSync(file, result, {});
};

fixGqlImport();
