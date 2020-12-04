const scraping = require("./scrap");
const express = require('express')
const {getPlanning} = require("./api_cesi");
const app = express()
const port = 3000
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0



app.get('/', (req, res) => {
    scraping.scrap().then(async r => {
        const truc = await getPlanning(r.JSESSIONID, r.SERVERID, "2020-11-30", "2021-02-06");
        console.log("scrap succes", truc);

        res.send(truc);
    }).catch(x => console.log(x));

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})