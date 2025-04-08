const fs = require("fs").promises;
const axios = require("axios");

const getDogPic = async () => {
  try {
    const data = await fs.readFile("../text/dog-img.txt", "utf-8");
    console.log(`Breed : ${data}`);

    const res1 = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res = await Promise.all([res1, res2, res3]);
    const imgs = res.map((ele) => ele.data.message);
    console.log(imgs);

    await fs.writeFile("../text/dog-img-output.txt", imgs.join("\n"));
    console.log("Dog image URL saved to file!");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

getDogPic();
