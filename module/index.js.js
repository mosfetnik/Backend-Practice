const fs = require("fs");
// scynchronous read file system 
// const data = fs.readFileSync("./text/new.txt", "utf-8");

// const show_data = `This is the simple string literal sample: ${data} ${Date.now()}`
// console.log(show_data);

// fs.writeFileSync('./text/output.txt',show_data);

// asyncnorous read file write file system 



fs.readFile('../text/new.txt','utf-8',(err,data)=>{
   
    if(err) throw err;
    console.log(data);
})