const transcribe = async (req, res) => {
    // const lang = JSON.parse(req.body.json).lang;
    // const audioBuffer = req.file;
    const { audioBuffer, lang} = req.body;

    const audioBufferBase64 = Buffer.from(audioBuffer, 'base64');

    const fileName = "test.mp3";
    const folderName = `./audio/${fileName}`

    const writableStream = fs.createWriteStream(folderName); // Replace with your desired file path and extension
    writableStream.write(audioBufferBase64);

    const readStream = fs.createReadStream(folderName);

    readStream.on('data', (data) => {
        console.log('Read stream data:', data);
    });

    try {
        const whisperRes = await transcribeAudio(readStream);

        const chatResponse = whisperRes.data.text;
        console.log(chatResponse)

        res.status(200).json({ chatResponse: chatResponse });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ message: error });
    }
}



const transcribeAudio = async (file) => {
    let data = new FormData();
  
    data.append("file", fs.createReadStream(file));
    data.append("model", "whisper-1");
    data.append("language", "en");
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/audio/transcriptions",
      headers: {
        Authorization:
          `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "multipart/form-data",
        ...data.getHeaders(),
      },
      data: data,
    };
  
    try {
      const response = await axios.request(config);
      const data = response.data;
        
      console.log(data);
      return { data };
    } catch (error) {
      console.log(error);
      //return {};
    }
  };