/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SEARCH_BY_NAME_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
