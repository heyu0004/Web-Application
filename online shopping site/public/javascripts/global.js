// Userlist data array for filling in info box
var userListData = [];
var itemListData = [];
var cartListData = [];
var sellListData = [];
var orderHistoryData = [];
var username_global="";
var label_global="";
var category_global="";
$(document).ready(function() {
    var username_global="";
    var label_global="";
    var category_global="";
    populateTable();
    populateTable2();
    $('#Welcome').html("Welcome, visitor");
});

// Fill table with data
function populateTable() {
    var tableContent = '';
    $('#userList table tbody').html(tableContent);
    $.getJSON( '/users/userlist', function( data ) {
    userListData = data;
        $.each(data, function(){
        if(this.label=="seller"&&label_global=="shopper"){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.label + '</td>';
            tableContent += '<td><a href="#" class="linkmessageseller" rel="' + this.username + '">leave message</a></td>'+'<td> </td>';
            tableContent += '</tr>';
            }
        if(this.label=="shopper"&&label_global=="seller"){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.label + '</td>';
            tableContent += '<td><a href="#" class="linkmessageseller" rel="' + this.username + '">leave message</a></td>';
            tableContent += '<td><a href="#" class="linkemail" rel="' + this.email + '">send email</a></td>';
            tableContent += '</tr>';
            }
         if(this.username==username_global){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.label + '</td>'+'<td>' + "" + '</td>';
            tableContent += '<td></td>';
            tableContent += '</tr>';
         }
        });
        $('#userList table tbody').html(tableContent);
    });
};
function populateTable2() {
    var tableContent2 = '';
    $('#itemList table tbody').html(tableContent2);
    $.getJSON( '/users/itemlist', function( data ) {
    itemListData = data;
        $.each(data, function(){
        if(category_global==""){
            tableContent2 += '<tr>';
            tableContent2 += '<td><a href="#" class="linkshowitem" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            tableContent2 += '<td>' + this.price + '</td>'+'<td>' + this.seller + '</td>'+'<td>' + this.category + '</td>';
            tableContent2 += '<td><a href="#" class="linkaddcartitem" rel="' + this._id + '">add to cart</a></td>';
            tableContent2 += '</tr>';
        }
        else{
        
        if(category_global==this.category){
            tableContent2 += '<tr>';
            tableContent2 += '<td><a href="#" class="linkshowitem" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            tableContent2 += '<td>' + this.price + '</td>'+'<td>' + this.seller + '</td>'+'<td>' + this.category + '</td>';
            tableContent2 += '<td><a href="#" class="linkaddcartitem" rel="' + this._id + '">add to cart</a></td>';
            tableContent2 += '</tr>';
        }
        
        }
        });
        $('#itemList table tbody').html(tableContent2);
    });
};

function populateCart(){
    var cartContent = '';
    $('#cartList table tbody').html(cartContent); 
    $.getJSON( '/users/cartlist', function( data ) {
    cartListData = data;
        $.each(data, function(){
        if (this.shopper==username_global){
            cartContent += '<tr>';
            cartContent += '<td><a href="#" class="linkshowcart" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            cartContent += '<td>' + this.price + '</td>'+'<td>' + this.seller + '</td>';
            cartContent += '<td>' + this.category + '</td>';
            cartContent += '<td><a href="#" class="linkdeletecartitem" rel="' + this._id + '">delete</a></td>';
            cartContent += '</tr>';
            }
        });
        $('#cartList table tbody').html(cartContent);
    });
};

function populateSell(){
// Empty content string
    var sellContent = ''; 
    $('#sellList table tbody').html(sellContent);    
    // jQuery AJAX call for JSON
    $.getJSON( '/users/itemlist', function( data ) {
    sellListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        if (this.seller==username_global){
            sellContent += '<tr>';
            sellContent += '<td><a href="#" class="linkshowsellitem" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            sellContent += '<td>' + this.price + '</td>';
            sellContent += '<td>' + this.category + '</td>';
            sellContent += '<td><a href="#" class="linkdeletesellitem" rel="' + this._id + '">delete</a></td>';
            sellContent += '</tr>';
            }
        });
        // Inject the whole content string into our existing HTML table
        $('#sellList table tbody').html(sellContent);
    });
};


function orderHistory(){
    var hisContent = '';
    $('#orderHistory table tbody').html(hisContent);
    $.getJSON( '/users/orderhistory', function( data ) {
    orderHistoryData = data;
        $.each(data, function(){
        if (this.shopper==username_global){
            hisContent += '<tr>';
            hisContent += '<td><a href="#" class="linkshoworder" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            hisContent += '<td>' + this.price + '</td>'+'<td>' + this.seller + '</td>'+'<td>' + this.shopper + '</td>';
            hisContent += '<td>' + this.category + '</td>'+'<td>' + this.ordertime + '</td>';
            hisContent += '</tr>';
            }
        
        else if(this.seller==username_global){
            hisContent += '<tr>';
            hisContent += '<td><a href="#" class="linkshoworder" rel="' + this.itemname + '">' + this.itemname + '</a></td>';
            hisContent += '<td>' + this.price + '</td>'+'<td>' + this.seller + '</td>'+'<td>' + this.shopper + '</td>';
            hisContent += '<td>' + this.category + '</td>'+'<td>' + this.ordertime + '</td>';
            hisContent += '</tr>';
            }
            
        
        });
        $('#orderHistory table tbody').html(hisContent);
    });
};


