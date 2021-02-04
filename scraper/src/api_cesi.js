const axios = require('axios');

module.exports.getPlanning = async function getPlanning(JSESSIONID, SERVERID, startDate, endDate) {
    let config = {
        headers: {
            Cookie: `JSESSIONID=${JSESSIONID}; SERVERID=${SERVERID}`,
        }
    }

// Make a request for a user with a given ID
    const response = await axios.get(`https://ent.cesi.fr/api/seance/all?start=${startDate}&end=${endDate}`, config);
    return response.data;

}