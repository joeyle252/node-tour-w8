const app  = require("./app");
require("dotenv").config({ path: ".env" });


app.listen(process.env.PORT, () => {
	console.log("server listening on port " + process.env.PORT);
});