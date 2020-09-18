// code away!
const app = require("./server");

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log("server is listening on port: ", port);
});