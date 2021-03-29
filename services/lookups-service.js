// Classes & Modules
const {CrudServices} = require("../classes/Services-Classes")

const models = require("../models/index");

module.exports.TicketsStatus_Services = class extends CrudServices{
    constructor() {
        super(models["TicketStatus"])
    }
}

module.exports.TicketsSeverity_Services = class extends CrudServices{
    constructor() {
        super(models["TicketSeverity"])
    }
}

module.exports.TicketsCategory_Services = class extends CrudServices{
    constructor() {
        super(models["TicketCategory"])
    }
}

module.exports.ActionTypes_Services = class extends CrudServices{
    constructor() {
        super(models["ActionType"])
    }
}


module.exports.CallerCategories_Services = class extends CrudServices{
    constructor() {
        super(models["CallerCategory"])
    }
}