function showUserInfo(event) {
    event.preventDefault();
    var thisUserName = $(this).attr('rel');
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
    var thisUserObject = userListData[arrayPosition];
    $('#userInfoName').text(thisUserObject.username);
    $('#userInfoLabel').text(thisUserObject.label);
    if(label_global=='seller'||thisUserObject.username==username_global){
    $('#userInfoEmail').text(thisUserObject.email);
    }
    else{
    $('#userInfoEmail').text("");
    }
    if(thisUserObject.username==username_global){
    $('#userInfoCreditcard').text(thisUserObject.creditcard);
    }
    else{
    $('#userInfoCreditcard').text("");
    }
};

function showItemInfo(event) {
    event.preventDefault();
    var thisItemName = $(this).attr('rel');
    var arrayPosition = itemListData.map(function(arrayItem) { return arrayItem.itemname; }).indexOf(thisItemName);
    var thisItemObject = itemListData[arrayPosition];
    $('#itemInfoName').text("");
    $('#itemInfoName').text(thisItemObject.itemname);
    $('#itemInfoPrice').text("");
    $('#itemInfoPrice').text(thisItemObject.price);
    $('#itemInfoSeller').text("");
    $('#itemInfoSeller').text(thisItemObject.seller);
    $('#itemInfoCategory').text("");
    $('#itemInfoCategory').text(thisItemObject.category);
    $('#itemInfoDescription').text("");
    $('#itemInfoDescription').text(thisItemObject.description);
    
    $('#image').html('<img class="logo" src="http://localhost:3000/images/'+thisItemObject._id+'.jpg" alt="My_Logo" height="100" width="100">');
};


 $('#itemList table tbody').on('click', 'td a.linkshowitem', showItemInfo);
 $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
 $('#cartList table tbody').on('click', 'td a.linkshowcart', showItemInfo);
 $('#sellList table tbody').on('click', 'td a.linkshowsellitem', showItemInfo);
 $('#orderHistory table tbody').on('click', 'td a.linkshoworder', showItemInfo);
 $('#btnAddUser').on('click', addUser);
 $('#btnAddSellItem').on('click', addSellItem);
 $('#btnLogUser').on('click', logUser);
 $('#btnLogUserOff').on('click', logOff);
 $('#btnOrder').on('click', Order);
 $('#btnSearch').on('click', SearchbyCategory);
 $('#btnShowall').on('click', Showall);
 $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
 $('#cartList table tbody').on('click', 'td a.linkdeletecartitem', deleteCartItem);
 $('#sellList table tbody').on('click', 'td a.linkdeletesellitem', deleteSellItem);
 $('#itemList table tbody').on('click', 'td a.linkaddcartitem', addCartItem);
 $('#userList table tbody').on('click', 'td a.linkmessageseller', leavemessage);
 $('#userList table tbody').on('click', 'td a.linkemail', sendemail);



// Add User
function addUser(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($.trim($(this).val()) == '') { errorCount++; }
    });

    if(errorCount === 0) {
        var newUser = {
            'username': $('#inputUserName').val(),
            'password': $('#inputUserPassword').val(),
            'label': $('#inputUserLabel').val(),
            'creditcard': $('#inputUserCreditcard').val(),
            'email': $('#inputUserEmail').val()
        }

        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('#addUser fieldset input').val('');
                alert('register succeed!!');
                populateTable();

            }
            else {
                alert('Error: ' + response.msg);

            }
         });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

// Delete User
function deleteUser(event) {
    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            populateTable();
        });
    }
    else {
        return false;
    }
};

// Leave message to seller
function leavemessage(event) {
event.preventDefault();
if (username_global!==""){
    var msg = prompt("Please enter your message", "");
    if ($.trim(msg) !== '') { 
    var msg_={
    'message':msg,
    'from':username_global,
    'to':$(this).attr('rel'),
    'time': new Date()
    };
        $.ajax({
            type: 'POST',
            data: msg_,
            url: '/users/leavemessage',
            dataType: 'JSON'
             }).done(function( response ) {
            if (response.msg === '') {
            
            populateMessage();
            }
            else {
                alert('Error: ' + response.msg);
            }
            
        });
    }
    else {
        alert('you did not input any message');
        return false;
    }
}
else{
        alert('please log in first');
        return false;
}
}

function populateMessage(){
var tableContent = '';
    $.getJSON( '/users/messagelist', function( data ) {
    //userListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        if(username_global==this.to||username_global==this.from){
            tableContent += '<tr>';
            tableContent += '<td>' + this.from + '</td>'+'<td>' + this.to + '</td>'+'<td>' + this.message+ '</td>'+'<td>' + this.time + '</td>';
            tableContent += '</tr>';
            }
        });
        $('#messageList table tbody').html(tableContent);
    });
}

