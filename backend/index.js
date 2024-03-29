const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

let BB = { "id": 1, name: "Jack" };

app.get('/fake', (req, res) => {
    res.send(BB);
});

app.post( '/fake', (req,res) => {
    data = req.body
    BB = {...BB, ...data}
    console.log(data)
    res.send("Data added successfully!")
} )

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Listening at ${port}`));
