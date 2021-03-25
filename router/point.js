const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/points/:year', function(req, res) {
   const url = 'https://www.iplt20.com/points-table/men/'+ req.params.year ;
      axios(url)
     .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const teamList = $('tbody > tr');
      //console.log(statsTable.length);
      const teamlists = [];

        function removeLinebreak(str){
          return str.replace(/[\r\n]+/gm," ");
        }
      teamList.each(function(){
        //Team Name
          const	team = $(this).find('span[class="standings-table__team-name js-team"]').text().trim().replace(/ /g, ' ').replace(/[\r\n]+/gm," ").replace(/ /, ' ');
          //Total matches win
          const short = $(this).find('span[class="standings-table__team-name standings-table__team-name--short js-team"]').text().trim().replace(/ /g, ' ').replace(/[\r\n]+/gm," ").replace(/ /, ' ');
          const	pld = parseInt($(this).find(".standings-table__padded").text().trim());
          const	wons = parseInt($(this).find(".standings-table__optional").eq( 0 ).text().trim());
          const	lost = parseInt($(this).find(".standings-table__optional").eq( 1 ).text().trim());
          const	tied = parseInt($(this).find(".standings-table__optional").eq( 2 ).text().trim());
          const	nr = parseInt($(this).find(".standings-table__optional").eq( 3 ).text().trim());
          const	fors = $(this).find(".standings-table__optional").eq( 5 ).text().trim();
          const	again = $(this).find(".standings-table__optional").eq( 6 ).text().trim();
          //Push
      teamlists.push({
         team: team,
         short: short,
         pld: pld,
         wons: wons,
         lost: lost,
         tied: tied,
         nr: nr,
         for: fors,
         again: again
       });
     });
       res.status(200).json(teamlists);
       
   });
})
module.exports = router;