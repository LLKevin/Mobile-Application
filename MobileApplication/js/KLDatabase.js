var db;

function errorHandler(tx, error)
{
    console.error("SQL error: " + tx + " (" + error.code + "): " + error.message);

}

// This var is an object
var DB = {

    // Whenever we create a function onside an object we follow this approach: "functionName: functionBody() {}"
    KLCreateDatabase: function ()
    {
        var shortName = "webStore";
        var version = "2.0";
        var displayName = "db for webstore";
        var dbSize = 2 * 1024 * 1024; // this is a 2 MB estimated size

        function dbCreate()
        {
            console.info("Success: Database created successfully");
        }
        // openDatabase() creates a DB if it doesn't exist, or open it if it exists
        db = openDatabase(shortName, version, displayName, dbSize, dbCreate);
    },
    createTables: function ()
    {
        function txFunction(tx)
        {
            function successCreate()
            {
                console.info("Table created successfully");
            }

            var options = [];

            var dropTables = "DROP TABLE IF EXISTS products;";
            tx.executeSql(dropTables,options,successCreate,errorHandler);

            var sqlProducts = "CREATE TABLE IF NOT EXISTS products( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "itemName VARCHAR(40) NOT NULL,"
                + "category VARCHAR(40) NOT NULL,"
                + "manufactureName VARCHAR(60) NOT NULL,"
                + "price INTEGER NOT NULL,"
                + "itemDescription TEXT NOT NULL);";
            tx.executeSql(sqlProducts, options, successCreate, errorHandler);

            dropTables = "DROP TABLE IF EXISTS cartItem;";
            tx.executeSql(dropTables,options,successCreate,errorHandler);

            var sqlCartItems = "CREATE TABLE IF NOT EXISTS cartItem( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "itemName VARCHAR(40) NOT NULL,"
                + "price INTEGER NOT NULL,"
                + "quantity INTEGER NOT NULL);";

            tx.executeSql(sqlCartItems, options, successCreate, errorHandler);

        }

        function successTransaction()
        {
            console.info("Create table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function ()
    {
        function txFunction(tx)
        {
            var sql = "DROP TABLE IF EXISTS type; DROP TABLE IF EXISTS review;";
            var options = [];

            function successDrop()
            {
                console.info("Table dropped successfully");
            }

            tx.executeSql(sql, options, successDrop, errorHandler);
        }

        function successTransaction()
        {
            console.info("Drop table transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
