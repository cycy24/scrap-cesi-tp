const scraping = require("./scrap");
const express = require('express')
const app = express()
const port = 3000




app.get('/', (req, res) => {
    scraping.scrap().then(r => {
        res.send(r);
    });

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})