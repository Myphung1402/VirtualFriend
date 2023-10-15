import express from 'express'
import axios from 'axios'
import cors from 'cors'
import speech from '@google-cloud/speech';
import bodyParser from 'body-parser';
import fs from 'fs'
import OpenAI from 'openai';
import DID_API from './api.json' assert { type: 'json' };
import delay from 'delay';
import pkg from 'file-saver';
const { saveAs } = pkg;


const server = express()
const PORT = 3001

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server running on http://localhost:${PORT}`)
})


server.get('/speech', async (req, res) => {
    
    
    while (!fs.existsSync("../../../file.wav")) {

    }
    if (fs.existsSync("../../../file.wav")) {
        console.log("start")
        const client = new speech.SpeechClient();
        console.log("prepare")
        const filename = "../../../file.wav";
        console.log("read")
        const file = fs.readFileSync(filename);
        console.log("encode")
        const audioBytes = file.toString('base64');
        console.log("delete")
            fs.unlinkSync("../../../file.wav")
        
        const audio = {
            content: audioBytes,
        };
        const config = {
            model: "phone_call",
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
            enableSeparateRecognitionPerChannel: true,
            useEnhanced: true
        };
        const request = {
            audio: audio,
            config: config,
        };
        console.log("prepare to speech")
        const [response] = await client.recognize(request);
        console.log("response got")
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('.');
        console.log(`Transcription: ${transcription}`);
        

        const openai = new OpenAI({apiKey: "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"}); // defaults to process.env["OPENAI_API_KEY"]

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: transcription }],
            model: 'gpt-3.5-turbo',
        });

        console.log(chatCompletion.choices[0].message.content);
        const result = chatCompletion.choices[0].message.content
        axios.defaults.headers.common['Authorization'] = `Basic dGFvZGVvYmlldG1heTFAZ21haWwuY29t:t6Zt0vga4_pOYGQzyuuBc`;

        // const config1 = {
        //     headers:{
        //       Authorization: "Basic cGh1bmd2dWhhbmhteUBnbWFpbC5jb20:KFWI91QUiD8A4P2q2QOzC"
        //     }
        //   };
        let {data} = await axios.post("https://api.d-id.com/talks",{
            "source_url": "https://kottke.org/plus/misc/images/ai-faces-01.jpg",
            "script": {
                "type": "text",
                "input": result
            }
        })
        const id = data.id
        console.log(id)
        let status = false
        let data1
        while (!status) {
            data1 = await axios.get("https://api.d-id.com/talks/" + id)
            data = data1.data
            status = data.staus === "done"? true : false
            console.log(data)
            await delay(1000);
            if (data.result_url) {break;}

        }
        // let data1 = await axios.get("https://api.d-id.com/talks/" + id)
        // data = data1.data
        // console.log(data)
        const {result_url} = data

        console.log(result_url)
        saveAs(result_url, "video.mp4")
        res.json({url: result_url})
    } else {
        console.log("skipped")
        res.json({found:false})
    }
    

})

