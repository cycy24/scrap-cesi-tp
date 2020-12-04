const scraping = require("./scrap");
const express = require('express')
const {getPlanning} = require("./api_cesi");
const app = express()
const port = 3000
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const daysNumber = [{day:"Lundi",number : 1},{day:"Mardi",number : 2},{day:"Mercredi",number : 3},{day:"Jeudi",number : 4},{day:"Vendredi",number : 5},{day:"Samedi",number : 6},{day:"Dimanche",number : 0}];


app.get('/', (req, res) => {
    scraping.scrap().then(async r => {

        let tableauLong = [...Array(8).keys()];

        const reducer = (accumulator, currentValue) => {
  
            let newMonday = new Date();
            let newSunday = new Date();

            newMonday.setDate(getMondayDate().getDate()+(currentValue*7));
            newSunday.setDate(getSundayFrMonday().getDate()+(currentValue*7));

            accumulator.push({monday: newMonday, sunday: newSunday});
            
            return accumulator;
        };

        console.log(tableauLong.reduce(reducer,[]));


        let mondayDate = getMondayDate();
        console.log("scrap succes date", mondayDate, getSundayFrMonday() );
        /*console.log([...Array(5).keys()].map(x =>{
            x = x*1;
            return x;
        })
        );*/
        const truc = await getPlanning(r.JSESSIONID, r.SERVERID, "2020-11-30", "2021-02-06");
        console.log("scrap succes", truc);

        res.send(truc);
    }).catch(x => console.log(x));

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function getMondayDate(){
    let today = new Date();
    let monday = new Date();
    let diffTodayMonday;
    let numJour = today.getDay();

    diffTodayMonday = numJour === 0 ? 6 : numJour - 1;

    monday.setDate(today.getDate()-diffTodayMonday);

    return monday;
}

function getSundayFrMonday(){
   /* let sunday = new Date();
    sunday.setDate(mondayDate.getDate()+6)
    return sunday;*/

    let today = new Date();
    let sunday = new Date();
    let diffTodaySunday;
    let numJour = today.getDay();

    diffTodaySunday = numJour === 0 ? 0 : 7 - numJour;

    sunday.setDate(today.getDate()+diffTodaySunday);

    return sunday;
}