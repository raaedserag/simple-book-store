const DBController = require('../controller/DBController')
module.exports.TicketsService = class {
   async createTicket(){
    DBController.insertDB()
   }
  }
  
  