console.log('Connected to database');
 
async function openConnection()  {
    console.log('connection open script ');
}


async function closeConnection()  {
    console.log('connection close script');
}
module.exports = {openConnection, closeConnection};