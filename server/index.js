const express = require('express');
const app = express();
const cors = require('cors');
const httpServer = require('http').createServer(app);

const Translate = require('./routes/main.js')

app.use(cors())
app.use(express.json())
app.use('/', Translate)

const App = async () => {
    try {

        httpServer.listen(5000, () => console.log(`server listening on 5000`))
    } catch(e){
        console.log(e)
    }
}
App()