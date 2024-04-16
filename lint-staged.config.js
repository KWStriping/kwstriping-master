export default {
  '*.{js,ts,tsx}': [() => 'eslint --fix'],
  '*.{css,md,json}': 'prettier --write',
  '**/nginx/**/*.conf': ['nginxbeautifier -s 4', 'nginx-linter --include'],
  '*.py': [
    'black',
    // 'ruff check --fix',
  ],
};

//   - repo: https://github.com/pre-commit/mirrors-mypy
//     rev: v0.991
//     hooks:
//       - id: mypy
//         language: system
//         exclude: tests/

//   - repo: local
//     hooks:
//       - id: migrations-check
//         language: system
//         name: Check for uncreated migrations.
//         entry: sh -c "./manage.py makemigrations --check --dry-run"
//         files: "models\\.py$"
//         stages: [commit]

//   - repo: local
//     hooks:
//       - id: gql-schema-check
//         language: system
//         name: Check GraphQL schema is up to date.
//         entry: sh -c "./manage.py get_graphql_schema | diff tempo/api/generated/schema.graphql -"
//         stages: [commit]

//   - repo: https://github.com/pycqa/flake8
//     rev: 6.0.0
//     hooks:
//       - id: flake8
//         additional_dependencies: [Flake8-pyproject]
