var products ={
    insert: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "INSERT INTO products(itemName, category, manufactureName, price,itemDescription ) " +
                "VALUES(?,?,?,?,?);";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback)
    {


        function txFunction(tx)
        {
            var sql = "UPDATE products SET itemName=?, category=?, manufactureName=?," +
                " price=?, itemDescription=? WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);



    },
    delete: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "DELETE FROM products WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);



    },
    select: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "SELECT * FROM products WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);


    },
    selectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM products";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};

var  cartItems ={

    insert: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "INSERT INTO cartItem (itemName, price, quantity) VALUES(?,?,?);";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "UPDATE cartItem SET itemName=?, price=?, quantity=?  WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);



    },
    delete: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "DELETE FROM cartItem WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);



    },
    deleteAll: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "DELETE FROM cartItem";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);



    },
    select: function (options, callback)
    {

        function txFunction(tx)
        {
            var sql = "SELECT * FROM cartItem WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);


    },
    selectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM cartItem";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};
