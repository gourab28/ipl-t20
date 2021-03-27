# IPLT20 Live Cricket Score API
Live Cricket Score API all teams and tournaments.

Live version :
https://iplt20-live-api.herokuapp.com/

## API Endpoints :

Base URL: ```http://127.0.0.1:3001```
* GET ```/teams/```
List all the IPL teams.

Example:

```json
{
"team":"Chennai Super Kings",
"wins":"2010,2011,2018"
},
{
"team":"Delhi Capitals",
"wins":""
  
}
,{
"team":"Punjab Kings",
"wins":""
},
{
"team":"Kolkata Knight Riders",
"wins":"2012,2014"
},
{
"team":"Mumbai Indians",
"wins":"2013,2015,2017,2019,2020"
},
{
"team":"Rajasthan Royals",
"wins":"2008"
},
{
"team":"Royal Challengers Bangalore",
"wins":""
},
{
"team":"Sunrisers Hyderabad",
"wins":"2016"
  
}
```

Base URL: ```http://127.0.0.1:3001/stats/2020```
List all the IPL Most Run.
* GET ```/stats/<year>```
 ```json
     {
        "rank": 1,
        "name": "KL                             Rahul",
        "mat": "14",
        "inns": 14,
        "runs": "670",
        "hs": 132,
        "avg": 55,
        "bf": 518,
        "sr": 129,
        "century": 1,
        "halfcentury": 5,
        "four": 58,
        "six": 23
    },
    {
        "rank": 2,
        "name": "Shikhar                             Dhawan",
        "mat": "17",
        "inns": 17,
        "runs": "618",
        "hs": 106,
        "avg": 44,
        "bf": 427,
        "sr": 144,
        "century": 2,
        "halfcentury": 4,
        "four": 67,
        "six": 12
    },
    {
        "rank": 3,
        "name": "David                             Warner",
        "mat": "16",
        "inns": 16,
        "runs": "548",
        "hs": 85,
        "avg": 39,
        "bf": 407,
        "sr": 134,
        "century": 0,
        "halfcentury": 4,
        "four": 52,
        "six": 14
    }
```
# IPL Team 
http://127.0.0.1:3001/teams

# IPL 2021 Schedule
http://127.0.0.1:3001/Schedule

# IPL Points 
http://127.0.0.1:3001/points/2021

# IPL Most Run's
http://127.0.0.1:3001/stats/2021