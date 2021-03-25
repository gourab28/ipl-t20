const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.static("public"));
  
  app.use(require('./router/home'));
  app.use(require('./router/stats'));
  app.use(require('./router/team'));
  app.use(require('./router/schedule'));
  app.use(require('./router/point'));
  
app.listen(3001,function(){
  console.log("server started on port 3001")
})
