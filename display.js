let table = document.getElementById("listFood");
let table1 = document.getElementById("listFood1");
let seachName = document.getElementById("search_name");
let seachName1 = document.getElementById("search_name1");
// let seachCategory = document.getElementById("category4");
getAllFood();
getAllFood1();
listCategory1();
listCategory2()

function getAllFood() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food",
        success: function (data) {
            foods = data
            console.log(data)
            displayTable(data);
        }
    })
}

function getAllFood1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food",
        success: function (data) {
            foods = data
            console.log(data)
            displayTable1(data);
        }
    })
}

function displayTable(data) {
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += "<div class=\"col-xl-3 col-lg-4 col-md-6 wow fadeInUp\" data-wow-delay=\"0.3s\">\n" +
            "                            <div class=\"product-item\">\n" +
            "                                <div class=\"position-relative bg-light overflow-hidden\">\n" +
            // "                                    <img  src="'+"http://localhost:8080/Image/" + data[i].imageUrl  +'"  width="100" height="100">\n" +
            " <th>" + '<img class="img-fluid w-100"  src="' + "http://localhost:8080/Image/" + data[i].imageUrl + '"  width="400" height="400">' + "</th>" +
            // "                                        <img class=\"cart-item-image\"  src="'+"http://localhost:8080/Image/" + iteams[i].imageUrl  +'" width=\"100\" height=\"100\">\n" +


            "                                    <div class=\"bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3\">New</div>\n" +
            "                                </div>\n" +
            "                                <div class=\"text-center p-4\">\n" +
            "                                    <a class=\"d-block h5 mb-2\" href=\"\">" + data[i].name + "</a>\n" +
            "                                    <span class=\"text-primary me-1\">" + data[i].price + "VN??" + "</span>\n" +
            "                                    <span class=\"text-body text-decoration-line-through\">100.000VN??</span>\n" +
            "                                </div>\n" +
            "                                <div class=\"d-flex border-top\">\n" +
            "                                    <small class=\"w-50 text-center border-end py-2\">\n" +
            "                                        <a class=\"text-body\" onclick='showEditForm(" + data[i].id + ")'><i class=\"fa fa-eye text-primary me-2\"></i>View detail</a>\n" +
            "                                    </small>\n" +
            "                                    <small class=\"w-50 text-center py-2\">\n" +
            "                                        <a class=\"text-body\" onclick='createItem(" + data[i].id + ",1)'></i>Add to cart</a>\n" +
            "                                    </small>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n"

    }
    table.innerHTML = result;

}

function displayTable1(data) {
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result += "<div class=\"col-xl-3 col-lg-4 col-md-6 wow fadeInUp\" data-wow-delay=\"0.3s\">\n" +
            "                            <div class=\"product-item\">\n" +
            "                                <div class=\"position-relative bg-light overflow-hidden\">\n" +
            // "                                    <img  src="'+"http://localhost:8080/Image/" + data[i].imageUrl  +'"  width="100" height="100">\n" +
            " <th>" + '<img class="img-fluid w-100"  src="' + "http://localhost:8080/Image/" + data[i].imageUrl + '"  width="400" height="400">' + "</th>" +
            // "                                        <img class=\"cart-item-image\"  src="'+"http://localhost:8080/Image/" + iteams[i].imageUrl  +'" width=\"100\" height=\"100\">\n" +


            "                                    <div class=\"bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3\">New</div>\n" +
            "                                </div>\n" +
            "                                <div class=\"text-center p-4\">\n" +
            "                                    <a class=\"d-block h5 mb-2\" href=\"\">" + data[i].name + "</a>\n" +
            "                                    <span class=\"text-primary me-1\">" + data[i].price + "VN??" + "</span>\n" +
            "                                    <span class=\"text-body text-decoration-line-through\">100.000VN??</span>\n" +
            "                                </div>\n" +
            "                                <div class=\"d-flex border-top\">\n" +
            "                                    <small class=\"w-50 text-center border-end py-2\">\n" +
            "                                        <a class=\"text-body\" onclick='showEditForm(" + data[i].id + ")'><i class=\"fa fa-eye text-primary me-2\"></i>View detail</a>\n" +
            "                                    </small>\n" +
            "                                    <small class=\"w-50 text-center py-2\">\n" +
            "                                        <a class=\"text-body\"></i>Add to cart</a>\n" +
            "                                    </small>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n"

    }
    table1.innerHTML = result;

}

