function handleSubmit(event) {
    event.preventDefault();

    const prompt = document.querySelector('input[name="prompt"]:checked').value;
    const input = document.getElementById('input-text').value;

    console.log('Prompt:', prompt);
    console.log('Input:', input);

    let model;
    let params;

    if (prompt === 'summarize') {
        model = 'text-davinci-002';
        params = {
            "prompt":"Summarise the text in bullet points" + input,
            "temperature": 0.5,
            "max_tokens": 60,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        };
    } else if (prompt === 'label') {
        model = 'davinci';
        params = {
            "model": model,
            "prompt": input,
            "temperature": 0.7,
            "max_tokens": 50,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "logprobs": 10
        };
    } else if (prompt === 'analyze') {
        model = 'data-davinci-002';
        params = {
            "query": input,
            "model": model
        };
    }

    const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer sk-`
    };

    console.log('Request Headers:', requestHeaders);
    console.log('Model:', model);
    console.log('Params:', params);

    fetch('https://api.openai.com/v1/engines/' + model + '/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            const responseText = data.choices[0].text;
            document.getElementById('response-text').value = responseText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('submit-btn').addEventListener('click', handleSubmit);



/*function handleSubmit(event) {
    event.preventDefault();

    const prompt = document.querySelector('input[name="prompt"]:checked').value;
    const input = document.getElementById('input-text').value;

    let model;
    let params;

    if (prompt === 'summarize') {
        model = 'text-davinci-002';
        params = {
            "prompt": "Summarize the following text with bullet points:\n" + input,
            "temperature": 0.5,
            "max_tokens": 60,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        };
    } else if (prompt === 'label') {
        model = 'davinci';
        params = {
            "model": model,
            "prompt": "Label the following text:\n" + input,
            "temperature": 0.7,
            "max_tokens": 50,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "logprobs": 10
        };
    } else if (prompt === 'data_analysis') {
        model = 'data-davinci-002';
        params = {
            "query": "Analyse the following data:" + input,
            "model": model
        };
    }

    const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
    };

    console.log('Request Headers:', requestHeaders);
    console.log('Model:', model);
    console.log('Params:', params);
    

    fetch('https://api.openai.com/v1/engines/' + model + '/completions', {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(params)
    })
        .then(response => response.json())
        .then(data => {
            const responseText = data.choices[0].text;
            document.getElementById('response-text').value = responseText;
        })
        
        .then(response => {
            console.log('Response received from OpenAI API.');
            return response.json();
        })
        .then(data => {
            console.log('Parsing response from OpenAI API.');
            const responseText = data.choices[0].text;
            document.getElementById('response-text').value = responseText;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
    
*/

/*const openaiApiKey = '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'; // replace with your OpenAI API key

const promptSelect = document.getElementById("prompt-select");
const inputTextArea = document.getElementById("input-text");
const responseTextArea = document.getElementById("response-text");
const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener('click', () => {
    const prompt = promptSelect.value;
    const inputText = inputTextArea.value.trim();

    if (prompt === 'summarize') {
        // summarize the text with bullet points
        const request = {
            "model": "text-davinci-002",
            "prompt": "Summarize the following text with bullet points:\n" + inputText,
            "temperature": 0,
            "max_tokens": 60,
            "n": 5,
            "stop": "\n"
        };
        generateOpenAIResponse(request);
    } else if (prompt === 'label') {
        // label the text
        const request = {
            "model": "text-davinci-002",
            "prompt": "Label the following text:\n" + inputText,
            "temperature": 0,
            "max_tokens": 60,
            "n": 1
        };
        generateOpenAIResponse(request);
    } else if (prompt === 'analyze') {
        // analyze the data
        const request = {
            "model": "data-davinci-002",
            "prompt": "Analyse the following data:"+inputText,
            "temperature": 0,
            "max_tokens": 60,
            "n": 1
        };
        generateOpenAIResponse(request);
    }
});

function generateOpenAIResponse(request) {
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + openaiApiKey
        },
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then(data => {
            const openaiResponse = data.choices[0].text;
            responseTextArea.value = openaiResponse;
        })
        .catch(error => console.error(error));
}
*/
