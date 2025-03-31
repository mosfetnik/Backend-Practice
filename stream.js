const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // soluation 1

  fs.readFile("test.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });

  // soluation 2

  //   const readable = fs.createReadStream("test.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
