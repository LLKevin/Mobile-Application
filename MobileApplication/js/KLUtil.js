/**
 * File Name: KLUtil.js
 *
 * Purpose: This javascript file is to provide validation for both the
 *          'add new feedback' and 'modify feedback' forms.
 *
 * Revision History:
 * Kevin Lucas, March 10/2019 Created
 *
 * */
function newItemValiadtion() {
    var form = $("#klAddNewItemFrm");
    form.validate({
        rules:{
            itemName:{
                required:true,
                rangelength:[2,40]
            },
            klCategory:{
                required:true
            },
            manufactureName:{
                required:true
            },
            klPrice:{
                required:true,
                number:true

            },
            klItemDescription:{
                required:true
            }
        },
        messages:{
            itemName: {
                required: "must have item name",
                rangelength: "Length must be 2-40 characters long"
            },
            klCategory: {
                required: "must have category",
                email: "Please enter a valid email address"
            },
            manufactureName: {
                required:"Review date is required"
            },
            klPrice: {
                required: "Must have a price",
                number:"This must be a number"
            },
            klItemDescription: {
                required:"Must have a description"
            }
        }
    });
    return form.valid();
}

//validation for adding qty to cart
function validateQtyDesiredfrr(){
    var form = $("#klItemDetailFrm");
    form.validate({
        rules:{
            klQuantityWanted: {
                required:true,
                number:true
            }
        },
        messages:{
            klQuantityWanted: {
                required:"You must enter a Quantity ",
                number:"Please enter a number"
            }
        }
    });
    return form.valid();
}

//validation for updating cart content
function validateQtyCartModifyfrm(){
    var form = $("#klCartItemModify");
    form.validate({
        rules:{
            klCartQuantity: {
                required:true,
                number:true
            }
        },
        messages:{
            klCartQuantity: {
                required:"You must enter a Quantity ",
                number:"Please a number"
            }
        }
    });
    return form.valid();
}

function validateShippingInfo(){
    var form = $("#klAddShippingInfo");
    form.validate({
        rules:{
            klFirstName: {
                required:true,
                rangelength:[2,40]
            },
            klLastName: {
                required:true,
                rangelength:[2,40]
            },
            klAddress: {
                required:true
            },
            klCity: {
                required:true
            },
            klCountry: {
                required:true
            },
            klPostalCode: {
                required:true,
                postalCodeCheck:true
            },
            klCreditCardNum: {
                required:true,
                number:true
            }
        },
        messages:{
            klFirstName: {
                required:"You must include a first name",
                rangelength:"length between 2 and 40"
            },
            klLastName: {
                required:"You must include a last name",
                rangelength:"length between 2 and 40"
            },
            klAddress: {
                required:"Must include a Address"
            },
            klCity: {
                required:"Must include a City"
            },
            klCountry: {
                required:"Must include a Province"
            },
            klPostalCode: {
                required:"Must include a postal Code",
                postalCodeCheck:"Enter a valid Canadian postalCode"
            },
            klCreditCardNum: {
                required:"Must have a credit card number",
                number:"can only contain numbers"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("postalCodeCheck",
    function (value, element)
    {
        // Regex expression for at least one capital and one number
        var regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

        // Returning whether the element is optional or a Boolean if the regex validation was successful or not
        return this.optional(element) || regex.test(value);
    },
    "Must include a validate postal Code");





