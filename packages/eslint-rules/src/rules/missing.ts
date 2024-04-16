/* eslint-disable ts/naming-convention */
import type {
  ArrowFunctionExpression,
  BlockStatement,
  Identifier,
  Node,
  Range,
} from '@typescript-eslint/types/dist/generated/ast-spec';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import type { TSESLint } from '@typescript-eslint/utils';
import { pascalCase } from 'change-case';

// https://typescript-eslint.io/custom-rules/
// https://typescript-eslint.io/custom-rules/#ast-extensions
type RuleContext = TSESLint.RuleContext<string, never[]>;

const IDENTIFIER_IMPORT_MAP = {
  createContext: "import { createContext } from 'react';",
  FC: "import type { FC } from 'react';",
  forwardRef: "import { forwardRef } from 'react';",
  Fragment: "import { Fragment } from 'react';",
  ReactNode: "import type { ReactNode } from 'react';",
  Trans: "import { Trans } from '@core/i18n';",
  useCallback: "import { useCallback } from 'react';",
  useContext: "import { useContext } from 'react';",
  useEffect: "import { useEffect } from 'react';",
  useMemo: "import { useMemo } from 'react';",
  useMutation: "import { useMutation } from '@core/urql/hooks/useMutation';",
  useQuery: "import { useQuery } from '@core/urql/hooks/useQuery';",
  useRef: "import { useRef } from 'react';",
  useRouter: "import { useRouter } from 'next/router';",
  useState: "import { useState } from 'react';",
  useTranslation: "import { useTranslation } from '@core/i18n';",
};

const IDENTIFIER_DECLARATION_MAP = {
  t: 'const { t } = useTranslation();',
};

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    const filename = context.getFilename();
    if (filename.includes('node_modules') || filename.includes('rules')) return {};
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier) return;
        const firstLetter = node.name.name.toString().charAt(0);
        if (firstLetter === firstLetter.toLowerCase()) return;
        dealWithNode(node.name, context);
      },
      Identifier(node) {
        dealWithNode(node, context);
      },
      TSEnumMember(node) {
        if (!node.id.name) return;
        if (/^[A-Z_]+$/.test(node.id.name)) {
          context.report({
            node,
            messageId: 'wrongEnumMember',
            fix: (fixer) => fixer.replaceTextRange(node.id.range, pascalCase(node.id.name)),
          });
        }
      },
      MemberExpression(node) {
        if (!node.object.name) return;
        if (/^[A-Z_]+$/.test(node.property.name)) {
          context.report({
            node,
            messageId: 'wrongEnumMember',
            fix: (fixer) =>
              fixer.replaceTextRange(node.property.range, pascalCase(node.property.name)),
          });
        }
      },
    };
  },
  meta: {
    type: 'problem',
    fixable: 'code',
    schema: [],
    messages: {
      missingImport: 'Missing import',
      missingDeclaration: 'Missing declaration',
      wrongEnumMember: 'Broken enum member',
    },
  },
  defaultOptions: [],
});

const isKnown = (identifier: string) => {
  return Object.keys({ ...IDENTIFIER_IMPORT_MAP, ...IDENTIFIER_DECLARATION_MAP }).includes(
    identifier
  );
};

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

function dealWithNode(node: Identifier | Node, context: RuleContext) {
  const identifier = (node as Identifier).name;
  if (!isKnown(identifier)) return;
  // Don't be tricked by re-exports or member expressions like `i18n.t`:
  if (['MemberExpression', 'ExportSpecifier'].includes(node.parent?.type as string)) return;
  const variables = getAllVarsInScope(context);
  if (variables.includes(identifier)) return;
  // console.log(node);
  if (Object.keys(IDENTIFIER_IMPORT_MAP).includes(identifier)) {
    dealWithMissingImport(node, context);
  } else if (Object.keys(IDENTIFIER_DECLARATION_MAP).includes(identifier)) {
    dealWithMissingDeclaration(node, context);
  }
}

function dealWithMissingImport(node: Identifier | Node, context: RuleContext) {
  const identifier = (node as Identifier).name;
  const importStatement = IDENTIFIER_IMPORT_MAP[identifier as keyof typeof IDENTIFIER_IMPORT_MAP];
  if (!importStatement) return;
  context.report({
    node,
    messageId: 'missingImport',
    fix: (fixer) => fixer.insertTextBeforeRange([0, 0], importStatement + '\n'),
  });
}

function dealWithMissingDeclaration(node: Identifier | Node, context: RuleContext) {
  const identifier = (node as Identifier).name;
  let insertionRange: Range | undefined = undefined;
  const declaration =
    IDENTIFIER_DECLARATION_MAP[identifier as keyof typeof IDENTIFIER_DECLARATION_MAP];
  if (!declaration) return;
  let ancestor = node;
  while (ancestor.parent) {
    ancestor = ancestor.parent;
    if (ancestor.type === 'ArrowFunctionExpression') {
      const body = (ancestor as ArrowFunctionExpression).body as BlockStatement;
      if (body.body && body.body[0]) {
        insertionRange = body.body[0].range;
        break;
      }
    }
  }
  if (insertionRange) {
    context.report({
      node,
      messageId: 'missingDeclaration',
      fix: (fixer) => {
        return fixer.insertTextAfterRange(insertionRange as Range, '\n' + declaration);
      },
    });
  }
}
