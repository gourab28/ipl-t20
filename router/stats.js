const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const router = express.Router();

router.get('/stats/:year', function(req, res) {

   const url = 'https://www.iplt20.com/stats/'+ req.params.year +'/most-runs';

      axios(url)
     .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);
      const statsTable = $('tbody > tr');
      //console.log(statsTable.length);
      const toprunscorers = [];

        function removeLinebreak(str){
          return str.replace(/[\r\n]+/gm," ");
        }
      statsTable.each(function(){
        //Player Rank
        const	rank = parseInt($(this).find(".top-players__pos").text().trim());
        //Player Name
          const	player = $(this).find(".top-players__player-name").text().trim();
          const players = removeLinebreak(player).replace(/ /g, ' ');
          //Total Matches
          match = $(this).find(".top-players__padded").text();
          const matches = removeLinebreak(match).replace(/ /g, '');
          //Innings
          const	inns = parseInt($(this).find(".top-players__inns").text().trim());
          //Total Runs
          const runs =removeLinebreak($(this).find(".top-players__r").text()).replace(/ /g, '');
          //High Score
          const	hs = parseInt($(this).find(".top-players__hs").text().trim());
          //Avarage
          const	avg = parseInt($(this).find(".top-players__a").text().trim());
          //bf
        const	bf = parseInt($(this).find(".top-players__b").text().trim());
        //SR
        const	sr = parseInt($(this).find(".top-players__sr").text().trim());
          //100s
          const	century = parseInt($(this).find(".top-players__100s").text().trim());
          //50s
          const	halfcentury = parseInt($(this).find(".top-players__50s").text().trim());
          // 4S
          const	fours = parseInt($(this).find(".top-players__4s").text().trim());
          //6s
          const	sixs = parseInt($(this).find(".top-players__6s").text().trim());
          //Push
      toprunscorers.push({
         rank: rank,
         name: players,
         mat: matches,
         inns: inns,
         runs: runs,
         hs: hs,
         avg: avg,
         bf: bf,
         sr: sr,
         century: century,
         halfcentury: halfcentury,
         four: fours,
         six: sixs
       });
     })
       res.status(200).json(toprunscorers);
   });
})


module.exports = router;