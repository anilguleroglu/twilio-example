var axios = require('axios').default;
var cors = require('cors');
var express = require('express');
var querystring = require('querystring');

const app = express()
app.use(express.json());

const app = express();
app.use(cors({ origin: ['http://localhost:8080', 'https://crm.dev.fowapps.com'] }));

const port = 3000

app.get('/calls', async (req, res) => {
    var response = await axios.get("https://api.twilio.com/2010-04-01/Accounts/" + req.headers.accountsid + "/Calls.json?To=" + req.query.To, {
        auth: {
            username: req.headers.username,
            password: req.headers.password
        }
    })
    res.json(response.data);
})

app.post('/calls', async (req, res) => {
    const client = require('twilio')(req.headers.accountsid, req.headers.password);
    var message = req.body.message || "Hello World";
    var response = await client.calls.create({
        twiml: '<Response><Say>'+message+'</Say></Response>',
        to: req.body.to,
        from: req.body.from
      })

    res.json(response);
})

app.post('/messages', async (req, res) => {
    const client = require('twilio')(req.headers.accountsid, req.headers.password);
    var message = req.body.message || "Hello World";
    var response = await client.messages.create({
        body:req.body.message || "Hello World",
        to: req.body.to,
        from: req.body.from
      })

    res.json(response);
})

app.get('/messages', async (req, res) => {
    var response = await axios.get("https://api.twilio.com/2010-04-01/Accounts/" + req.headers.accountsid + "/Messages.json?To=" + req.query.To, {
        auth: {
            username: req.headers.username,
            password: req.headers.password
        }
    })
    res.json(response.data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

