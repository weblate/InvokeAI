import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'http://127.0.0.1:9090/openapi.json',
  apiFile: './src/app/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/app/invokeApi.ts',
  exportName: 'invokeApi',
  hooks: true,
};

export default config;
