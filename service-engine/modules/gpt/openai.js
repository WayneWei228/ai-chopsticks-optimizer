const {Configuration, OpenAIApi} = require("openai");

const createSingleChat = async (msg) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
        model: "GPT-4",
        messages: [{
            role: "user", content: msg
        }],
    });
    const response = chatCompletion.data.choices[0].message
    console.log(response);
    return response
};

module.exports = {
    createSingleChat
}