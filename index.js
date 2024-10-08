import axios from "axios"
import chalk from "chalk"
import cheerio from "cheerio"
import express from "express"

const app = express();
const port = process.env.PORT || 3000;
//url yang akan di scrape
let url = "https://nomorkiajit.com/"
app.get("/api/hk", async(req,res)=>{
  try {
   const {data }=  await axios.get(url);
   const $ = cheerio.load(data)
   let resulting = []
         $('table.table.text-center').each((i,element)=>{
      let re = $(element).find('tbody').children('.text-uppercase')
            re.each((ind,val)=>{
              let tanggal = $(val).find("td")[0]
              let res_tgl = $(tanggal).text()
              let hari = $(val).find("td")[1]
              let res_hari = $(hari).text()
              let result = $(val).find("td")[2]
              let lastResult = $(result).text()
              resulting.push({
                res_tgl,
                res_hari,
                lastResult
              })
            })
    // console.log(`Tanggal : ${tanggal}, Hari : ${hari}, Hasil : ${hasil}`)
    }) //end of each Element
   res.json(resulting)
   
    
  } catch (e) {
    console.error(e);
        res.status(500).send('Error occurred while scraping');
  }
  
  
}) //end of async1


app.use("/api/syd", async(req,res)=>{
  try {
   const {data }=  await axios.get("https://nomorkiajit.com/hksgpsdy");
   const $ = cheerio.load(data)
   let raw_result = []
         $('table.table.text-center').each((i,element)=>{
      let re = $(element).find('tbody').children('.text-uppercase')
            re.each((ind,val)=>{
              let tanggal = $(val).find("td")[0]
              let res_tgl = $(tanggal).text()
              let hari = $(val).find("td")[1]
              let res_hari = $(hari).text()
              let result = $(val).find("td")[4]
              let lastResult = $(result).text()
              raw_result.push({
                res_tgl,
                res_hari,
                lastResult
              })
            })
    // console.log(`Tanggal : ${tanggal}, Hari : ${hari}, Hasil : ${hasil}`)
    }) //end of each Element
   res.json(raw_result)
   
    
  } catch (e) {
    console.error(e);
        res.status(500).send('Error occurred while scraping');
  }
  
  
}) //end of async
















app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//link untuk chat chatgpt 
// https://chatgpt.com/c/70a9b974-6f21-4731-acda-eca78b5ccff0