function showCart() {
    $('#exampleModal').modal('show');
    listCategory()
    listUser()
}


function createProduct() {
    let form = new FormData();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let user = $('#user').val();
    let image = $('#image')[0].files[0];
    let product = {
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        },
        user: {
            id: user
        }

    }
    form.append("file", image)
    form.append("food", new Blob([JSON.stringify(product)], {type: "application/json"}))
    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food",
        data: form,
        success: function () {
            getAllFood();
            alert("T???o th??nh c??ng!");
            $('#exampleModal').modal('hide');
            document.getElementById("addForm").reset()
        }
    })
    event.preventDefault()
}


function listCategory() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        success: function (listCategory) {
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result += "<option value=" + listCategory[i].id + ">" + listCategory[i].name + "</option>"
            }
            document.getElementById("category").innerHTML = result;
            document.getElementById("category1").innerHTML = result;
        }
    })
}

function listCategory1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        success: function (listCategory) {
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result += "<li class=\"nav-item me-2\"  >\n" +
                    "                        <p onclick='searchCate(" + listCategory[i].id + ")' class=\"btn btn-outline-primary border-2 active\" data-bs-toggle=\"pill\"\n" +
                    "                           >" + listCategory[i].name + "</p>\n" +
                    "                    </li>"
            }
            document.getElementById("category3").innerHTML = result;
        }
    })
}

function listCategory2() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/categories",
        success: function (listCategory) {
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result += "<li class=\"nav-item me-2\"  >\n" +
                    "                        <p onclick='searchCate1(" + listCategory[i].id + ")' class=\"btn btn-outline-primary border-2 active\" data-bs-toggle=\"pill\"\n" +
                    "                             >" + listCategory[i].name + "</p>\n" +
                    "                    </li>"
            }
            document.getElementById("category5").innerHTML = result;
        }
    })
}


function listUser() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/user",
        success: function (listUser) {
            result = ""
            for (let i = 0; i < listUser.length; i++) {
                result += "<option value=" + listUser[i].id + ">" + listUser[i].name + "</option>"
            }
            document.getElementById("user").innerHTML = result;
            document.getElementById("user1").innerHTML = result;
        }
    })
}


function deleteComfirm(id) {
    let result = confirm("B???n c?? mu???n x??a kh??ng?")
    if (result) {
        deleteFood(id);
    }
}

function deleteFood(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/food/" + id,
        success: function () {
            getAllFood()
            alert("X??a th??nh c??ng")
        }
    })
}

let idProduct;

function showEditForm(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/" + id,
        success: function (data) {
            // listCategory()
            // listUser()
            console.log(id)
            idProduct = data.id;
            document.getElementById("name1").value = data.name
            document.getElementById("price1").value = data.price
            document.getElementById("description1").value = data.description
            document.getElementById("image1").src = "http://localhost:8080/Image/" + data.imageUrl
            document.getElementById("category1").value = data.category.name
            document.getElementById("user1").value = data.user.name

        }
    })
    $('#exampleModal1').modal('show');
}


function updateProduct() {
    let form = new FormData();
    let name = $('#name1').val();
    let price = $('#price1').val();
    let description = $('#description1').val();
    let category = $('#category1').val();
    let user = $('#user1').val();
    let image = $('#image1')[0].files[0];
    let product = {
        id: idProduct,
        name: name,
        price: price,
        description: description,
        category: {
            id: category
        },
        user: {
            id: user
        }

    }
    form.append("file", image)
    form.append("food", new Blob([JSON.stringify(product)], {type: "application/json"}))
    $.ajax({
        type: "PUT",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food/" + idProduct,
        data: form,
        success: function () {
            getAllFood();
            alert("S???a th??nh c??ng!");
            $('#exampleModal1').modal('hide');
            document.getElementById("editForm").reset()
        }
    })
    event.preventDefault()
}

