const MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD
const url = "###removed###";
=======
const url = "##removed##";
>>>>>>> b8b30b3069bad9bd0e5b66345fa78e0ee2be12f3
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
