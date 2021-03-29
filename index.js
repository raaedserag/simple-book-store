const express = require("express");
const {
    serverPort
} = require("./config.json")
let app = express();



(async function () {
    require("express-async-errors");
    process
        .on("unhandledRejection", ex => {
            throw ex
        })

    // Load database models at server init
    require("./models/sequelize-orm-index")

    //Routes
    require("./routes/routes-index")(app);

    // Initiate the server on the selected host:port
    app.listen(serverPort, () => console.log(`Server started as on http://localhost:${serverPort}/`));

})();