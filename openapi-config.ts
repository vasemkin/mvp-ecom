import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
	schemaFile: './common/swagger.json',
	apiFile: './apps/app/src/store/emptyApi.ts',
	apiImport: 'emptySplitApi',
	outputFile: './apps/app/src/store/api.ts',
	exportName: 'api',
	hooks: true,
	flattenArg: false,
}

export default config
