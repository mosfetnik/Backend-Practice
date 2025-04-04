const fs = require("fs").promises;
const axios = require("axios");

const getDogPic = async () => {
  try {
    const data = await fs.readFile("../text/dog-img.txt", "utf-8");
    console.log(`Breed : ${data}`);

    const res = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res)

    await fs.writeFile("../text/dog-img-output.txt", res.data.message);
    console.log("Dog image URL saved to file!");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

getDogPic();
