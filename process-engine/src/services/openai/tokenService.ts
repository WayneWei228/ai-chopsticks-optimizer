import * as process from "process";

class OpenAiService {
    getOpenAiToken(account: string, password: string): string {
//        const chatGptAuthTokenService = new ChatGPTAuthTokenService(
//            account,
//            password
//        );
//        let token = await chatGptAuthTokenService.getToken();
//        console.log(token);
//
//        token = await chatGptAuthTokenService.refreshToken();
//        console.log(token);
        return process.env.OPENAI_ACCESS_TOKEN
    }
}

export {OpenAiService};