const { Rent } = require('../models/index');

let authConfig = require('../config/auth');

const RentsController = {};

RentsController.newRent = async (req, res) => {

    let clientId = req.body.clientId;
    let filmId = req.body.filmId;
    let total_price = req.body.total_price;
    let max_rent_date = req.body.max_rent_date;
    let return_date = req.body.return_date;
    
    Rent.create({
        clientId: clientId,
        filmId: filmId,
        total_price: total_price,
        max_rent_date: max_rent_date,
        return_date: return_date,
    }).then(rent => {

        if(!authConfig){  
            res.send("you need to be registered");
            
        }else{
            res.send(rent);   
        };   

    }).catch((error) => {
        res.send(error);
    });
};

RentsController.listOfRents = (req, res) => {

    Rent.findAll()
    
    .then(data => {
    res.send(data);

    }).catch((error) => {
        res.send(error);
    });
};

RentsController.showDetailedRentInfo = async (req, res) => {

    let id = req.body.id;

    let query = `SELECT clients.name AS ClientName, films.title AS FilmTitle, rents.createdAt AS RentDate
    FROM clients
    INNER JOIN rents ON clients.id = rents.clientId
    INNER JOIN films ON films.id = rents.filmId
    WHERE clientId LIKE ${id};`;

    let result = await Rent.sequelize.query(query, {
        type: Rent.sequelize.QueryTypes.SELECT
    });

    if(result != ""){
        res.send(result);
    }else {
        res.send("ID not found");
    };   
};

module.exports = RentsController;