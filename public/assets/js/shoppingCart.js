// ***************************************************
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(name, price, count, image) {
        this.name = name
        this.price = price
        this.count = count
        this.image = image
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};

    obj.addItemToCart = function (name, price, count, image) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                cart[i].image = image;
                saveCart();
                return;
            }
        }

        console.log("addItemToCart:", name, price, count,image);

        var item = new Item(name, price, count, image);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (name) { // Removes one item
        for (var i in cart) {
            if (cart[i].name === name) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (name) { // removes all item name
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        console.log("Listing cart");
        console.log(cart);
        for (var i in cart) {
            console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();

if(shoppingCart.countCart()==0){
    if(window.location.href.match('checkout.html')!= null){
        window.location = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/credits.html'
    }
}

$(".add-to-cart").click(function(event){
                event.preventDefault();
                var name = $(this).attr("data-name");
                var price = Number($(this).attr("data-price"));
                var image = $(this).attr("data-jpg");

                shoppingCart.addItemToCart(name, price, 1 ,image);
                displayCart();
            });

            $("#clear-cart").click(function(event){
                shoppingCart.clearCart();
                displayCart();
            });

            function displayCart() {
                var cartArray = shoppingCart.listCart();
                console.log(cartArray);
                var output = "";

					
                for (var i in cartArray) {
                    output += "<tr><th class='cart_item-name' >"
                        +cartArray[i].name
                        +" </th><th><input class='item-count' style='width:55px;text-align: right;padding-left:10px; ' type='number' disabled data-name='"
                        +cartArray[i].name
                        +"' value='"+cartArray[i].count+"' >"
						//+"  </th><th style='padding-left:10px;padding-right:10px;'>$"+cartArray[i].price
                        +" </th><th>$"+cartArray[i].total
						+" </th><th><button class='plus-item' data-name='"
                        +cartArray[i].name+"'>+</button>"
                        +" </th><th><button class='subtract-item' data-name='"
                        +cartArray[i].name+"'>-</button>"
                        
                        +" </th><th><button class='delete-item' data-name='"
                        +cartArray[i].name+"'>X</button>"
                        +"</th></tr>";

                        
                }

                $("#show-cart").html(output);
                $("#count-cart").html( shoppingCart.countCart() );
                $("#total-cart").html( shoppingCart.totalCart() );

                if(shoppingCart.countCart()==0){
                    $('.checkout').css('display','none');
                    }
                else{
                    $('.checkout').css('display','inline-block');
                }
            }
			

            $("#show-cart").on("click", ".delete-item", function(event){
                var name = $(this).attr("data-name");
                shoppingCart.removeItemFromCartAll(name);
                displayCart();
            });

            $("#show-cart").on("click", ".subtract-item", function(event){
                var name = $(this).attr("data-name");
                shoppingCart.removeItemFromCart(name);
                displayCart();
            });

            $("#show-cart").on("click", ".plus-item", function(event){
                var name = $(this).attr("data-name");
                shoppingCart.addItemToCart(name, 0, 1);
                displayCart();
            });

            $("#show-cart").on("change", ".item-count", function(event){
                var name = $(this).attr("data-name");
                var count = Number($(this).val());
                shoppingCart.setCountForItem(name, count);
                displayCart();
            });


            displayCart();




                //checkout page

if(window.location.href.match('checkout.html')!= null){
    document.addEventListener('DOMContentLoaded',function (){
        var itemsWrapper = document.getElementById('cart-data')
        var cartArray = shoppingCart.listCart();
        

        for (var i in cartArray) {
            itemsWrapper.insertAdjacentHTML('beforeend',
            `<div class='checkout-item'><a href='#'><img src='assets/img/actual offer pics/${cartArray[i].image} '/><span>${cartArray[i].name}</span></a><p>count: <span>${cartArray[i].count}</span> </p></div>`)
        }
        const orderBtn= document.getElementById("order_btn");
        var orderNum = 0;
        
        orderBtn.addEventListener('click',function(){
            db.ref('users/' + firebase.auth().currentUser.uid +'/Orders').get().then((snapshot) => {
                orderNum=snapshot.val();
            });
            for (var i in cartArray){
                db.ref('users/' + firebase.auth().currentUser.uid +'/'+ (orderNum +1) +'/'+ i).set({
                    Title:  cartArray[i].name,
            
                })
            }
            db.ref('users/' + firebase.auth().currentUser.uid).update({
                Orders: orderNum+1,
            });
        console.log('Order added in db')
        // TU FUNKCJE CZYSZCZACE KOSZYK ITP
        })
    })                            
}









