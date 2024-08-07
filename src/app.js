
//Step: 1
const mongodb = require('mongodb')
//Step: 2
const mongoClient = mongodb.MongoClient
//Step: 3
const connectionUrl = 'mongodb+srv://Cluster77741:S3pjREZVWGN4@cluster77741.qj3q4.mongodb.net/?retryWrites=true&w=majority'
//Step: 4
const dbname = "proj-1"
//Step: 5
mongoClient.connect(connectionUrl, (error, res1) => {
    if (error) {
        return console.log("error has occured")
    }
    console.log("all perf")
    const db = res1.db(dbname)
  // 1) insertOne 2
    db.collection('users').insertOne({
        name: "menna",
        age: 21
    }, (error, data) => {
        if (error) {
            console.log("unable to insert data")
        }
        console.log("User Added: ",data.insertedId)
    })
    db.collection('users').insertOne({
        name: "Hanan",
        age: 40
    }, (error, data) => {
        if (error) {
            console.log("unable to insert data")
        }
        console.log("User Added: ",data.insertedId)
    })
    // // 2) insertMany 10 - 5 =27

    db.collection('users').insertMany(
        [

            {
                name: "Alaa",
                age: 27
            },
            {
                name: "alia",
                age: 27
            },
            {
                name: "Jumna",
                age: 27
            },
            {
                name: "noorieh",
                age: 27
            },

            {
                name: "islam",
                age: 27
            },
            {
                name: "mido",
                age: 25
            },
            {
                name: "Merfat",
                age: 21
            },
            {
                name: "Mohamed",
                age: 30
            },
            {
                name: "ahmed",
                age: 43
            },
            {
                name: "omar",
                age: 35
            },
        ],
        (error, result) => {
            if (error) {
                return console.error("Insertion error:", error);
            }
            console.log("Inserted Count:", result.insertedCount);
        }
    )
     // 3) find 27 y.o

            db.collection('users').find({age:27}).toArray((error,users)=>{
                if (error) {
                    console.log("error has occured")
                }
                console.log("All Users Found: ",users)
            })

     // 4) Limit 3 27 y.o

            db.collection('users').find({age:27}).limit(3).toArray((error,users)=>{
                if (error) {
                    console.log("error has occured")
                }
                console.log("3 Users Found: ",users)
            })
 // 5) $set name for the first 4 doc

        db.collection('users').find().limit(4).toArray((error, docs) => {
            if (error) {
                return console.error("Error finding documents:", error);
            }

            const ids = docs.map(doc => doc._id);
            // Update the first 4 documents to set their name to "ChangedName"
            db.collection('users').updateMany(
                { _id: { $in: ids } },
                { $set: { name: "ChangedName" } },
                (error, result) => {
                    if (error) {
                        return console.error("Error updating names:", error);
                    }

                    console.log("Altered Names: ", result.modifiedCount);
                    
                }
            );
        });
 // 6) $inc age for the first 4 => 27 by 4

 
        db.collection('users').find({ age: 27 }).limit(4).toArray((error, docs) => {
            if (error) {
                return console.error("Error finding documents:", error);
            }

            const ids = docs.map(doc => doc._id);
            // Update the first 4 documents with age: 27 to increment their age by 4
            db.collection('users').updateMany(
                { _id: { $in: ids } },
                { $inc: { age: 4 } },
                (error, result) => {
                    if (error) {
                        return console.error("Error updating ages:", error);
                    }

                    console.log("Altered Age 27: ", result.modifiedCount);
                    
                }
            );
            
            });

    // 7) update age Inc by 10
        db.collection('users').updateMany({},{
            $inc:{age:10}
        })
        .then((data1)=>console.log("Altered Age by 10: ",data1.modifiedCount))
        .catch((error)=>console.log(error))
// // 8)  deleteMany age : 41 => deletedcount

     db.collection('users').deleteMany({age:41})
    .then((data1)=>console.log("Deleted Count: ",data1.deletedCount))//=1 only 1 mod doc
    .catch((error)=>console.log(error))
    

})




