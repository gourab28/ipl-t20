const axios = require('axios');
const cheerio = require('cheerio');
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
  
  app.get('/', (req, res) => {
  res.status(200).json({"system":"online","github":"https://github.com/gourab28"})
  });
  
 app.get('/stats/:year', function(req, res) {

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
     });
       res.status(200).json(toprunscorers);
       
   });
})

  app.get('/teams/men', function(req, res) {
    
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

 app.get('/schedule', function(req, res) {

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
          const	date = $(this).find("b").text().split("Match").join("").split("April").join("");
          //Total matches win
          const match = $(this).last().text();
          
          //Push
      teamlists.push({
         date: date,
         match: match
       });
     });
       res.status(200).json(teamlists);
       
   });
})

app.get('/points/:year', function(req, res) {
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
app.listen(3001,function(){
  console.log("server started on port 3001")
})
