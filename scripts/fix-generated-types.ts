import * as fs from 'fs';

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

fixGqlImport();
