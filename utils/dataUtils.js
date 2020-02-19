const axios = require('axios');

const { ErrorHandler } = require('./errorUtils');

//https://stackoverflow.com/questions/54055935/my-call-async-await-returns-a-promise-pending-in-my-actions
const locationIQAPIRequest = async (APITOKEN, data, cb) => {//the cb function will be the next object from req, res, next

    try {

        const res = await axios(`https://us1.locationiq.com/v1/search.php?key=${APITOKEN}&q=${encodeURI(data)}&format=json`, { mode : 'cors' });            
        console.log(res);
        return [parseFloat(res.data[0].lon), parseFloat(res.data[0].lat)]; 

    } catch (err) {
        //the cb function will be the next object from req, res, next
        cb(new ErrorHandler(500 `Failed to connect to LocationIQ API 🌩`))
    }

} 


exports.prepareDataForDbInsertion = (req, APITOKEN=null, next) => {

    if (req.body.collection === 'category'){

            return req.body;

    }

    return req.body;

}