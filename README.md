![banner](https://github.com/user-attachments/assets/9499749f-27ce-4421-a2de-8954d248fa15)
# 🌍 Dictionary API Client
A minimal, fetch-based JavaScript & TypeScript client for the free [Dictionary API](https://dictionaryapi.dev/) that uses native fetch, works in Node.js (18+) and modern browsers and supports javascript and typescript.

### 📦 Installation
```console
npm install dictionary-api-client
```
Note: If you are using Node.js, ensure your project supports ES modules.

### ✨ Features
1. Lookup word definitions using a public dictionary API
2. Automatically encodes words with spaces or special characters
3. Clean success / failure response contract

### Example Usage
```javascript
import { getDefinitionFor } from "dictionary-api-client";
const res = await getDefinitionFor({ word: "white" });
console.log(res);
```
1. Success Response Schema
```javascript
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": [
    {
      "word": "white",
      "phonetic": "/waɪt/",
      "phonetics": [
        {
          "text": "/waɪt/",
          "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/white-uk.mp3"
        }
      ],
      "meanings": [
        {
          "partOfSpeech": "noun",
          "definitions": [
            {
              "definition": "The color of snow or milk; light containing all visible wavelengths."
            }
          ]
        },
        {
          "partOfSpeech": "adjective",
          "definitions": [
            {
              "definition": "Bright and colourless; reflecting equal quantities of visible light.",
              "example": "Write in black ink on white paper."
            }
          ]
        }
      ]
    }
  ]
}
```

2. Error Response Schema
```javascript
{
  "code":"api-fail",
  "message":"Not Found",
  "payload": {
    "title":"No Definitions Found",
    "message":"Sorry pal, we couldn't find definitions for the word you were looking for.",
    "resolution":"You can try the search again at later time or head to the web instead."
  }
}
```

### Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.