function search() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/search-by-name?name=" + seachName.value,
        success: function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable(data.content)

        }
    })
    event.preventDefault()
}

function search1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/search-by-name?name=" + seachName1.value,
        success: function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable1(data.content)

        }
    })
    event.preventDefault()
}

function searchCate(a) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/search_category?id=" + a,
        success: function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable(data.content)

        }
    })
    event.preventDefault()
}

function searchCate1(a) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/search_category?id=" + a,
        success: function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable1(data.content)

        }
    })
    event.preventDefault()
}

function searchCate1(a) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/search_category?id=" + a,
        success: function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable1(data.content)

        }
    })
    event.preventDefault()
}


// Cart
function createItem(idFood, idUser) {
    console.log(idFood)
    let quantity = 1;
    let item = {
        quantity: quantity,
        cart: {
            id: idUser
        },
        product: {
            id: idFood
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(item),
        //t??n API
        url: "http://localhost:8080/api/carts/item",
        //x??? l?? khi th??nh c??ng
        success: function (data) {
            alert("Th??m th??nh c??ng ")
            console.log(data)
            getItemByCustomerId(idUser)
        }
    });
    //ch???n s??? ki???n m???c ?????nh c???a th???
    // event.preventDefault();

}

let foods = [];

// Create Cart
function createCart(idUser) {
    let cart = {
        user: {
            id: idUser
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(cart),
        //t??n API
        url: "http://localhost:8080/api/carts",
        //x??? l?? khi th??nh c??ng
        success: function () {
        }
    });
    //ch???n s??? ki???n m???c ?????nh c???a th???
    event.preventDefault();
}


// T??m ki???m Item theo ID ng?????i d??ng
getItemByCustomerId(1)

function getItemByCustomerId(idUser) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/carts/item/" + 1,
        success: function (data) {
            console.log(data)
            displayItem(data)
        }
    })
}

//
// function displayItem(items) {
//     let content = "";
//     let content1 = "";
//     for (let i = 0; i < items.length; i++) {
//         content += " <div class=\"cart-row\">\n" +
//             "                                    <div class=\"cart-item cart-column\">\n" +
//             "                                                                        <img class=\"cart-item-image\" src=\"https://bizweb.dktcdn.net/thumb/large/100/228/168/products/sualai.jpg?v=1573720306000\" width=\"100\" height=\"100\">\n"+
//             // "                                                                        <img class=\"cart-item-image\" src=\"'+\"http://localhost:8080/Image/" + iteams[i].product.imageUrl  +'\" width=\"100\" height=\"100\">\n"+
//             // "                                        <img class=\"cart-item-image"  src="'+"http://localhost:8080/Image/"+iteams[i].product.imageUrl+'" width="100" height="100">\n" +
//         //     "             <th>"+ '<img cart-item-image"  src="'+"http://localhost:8080/Image/" + iteams[i].product.imageUrl  +'"  width="100" height="100\">' + "</th>"+
//         // " <th>"+ '<img class="img-fluid w-100"  src="'+"http://localhost:8080/Image/" + data[i].imageUrl  +'"  width="400" height="400">' + "</th>"+
//
//         "                                        <span class=\"cart-item-title\">"+items[i].product.name+"</span>\n" +
//             "                                    </div>\n" +
//             "                                    <span class=\"cart-price cart-column\">"+items[i].product.price+"</span>\n" +
//             "                                    <div class=\"cart-quantity cart-column\">\n" +
//             "                                        <input class=\"cart-quantity-input\" type=\"number\" value=\"1\">\n" +
//             "                                        <button class=\"btn btn-danger\" onclick='deleteItem("+items[i].id+")'>Delete</button>\n" +
//             "                                    </div>\n" +
//             "                                </div>"
//     }
//     let subtotal = 0
//     let countItem = 0
//     for (let i = 0; i < items.length; i++) {
//         let totalItem = items[i].product.price* items[i].quantity;
//        subtotal += totalItem
//         countItem ++;
//     }
//     // localStorage.setItem("count-item", countItem)
//     // let discount = 0;
//     // let ship = 0;
//     content1 += "  <span class=\"cart-total-price\">"+subtotal+"</span>"
//     // document.getElementById('display-item-shop').innerHTML = content
//     // document.getElementById('count-item').innerHTML = localStorage.getItem("count-item")
//     document.getElementById('cart-total').innerHTML = content
//     document.getElementById('cart-total1').innerHTML = content1 +"VN??"
// }

