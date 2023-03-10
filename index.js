const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const promptInput = document.getElementById('prompt');
    const completionInput = document.getElementById('completion');
    const responseOutput = document.getElementById('response');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const prompt = promptInput.value;
            const completion = completionInput.value;
            const response = await summarize(prompt, completion);
            responseOutput.value = response;
        });
    }
});

async function summarize(prompt, completion) {
    const params = {
        prompt,
        max_tokens: 1024,
        n: 1,
        stop: completion,
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
        },
        body: JSON.stringify(params),
    });

    const data = await response.json();
    const text = data.choices[0].text.trim();
    return text;
}

const form = document.querySelector('form');
const promptInput = document.getElementById('prompt');
const completionInput = document.getElementById('completion');
const responseOutput = document.getElementById('response');
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const prompt = promptInput.value;
        const completion = completionInput.value;
        const response = await summarize(prompt, completion);
        responseOutput.value = response;
    });
}


