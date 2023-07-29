declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPENAI_ACCESS_TOKEN: string;
            PORT?: string
            OPEN_AI_ACCOUNT: string;
            OPEN_AI_PASSWORD: string;
            API_REVERSEPROXY_URL: string;
            NUTRITION_API_URL: string;
            NUTRITION_API_KEY: string;
        }
    }
}

export {}