function handleSubmit(event) {
    event.preventDefault();

    const promptSelect = document.getElementById('prompt');
    const prompt = promptSelect.value;
    const inputTextarea = document.getElementById('input');

    // Get the value of the input <textarea> element
    const input = inputTextarea.value;

    console.log('Prompt:', prompt);
    console.log('Input:', input);

    let model;
    let params;

    if (prompt === 'Summarization') {
        model = 'text-davinci-002';
        params = {
            "prompt": input,
            "temperature": 0.1,
            "max_tokens": 200,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        };
    } else if (prompt === 'Customer Satisfaction') {
        model = 'text-davinci-002';
        params = {
            "prompt": input,
            "temperature": 0.1,
            "max_tokens": 200,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "logprobs": 10
        };
    } else if (prompt === 'Data Analysis') {
        model = 'text-davinci-002';
        params = {
            "prompt": input,
            "temperature": 0.1,
            "max_tokens": 200,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "logprobs": 10
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
        // Parse the response from OpenAI API and update the <textarea> element
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.error('Error: Empty response');
                return;
            }

            console.log('Response:', data);
            const responseText = data.choices[0].text;

            // Select the <textarea> element and set its value to the response text
            const responseTextarea = document.getElementById('response');
            responseTextarea.value = responseText;
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

document.getElementById('submit').addEventListener('click', handleSubmit);


const promptSelect = document.getElementById('prompt');
promptSelect.addEventListener('change', () => {
    const inputTextarea = document.getElementById('input');
    const responseTextarea = document.getElementById('response');
    inputTextarea.value = '';
    responseTextarea.value = '';
});

const setPretext = () => {
    const promptSelect = document.getElementById('prompt');
    const inputTextarea = document.getElementById('input');
    const prompt = promptSelect.value;
    let pretext = '';
    if (prompt === 'Summarization') {
        pretext = 'Summarise the following text with bullet points: ';
    } else if (prompt === 'Customer Satisfaction') {
        pretext = 'Classify customer emotion in Satisfied or Unsatisfied: ';
    } else if (prompt === 'Data Analysis') {
        pretext = 'Analyse the Dataset and give summary in bullet points: ';
    }
    inputTextarea.value = pretext;
    inputTextarea.focus();

    // Move the cursor to the end of the pre-filled text
    const len = inputTextarea.value.length;
    inputTextarea.setSelectionRange(len, len);
    promptSelect.addEventListener('change', () => {
        const promptSelect = document.getElementById('prompt');
        const inputTextarea = document.getElementById('input');
        inputTextarea.value = '';
        setPretext();;
    });

};
setPretext();
