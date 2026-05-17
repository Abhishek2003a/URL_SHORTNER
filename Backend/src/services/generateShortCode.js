const seq=require("../utils/pseudoRandomFn");
const binaryConvertion=require("../utils/binaryConvertion");
const binaryToStringMapping=require("../utils/binarytoStringMapping");
const generateShortCode= async ()=>{
    const seqNum= await seq();
    const binaryNum=await binaryConvertion(seqNum);
    const shortCode= await binaryToStringMapping(binaryNum);
    return shortCode;
};
module.exports = generateShortCode;