require('dotenv').config({path: __dirname + '/../.env'});
const axios = require('axios');

const Discord = require('discord.js');
const client = new Discord.Client();

const daysNumber = [{day:"Lundi",number : 1},{day:"Mardi",number : 2},{day:"Mercredi",number : 3},{day:"Jeudi",number : 4},{day:"Vendredi",number : 5},{day:"Samedi",number : 6},{day:"Dimanche",number : 0}];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.content === '!cesi') {
        const response = await axios.get(`http://localhost:3000`);
        console.log(response.data[0][0]);


        msg.reply(formatPlanningData(response.data));
    }
});

console.log(process.env);

client.login(process.env.BOT_TOKEN);


function formatPlanningData(listWeeks){
    var planningText = "";
    listWeeks.forEach(week => {
        if (week != "" && week.length > 0){
            let demiDaySave ;
            let dateStartDemiDaySave;
            let dateEndDemiDaySave ;
            planningText = planningText + "\n Semaine du "+ formatDateFR(week[0].start.replace('+01','Z')) + " au " + formatDateFR(week[week.length-1].end.replace('+01','Z')) + '\n';

            week.forEach(demiDay =>{

                let dateStartDemiDay = new Date(demiDay.start.replace('+01','Z'));
                let dateEndDemiDay = new Date(demiDay.end.replace('+01','Z'));

                let lastDayIsDefined = (demiDaySave != undefined);
                let isSameDay = (lastDayIsDefined && dateStartDemiDay.getUTCDay() === dateEndDemiDaySave.getUTCDay());

                
                // Marquage du nouveau jour
                if((lastDayIsDefined && !isSameDay) || week.indexOf(demiDay) === 0){
                    //console.log(dateStartDemiDay.getUTCDay(), dateEndDemiDaySave.getUTCDay());
                    planningText = planningText + getDayName(dateStartDemiDay.getUTCDay()) + ' :'+ '\n' ;
                }

                // Ajout du cours de l'aprem si différent
                if(lastDayIsDefined && demiDaySave.title != demiDay.title && dateStartDemiDay.getUTCHours() > 12 && isSameDay){
                    planningText = planningText + "----------" + "\n";
                    
                }else if((lastDayIsDefined  && !isSameDay) || week.indexOf(demiDay) === 0){
                    planningText = planningText + demiDay.title;
                    if(demiDay.intervenants != null){
                        planningText = planningText + ' avec ' +  demiDay.intervenants[0].nom + ' ' + demiDay.intervenants[0].prenom + '\n';
                    }else{
                        planningText = planningText + '\n';
                    }
                }
                

                // Sauvegarde du jour traité
                demiDaySave = demiDay;
                dateStartDemiDaySave = new Date(demiDaySave.start.replace('+01','Z'));
                dateEndDemiDaySave = new Date(demiDaySave.end.replace('+01','Z'));
            

            });
        }
    });
    return planningText;
}

function getDayName(ind){
    return daysNumber.find(x => x.number === ind).day;
}
function formatDateFR(dateIn) {
    return new Date(dateIn).
    toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}).
    replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
}

