import * as fs from 'fs';
import type {
  ArrowFunctionExpression,
  BlockStatement,
  Identifier,
  Node,
} from '@typescript-eslint/types/dist/generated/ast-spec';
import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';

// https://typescript-eslint.io/custom-rules/
// https://typescript-eslint.io/custom-rules/#ast-extensions

type RuleContext = TSESLint.RuleContext<string, never[]>;

function getAllVarsInScope(context: RuleContext) {
  let scope = context.getScope();
  // const sourceCode = context.getSourceCode();
  const scopeUpperBound = 'module';
  let variables = scope.variables.map((v) => v.name);
  while (scope.upper && scope.type !== scopeUpperBound) {
    scope = scope.upper;
    variables = [...variables, ...scope.variables.map((v) => v.name)];
  }
  return variables;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const filename = context.getFilename();
    if (filename.includes('node_modules') || filename.includes('rules')) return {};
    return {
      // eslint-disable-next-line @ts/naming-convention
      Identifier(node) {
        dealWithNode(node, context);
      },
    };
  },
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    messages: {
      missingStyles: 'Missing styles import or declaration',
    },
  },
  defaultOptions: [],
});

function dealWithNode(node: Identifier | Node, context: RuleContext) {
  const identifier = (node as Identifier).name;
  if (identifier !== 'styles') return;
  const variables = getAllVarsInScope(context);
  if (variables.includes(identifier)) return;
  if (variables.includes('useStyles')) {
    const declaration = 'const styles = useStyles();';
    while (node.parent) {
      node = node.parent;
      if (node.type === 'ArrowFunctionExpression' && (node as ArrowFunctionExpression).body) {
        const body = (node as ArrowFunctionExpression).body as BlockStatement;
        if (!body.body?.length) return;
        const insertionRange = body.body[0]!.range;
        context.report({
          node,
          messageId: 'missingStyles',
          fix: (fixer) => fixer.insertTextAfterRange(insertionRange, '\n' + declaration),
        });
      }
    }
  } else {
    const filename = context.getFilename();
    const cssModulePath = filename.replace(/(\w+).tsx/, '$1.module.css');
    if (fs.existsSync(cssModulePath)) {
      const cssModule = cssModulePath.split('/').pop();
      const importStatement = `import styles from "./${cssModule}";`;
      context.report({
        node,
        messageId: 'missingStyles',
        fix: (fixer) => fixer.insertTextBeforeRange([0, 0], importStatement + '\n'),
      });
    }
  }
}
