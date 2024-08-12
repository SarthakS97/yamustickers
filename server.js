const express = require('express');
const Replicate = require('replicate');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

app.post('/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        const input = {
            prompt: prompt,
            output_quality: 90
        };
        const output = await replicate.run("black-forest-labs/flux-schnell", { input });
        console.log(output);
        
        // Assuming the output is an array with the image URL as the first element
        res.send(output[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error generating image');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});