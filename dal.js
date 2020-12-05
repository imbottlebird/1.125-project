const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://byeongjo:8317qudwh@cluster0.rgscl.mongodb.net/Cluster0?retryWrites=true&w=majority";
let db = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

// connect to myproject database
    db = client.db('sentiment');
});

//find DB information
async function findOne(){
    
    return new Promise((resolve, reject) => { 
        const collection = db.collection('starbucks');
        collection.find({_id:0}).project({_id:0}).toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        });
        setTimeout(() => null, 0);
    })
}

module.exports = {findOne};