function sendemail(){
window.open('mailto:'+$(this).attr('rel')+'?subject=we are having a discount now!');
}



// Add Cart Item
function addCartItem(event) {
    event.preventDefault(); 
    if(username_global !== ""&&label_global=="shopper") {
        $.getJSON( '/users/finditem/'+ $(this).attr('rel'), function( data ) {
        $.each(data, function(){
         var newCartItem = {
            'itemname':this.itemname ,
            'price':this.price,
            'seller':this.seller,
            'category':this.category,
            'shopper':username_global,
            'id':this._id,
            'number':1
        }           
           $.ajax({
            type: 'POST',
            data: newCartItem,
            url: '/users/addcartitem',
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg === '') {
                populateCart();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });        
        });
    });    
    }
    else {
        if(username_global == ""){
        alert('You did not log in');
        return false;
        }
        else {
        alert('only shopper can add item to cart');
        return false;
        }
    }
};

// Delete Cart item
function deleteCartItem(event) {
    event.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this item?');
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deletecartitem/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            populateCart();
        });
    }
    else {
        return false;
    }
};

// Add Sell item
function addSellItem(event) {
    if(label_global=="seller"&&username_global!==""){
    event.preventDefault();
    var errorCount = 0;
    $('#addSell input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    if(errorCount == 1||errorCount ==0) {
        var newItem = {
            'itemname': $('#inputItemName').val(),
            'price': $('#inputItemPrice').val(),
            'category': $('#inputItemCategory').val(),
            'description': $('#inputItemDescription').val(),
            'seller': username_global
        }
        $.ajax({
            type: 'POST',
            data: newItem,
            url: '/users/additem',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
                $('#addSell fieldset input').val('');
                alert('add selling item succeed!!');
                populateTable2();
                populateSell()
            }
            else {
                alert('Error: ' + response.msg);

            }
         });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
    }
    else{
        alert('You can not add Sell Item');
        return false;
    }
};



// Delete Sell item
function deleteSellItem(event){
event.preventDefault();
    var confirmation = confirm("Are you sure you don't want to sell this item anymore?");
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteitem/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
                
            }
            else {
                alert('Error: ' + response.msg);
            }
            populateSell();
            populateTable2();
        });
    }
    else {
        return false;
    }
}

function logUser(event){
event.preventDefault();
if(username_global==""){
 var errorCount = 0;
    $('#logUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {
        var newUser = {
            'username': $('#inputUserName2').val(),
            'password': $('#inputUserPassword2').val()
        };
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/loguser',
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg === '') {
                 if(response.password == response.pwd){
                 alert('You logged in ! ');
                 username_global=response.username;
                 label_global=response.label;
                 $('#Welcome').html("Welcome, "+ username_global);
                 if(label_global=="shopper"){
                 populateCart();
                 
                 }
                 if(label_global=="seller"){
                 populateSell();
                 }
                 populateMessage();
                 orderHistory();
                 }
                 else{
                 alert('Wrong password  '+response.password+"  "+response.pwd);
                 }
                $('#logUser fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
}
else{
        alert('Please log off first');
        return false;
    }
}

function SearchbyCategory(event){
event.preventDefault();

    if($('#inputSearchCategory').val() !== ''){
    category_global=$('#inputSearchCategory').val(),
    populateTable2();
    }
    else {
    alert('Please fill in category');
    }

}
function Showall(event){
    event.preventDefault();
    category_global="";
    populateTable2(); 
    $('#inputSearchCategory').val('');
}



function Order(event){
event.preventDefault();
if(username_global !== ""&&label_global=="shopper") {
var confirmation = confirm("Are you sure you want pay the cart?");
    if (confirmation === true) {
        var usr = {
            'username':username_global,
            'label':label_global
        }
       $.ajax({
            type: 'POST',
            data: usr,
            url: '/users/order',
            dataType: 'JSON'
        }).done(function( data ) {
        $.each(data, function(){
         
         var newOrder = {
            'itemname':this.itemname ,
            'price':this.price,
            'seller':this.seller,
            'category':this.category,
            'shopper':username_global,
            'ordertime': new Date()
        };
                         
           $.ajax({
            type: 'POST',
            data: newOrder,
            url: '/users/addorder',
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg === '') {
                populateCart();
                orderHistory();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });        
        
    }); 
    
    });    
    }
  }
    else {
        alert('You can not place order');
        return false;
    }

}

function logOff(event){
                 $('#Welcome').html("Welcome, visitor");
                 username_global="";
                 label_global="";
                 category_global="";
                 $('#cartList table tbody').html("");
                 $('#messageList table tbody').html("");
                 $('#orderHistory table tbody').html("");
                 $('#sellList table tbody').html("");
                 $('#logUser fieldset input').val("");
                 alert("you logged off");
                
                 populateTable();
                 
}