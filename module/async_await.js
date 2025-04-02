const fs = require("fs").promises; // Use promises version of fs
const axios = require("axios"); // Use axios for HTTP requests

const getDogPic = async () => {
  try {
    
    const data = await fs.readFile("../text/dog-img.txt", "utf-8");
    console.log(`Breed : ${data}`); 
    
    const res = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log("Image Url : " ,res.data.message);

    
    await fs.writeFile("../text/dog-img-output.txt", res.data.message);
    console.log("Dog image URL saved to file!");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

getDogPic();
