import {ChatGPTUnofficialProxyAPI} from 'chatgpt'
import {OpenAiService} from './tokenService'

class ChatGptService {
    async makeGptCall(msg: string) {
        let openAiAuthenticator = new OpenAiService();
        let temporaryToken = openAiAuthenticator.getOpenAiToken(process.env.OPEN_AI_ACCOUNT, process.env.OPEN_AI_PASSWORD)

        const api = new ChatGPTUnofficialProxyAPI({
            accessToken: temporaryToken,
            apiReverseProxyUrl: process.env.API_REVERSEPROXY_URL
        })

        const res = await api.sendMessage(msg)
        return res.text
    }
}

export {ChatGptService};