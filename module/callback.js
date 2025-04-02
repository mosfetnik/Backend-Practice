const fs = require("fs");

const axios = require("axios");

fs.readFile("../text/dog-img.txt", "utf-8", (err, data) => {

  console.log(`Bread ${data}`);

  axios.get(`https://dog.ceo/api/breed/${data}/images/random`).then((res) => {
    if (err) return console.log(err.message);
    console.log(res.data.message);
  }).catch((err)=>{
    console.log( err.message)
  });
});
