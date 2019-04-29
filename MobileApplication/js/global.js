function loadDropDown() {
    KLUpdateTypesDropdown();
}

function newProduct() {
    addNewProduct();
}

function displayItems() {
    getItems();
}

function displayCartItems() {
    getCartItems();
}

function itemDetail() {
    getItemDetail();
}

function addToCart() {
    addProductToCart();
}

function returnToList() {
    cancelAddToCart();
}

function cartItemDetails() {
    getCartItemDetails();
}
function cancelCartMod (){
    $(location).prop('href', '#klCart');
}
function updateCart(){
    updateCartItems();
}


function delete_Item() {
    deleteItemFromCart();
}

function emptyCart() {
    clearShoppingCart();
}

function getShippingInfo() {
    $(location).prop('href', '#klShipping');
}

function completeCheckout() {
    displayReciept();
}

function displayRecieptInfo() {
    getReceiptInfo();
    clearShoppingCart();
}

function returnToHome() {
    $(location).prop('href', '#klHomePage');
}

function init(){
$("#klDisplayItems").on("pageshow", displayItems);
$("#klProductDetails").on("pageshow", itemDetail);
$("#klCart").on("pageshow", displayCartItems);
$("#klAddToCart").on("click", addToCart);
$("#klSaveItem").on("click", newProduct);
$("#klCancel").on("click", returnToList);

$("#klModifyCartItems").on("pageshow", cartItemDetails);
//modify cart Items
$("#klCartCancel").on("click", cancelCartMod);
$("#klCartUpdate").on("click", updateCart);
$("#klDelete").on("click", delete_Item);
//Checkout Or Clear Cart
$("#klClearCart").on('click', emptyCart);
$("#klCheckOut").on("click",getShippingInfo);
    //save buyer's details
$("#klSaveBuyerDetails").on("click", completeCheckout);
    //display receipt
$("#klReceipt").on("pageshow", displayRecieptInfo);
    //return home from reciept
$("#btnHome").on("click", returnToHome);

}

function initDB(){
    try
    {
        DB.KLCreateDatabase();
        if (db)
        {
           DB.createTables();
        }
        else
        {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    }
    catch (e)
    {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed");
    }
}



$(document).ready(function () {
    init();
    initDB();
});
