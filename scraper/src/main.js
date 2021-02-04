const scraping = require("./scrap");
const express = require('express')
const CronJob = require('cron').CronJob;
const cache = require('./cache')
const {getPlanning} = require("./api_cesi");
const app = express()
const port = 3000
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const getCookies = function (){
    scraping.scrap().then(data => {
        console.log("les cookies !!!")
        cache.cookies = data
    })
}

getCookies()
const job =  new CronJob('0 * * * * *', getCookies, null, true, 'Europe/Paris', true);
job.start()

app.get('/', async (req, res) => {
    if (cache.cookies === undefined) {
        res.status(400).send({
            message: 'Waiting for scraping'
        });
        return
    }
    let tableauLong = [...Array(8).keys()];

    const reducer = (accumulator, currentValue) => {

        let newMonday = new Date();
        let newSunday = new Date();

        newMonday.setDate(getMondayDate().getDate() + (currentValue * 7));
        newSunday.setDate(getSundayFrMonday().getDate() + (currentValue * 7));

        accumulator.push({monday: newMonday, sunday: newSunday});
        return accumulator;
    };

    const listSemaine = tableauLong.reduce(reducer, []);


    const listPlanning = await Promise.all(listSemaine.map(async semaine => {
        return await getPlanning(cache.cookies.JSESSIONID, cache.cookies.SERVERID, formatDateFR(semaine.monday), formatDateFR(semaine.sunday));
    }));

    res.send(listPlanning);


})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function formatDateFR(dateIn) {
    return new Date(dateIn).toLocaleString('en-us', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
}

function getMondayDate() {
    let today = new Date();
    let monday = new Date();
    let diffTodayMonday;
    let numJour = today.getDay();

    diffTodayMonday = numJour === 0 ? 6 : numJour - 1;

    monday.setDate(today.getDate() - diffTodayMonday);

    return monday;
}

function getSundayFrMonday() {
    let today = new Date();
    let sunday = new Date();
    let diffTodaySunday;
    let numJour = today.getDay();

    diffTodaySunday = numJour === 0 ? 0 : 7 - numJour;

    sunday.setDate(today.getDate() + diffTodaySunday);

    return sunday;
}
