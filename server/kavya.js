var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
//const JSON = require('circular-json');
var app = express();

app.use(express.static(__dirname + '/server'));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/colors', function( req, res){
     console.log(req.url)
    

    var data = fs.readFileSync('test.json');
    //console.log(data)
    res.write(data);
     var words = JSON.parse(data);
    // console.log(words)
    // res.send(words);
    res.end(); 
    });

app.post('/addColor' , function(req, res, next) {
    console.log(req.url)
    var reqColor = req.body;
    
    var data1=JSON.stringify(reqColor, null, 1);
    console.log(data1.length)
    console.log(data1)

    fs.readFile('test.json', 'utf-8', function(err, data) {
        if (err) throw err
    console.log(data)
        var arrayOfObjects = JSON.parse(data);
        console.log(arrayOfObjects)
        arrayOfObjects.fruits.push(data1)
        console.log(arrayOfObjects)
        
        
        fs.writeFile('test.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
            if (err) throw err
            console.log('added to the file..Done!')
        })

    })
});


app.post('/removedinFile' , function(req, res, next) {
    console.log(req.url)
    var reqColor = req.body;
    
    console.log('reqcolor' + reqColor)

console.log(Object.values(reqColor))
 
    var index = Object.values(reqColor);

    fs.readFile('test.json', 'utf-8', function(err, data) {
        if (err) throw err
        console.log( 'data' + typeof(data))
        console.log(data)
        
        var n = JSON.parse(data);
        
    console.log('index' + index)
       
      console.log( 'n  ' + typeof(n))
        console.log(n)
       var content = n.fruits;
       
       var recToRemove=content[index];
        console.log(recToRemove)

       content.splice(content.indexOf(recToRemove),1)
       
       //console.log(typeof(content))
       console.log('con' + typeof(content))
        console.log(index)
       n.fruits.push(content);
       console.log(n)   
         
      
        fs.writeFile('test.json', content, 'utf-8', function(err) {
          if (err) throw err
        console.log('removed!')
        })
    
    })
});




app.listen(4000);
console.log("server running on port 4000");

    







  /*  var   fruits= [];

    console.log(fruits.push(data))

console.log(fruits[0])
    
var final = fruits;
console.log(final)*/

/*var myArr = Array.prototype.slice.apply(data);
console.log(myArr);
*/

/*
fs.appendFile('test.json', final , function(err) {
    console.log(data + 'updated to the file');
    res.send({status: 'success'});
});
*/
     



/*

    var position = data.length-1;
    var n = data.charAt(position);
    console.log(n);  
    
    var logger = fs.createWriteStream('test.json', {
        start : position // 'a' means appending (old data will be preserved)
      })
      
      logger.write(data) // append string to your file
      logger.end();

var position = data.length-1;
var file_path = 'test.json';
var new_text = data;

fs.readFileSync(file_path);
    var file_content = data.toString();
    file_content = file_content.substring(position);
    console.log('file_content' + file_content)
    var file = fs.openSync(file_path,'r+');
    var bufferedText = new Buffer(new_text+file_content
    );
   // fs.writeFileSync(file, bufferedText, null, bufferedText.length, position);




fs.appendFile('test.json', data+',' , function(err) {
        console.log(data + 'updated to the file');
        res.send({status: 'success'});
    });
*/
