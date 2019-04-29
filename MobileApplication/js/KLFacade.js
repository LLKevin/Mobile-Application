//load the value for the drop down

//add a new product to the database
function addNewProduct(){

    function callback() {
        alert("New product Added");
    }

    if(newItemValiadtion())
    {
            var itemName = $("#itemName").val();
            var itemCategory = $("#klCategory  ").val();
            var manufactureName = $("#manufactureName").val();
            var itemPrice = $("#klPrice").val();
            var itemDescription = $("#klItemDescription").val();
            var options = [itemName,itemCategory,manufactureName,itemPrice,itemDescription];

        products.insert(options, callback);
    }
    else{
        alert("validation failed");
    }
}
//get the stored items.
function getItems() {
    var options= [];

        function callback(tx,results) {
            var htmlCode = "";
            for (var i = 0; i < results.rows.length; i++) {

                var row = results.rows[i];

                htmlCode += "<li>" +

                    // You can make your own attribute by starting it with 'data'
                    "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                    "<h1>Product Name: " + row['itemName'] + "</h1>" +
                    "<il>Product Category: " + row['category'] + "</il>" +
                    "<p>Manufacture: " + row['manufactureName'] + "</p>" +
                    "<p>Price: " + row['price'] + "</p>" +
                    "<p>Description: " + row['itemDescription'] + "</p>" +
                    "</a>" +
                    "</li>";
            }
            var lv = $("#klProductList");
            lv = lv.html(htmlCode);

            lv.listview("refresh");

            function clickHandler() {
                //
                localStorage.setItem("id", $(this).attr("data-row-id"));
                $(location).prop('href', '#klProductDetails');

            }
            $("#klProductList a").on("click", clickHandler);
         }
         products.selectAll(options,callback);
}
//function for adding items to the cart
function getCartItems() {
    //display my cart Items.

    var options= [];

    function callback(tx,results) {
        var htmlCode = "";
        var totalCost = 0;


        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];

            htmlCode += "<li>" +

                // You can make your own attribute by starting it with 'data'
                "<a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>Product Name: " + row['itemName'] + "</h1>" +
                "<p>Price: " + row['price'] + "</p>" +
                "<p>Quantity: " + row['quantity'] + "</p>" +
                "</a>" +
                "</li><br>";

            totalCost +=  parseInt(row['price'] ) * parseInt(row['quantity']);

        }
        var lv = $("#cartItems");
        lv = lv.html(htmlCode);

        lv.listview("refresh");

        //calculate the total
        $("#cartTotal").text("Cart total :  $" + totalCost.toFixed(2));



        function clickHandler() {
            //
            localStorage.setItem("idCartItem", $(this).attr("data-row-id"));
           // $(location).prop('href', '#klModifyCartItem');
            $(location).prop('href', '#klModifyCartItems');
        }
        $("#cartItems a").on("click", clickHandler);
    }
    cartItems.selectAll(options,callback);

    //click handler to send to update page.
        //updating or deleting can be done.
}
function getItemDetail() {
    var id = localStorage.getItem("id");
    var options = [id];

   function callback(tx,result){
       var row = result.rows[0];

       $("#klItemDetailName").val(row["itemName"]);
       $("#klItemDetailPrice").val(row["price"]);
   }

    products.select(options, callback);
}
function addProductToCart() {

    if(validateQtyDesiredfrr()) {
        function callbackz() {
            alert("Added to cart");
        }

        var name = $("#klItemDetailName").val();
        var price = $("#klItemDetailPrice").val();
        var quantity = $("#klQuantityWanted").val();

        var options = [name, price, quantity];

        cartItems.insert(options, callbackz)
    }
    else{
        alert("validation failed");
    }
}
function cancelAddToCart() {
    $(location).prop('href', '#klDisplayItems');
}
//Cart Manipulation
function getCartItemDetails() {
    var id = localStorage.getItem("idCartItem");
    var options = [id];

    console.info(id);

    function callback(tx, result) {

        var row = result.rows[0];
        var price =  row["price"];

        $("#klItemNameCart").val(row["itemName"]);
        $("#klCartPrice").val(price);
        $("#klCartQuantity").val(row["quantity"]);
    }

    cartItems.select(options,callback);
}
function updateCartItems(){

    if(validateQtyCartModifyfrm()) {
        var id = localStorage.getItem("idCartItem");
        var name = $("#klItemNameCart").val();
        var price = $("#klCartPrice").val();
        var quantity = $("#klCartQuantity").val();

        function callback() {
            $(location).prop('href', '#klCart');
        }

        var options = [name, price, quantity, id];

        cartItems.update(options, callback);
    }
    else{
        alert("validation failed");
    }
}
function deleteItemFromCart() {
    var id  =  localStorage.getItem("idCartItem");

    function callback() {
        $(location).prop('href', '#klCart');
    }

    var options = [id];

    cartItems.delete(options,callback)
}
function clearShoppingCart() {
    var id  =  localStorage.getItem("idCartItem");

    function callback() {
        var lv = $("#cartItems");
        $("#cartTotal").text("Cart total : $" + 0.00);
        lv = lv.html("<p style='text-align: center;'>Cart is empty</p>");
        lv.listview("refresh");
        console.info("Cart has been emptied");
    }

    var options = [];

    cartItems.deleteAll(options,callback)
}
function displayReciept() {
    //gather all user input & save to a session.
if(validateShippingInfo()) {
    var userInfo = {
        firstName: $("#klFirstName").val(),
        lastName: $("#klLastName").val(),
        address: $("#klAddress").val(),
        city: $("#klCity").val(),
        country: $("#klCountry").val(),
        postalCode: $("#klPostalCode").val(),
        creditCardNum: $("#klCreditCardNum").val()
    };

    var JsonString = JSON.stringify(userInfo);
    localStorage.setItem('ShippingInfo', JsonString);
    $(location).prop('href', '#klReceipt');
}

}
function getReceiptInfo() {

   var options = [];

    function callback(tx,results) {
        var htmlCodeZ = "";
        var htmlUserInfo = "";
        var totalCost = 0;


        htmlCodeZ +=  "<tr>" +
                        "<td>Cart Number</td>" +
                        "<td>Product Name</td>" +
                        "<td>Price</td>" +
                        "<td>Quantity</td>" +
                      "</tr>"
                    + "<hr> style='border-bottom:1px solid lightgrey'>";


        for (var i = 0; i < results.rows.length; i++) {

            var row = results.rows[i];


            htmlCodeZ +="<tr>" +

                // You can make your own attribute by starting it with 'data'
                "<td>" + i + "</td>"+
                "<td>" + row['itemName'] + "</td>"+
                "<td>" + row['price']  + "</td>"+
                "<td>" + row['quantity'] + "</td>" +
                "</tr>";
            totalCost += parseInt(row['price']) * parseInt(row['quantity']);

        }

        //add the user information
        var userInfo = JSON.parse(localStorage.getItem('ShippingInfo'));
        var creditCardNum = userInfo.creditCardNum;
        creditCardNum = creditCardNum.substring(creditCardNum.length - 4);

        htmlUserInfo += "<hr style='border-top:1px solid lightgrey'>" +
                        "<h2>Contact Information</h2>" +
                        "<p> First Name: "+ userInfo.firstName + "</p>" +
                        "<p> Last Name: "+ userInfo.lastName + "</p>" +
                        "<p> Address: "+ userInfo.address + "</p>" +
                        "<p> City: "+ userInfo.city + "</p>" +
                        "<p> postalCode :"+ userInfo.postalCode + "</p>" +
                        "<p> Card Number ending in: "+ creditCardNum + "</p>" ;

        var table = $("#receiptOutput");
        var userInfoDisplay = $("#userInfo");
        var cartTotal = $("#cartReceiptTotal");
        cartTotal = cartTotal.html("<h3 style='text-align: left; border-top:1px solid lightgray; padding:10px;'> " +
            "Cart Total :  $"+ totalCost+ "</h3>");


        userInfoDisplay = userInfoDisplay.html(htmlUserInfo);
        table = table.html(htmlCodeZ);
    }
    cartItems.selectAll(options,callback);
}

