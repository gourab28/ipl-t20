const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/teams/', function(req, res) {

   const url = 'https://www.iplt20.com/teams/men';
      axios(url)
     .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const teamList = $('ul[class="content-grid large-block-grid-4 medium-block-grid-3 small-block-grid-1 flex-grid u-negative-margin team-card-grid"] > li[class="team-card-grid__item"]');
      //console.log(statsTable.length);
      const teamlists = [];

        function removeLinebreak(str){
          return str.replace(/[\r\n]+/gm," ");
        }
      teamList.each(function(){
        //Team Name
          const	team = $(this).find(".card__title").text();
          //Total matches win
          const win = $(this).find(".team-card__wins").text().trim().replace(/ /g, '').replace(/[\r\n]+/gm," ").replace(/ /, ' ');
          
          //Push
      teamlists.push({
         team: team,
         wins: win
       });
     });
       res.status(200).json(teamlists);
       
   });
})


module.exports = router;