function deleteItem(idItem) {

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/carts/item/" + idItem,
        success: function () {
            deleteComfirm(idItem)
        }

    })

}


function displayItem(items) {
    let content = "";
    let content1 = "";
    for (let i = 0; i < items.length; i++) {
        content += " <div class=\"cart-row\">\n" +
            "                                    <div class=\"cart-item cart-column\">\n" +
            "                                                                        <img class=\"cart-item-image\" src=" + "http://localhost:8080/Image/" + items[i].product.imageUrl + " width=\"100\" height=\"100\">\n" +

            "                                        <span class=\"cart-item-title\">" + items[i].product.name + "</span>\n" +
            "                                    </div>\n" +
            "                                    <span class=\"cart-price cart-column\">" + items[i].product.price + "</span>\n" +
            "                                    <div class=\"cart-quantity cart-column\">\n" +
            "                                        <input class=\"cart-quantity-input\" type=\"number\" value=\"1\">\n" +
            "                                        <button class=\"btn btn-danger\" onclick='deleteItem(" + items[i].id + ")'>Delete</button>\n" +
            "                                    </div>\n" +
            "                                </div>"
    }
    let subtotal = 0
    let countItem = 0
    for (let i = 0; i < items.length; i++) {
        let totalItem = items[i].product.price * items[i].quantity;
        subtotal += totalItem
        countItem++;
    }
    // localStorage.setItem("count-item", countItem)
    // let discount = 0;
    // let ship = 0;
    content1 += "  <span class=\"cart-total-price\">" + subtotal + "</span>"
    // document.getElementById('display-item-shop').innerHTML = content
    // document.getElementById('count-item').innerHTML = localStorage.getItem("count-item")
    document.getElementById('cart-total').innerHTML = content
    document.getElementById('cart-total1').innerHTML = content1 + "VN??"
}


// update cart
// function updatecart() {
//     var cart_item = document.getElementsByClassName("cart-items")[0];
//     var cart_rows = cart_item.getElementsByClassName("cart-row");
//     var total = 0;
//     for (var i = 0; i < cart_rows.length; i++) {
//         var cart_row = cart_rows[i]
//         var price_item = cart_row.getElementsByClassName("cart-price ")[0]
//         var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
//         var price = parseFloat(price_item.innerText)// chuy???n m???t chu???i string sang number ????? t??nh t???ng ti???n.
//         var quantity = quantity_item.value // l???y gi?? tr??? trong th??? input
//         total = total + (price * quantity)
//     }
//     document.getElementsByClassName("cart-total-price")[0].innerText = total + 'VN??'
//     // Thay ?????i text = total trong .cart-total-price. Ch??? c?? m???t .cart-total-price n??n m??nh s??? d???ng [0].


// thay ?????i s??? l?????ng s???n ph???m
// var quantity_input = document.getElementsByClassName("cart-quantity-input");
// for (var i = 0; i < quantity_input.length; i++) {
//     var input = quantity_input[i];
//     input.addEventListener("change", function (event) {
//         var input = event.target
//         if (isNaN(input.value) || input.value <= 0) {
//             input.value = 1;
//         }
//         updatecart()
//     })


