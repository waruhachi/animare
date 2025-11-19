import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://graphql.anilist.co',
	documents: ['src/**/*.{ts,tsx}'],
	ignoreNoDocuments: true,
	generates: {
		'./src/graphql/': {
			preset: 'client',
			config: {
				documentMode: 'string',
			},
		},
		'./src/graphql/anilist.graphql': {
			plugins: ['schema-ast'],
			config: {
				includeDirectives: true,
			},
		},
	},
};

export default config;
