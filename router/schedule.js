const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

 router.get('/schedule', function(req, res) {
   const url = 'https://insider.in/ipl-schedule/article';
      axios(url)
     .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const teamList = $('section[class="text text-align-left text-margin-small"] > ul > li');
      //console.log(statsTable.length);
      const teamlists = [];

        function removeLinebreak(str){
          return str.replace(/[\r\n]+/gm," ");
        }
      teamList.each(function(){
        //Team Name
          //const	date = $(this).find("b").text();
          //Total matches win
          const match = $(this).last().text();
          
          //Push
      teamlists.push({
         //date: date,
         match: match
       });
     });
       res.status(200).json(teamlists);
       
   });
})

  

module.exports = router;