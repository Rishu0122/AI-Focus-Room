const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateSubtasks = async (goal) => {

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",

        contents: `
            Break the following productivity goal into 4-6
            clear and actionable subtasks.

            Goal: ${goal}
        `,

        config: {
            responseMimeType: "application/json",

            responseJsonSchema: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string"
                        },
                        completed: {
                            type: "boolean"
                        }
                    },
                    required: ["title", "completed"]
                }
            }
        }
    });

    const subtasks = JSON.parse(response.text);

    return subtasks;
};

module.exports = generateSubtasks