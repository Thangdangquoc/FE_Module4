let table = document.getElementById("listFood");
let seachName = document.getElementById("search_name");
getAllFood();
listCategory1();

function getAllFood(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/food",
        success :function (data) {
            console.log(data)
            displayTable(data);
        }
    })
}
function displayTable(data){
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result +="<div class=\"col-xl-3 col-lg-4 col-md-6 wow fadeInUp\" data-wow-delay=\"0.3s\">\n" +
            "                            <div class=\"product-item\">\n" +
            "                                <div class=\"position-relative bg-light overflow-hidden\">\n" +
            // "                                    <img  src="'+"http://localhost:8080/Image/" + data[i].imageUrl  +'"  width="100" height="100">\n" +
            " <th>"+ '<img class="img-fluid w-100"  src="'+"http://localhost:8080/Image/" + data[i].imageUrl  +'"  width="400" height="400">' + "</th>"+

            "                                    <div class=\"bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3\">New</div>\n" +
            "                                </div>\n" +
            "                                <div class=\"text-center p-4\">\n" +
            "                                    <a class=\"d-block h5 mb-2\" href=\"\">"+data[i].name+"</a>\n" +
            "                                    <span class=\"text-primary me-1\">"+ data[i].price +"VNĐ"+"</span>\n" +
            "                                    <span class=\"text-body text-decoration-line-through\">$29.00</span>\n" +
            "                                </div>\n" +
            "                                <div class=\"d-flex border-top\">\n" +
            "                                    <small class=\"w-50 text-center border-end py-2\">\n" +
            "                                        <a class=\"text-body\" onclick='showEditForm("+data[i].id+")'><i class=\"fa fa-eye text-primary me-2\" ></i>Edit</a>\n" +
            "                                    </small>\n" +
            "                                    <small class=\"w-50 text-center py-2\">\n" +
            "                                        <a class=\"text-body\" onclick='deleteComfirm("+data[i].id+")'><i class=\"fa fa-shopping-bag text-primary me-2\" ></i>Delete</a>\n" +
            "                                    </small>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </div>\n"

    }
    table.innerHTML = result;

}
function showCreate(){
    $('#exampleModal').modal('show');
    listCategory()
    listUser()
}



function createProduct(){
    let form = new FormData();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let user = $('#user').val();
    let image = $('#image')[0].files[0];
    let product ={
        name : name,
        price : price,
        description : description,
        category : {
            id : category
        },
        user : {
            id : user
        }

    }
    form.append("file",image)
    form.append("food",new Blob([JSON.stringify(product)],{type : "application/json"}))
    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food",
        data: form,
        success:function (){
            getAllFood();
            alert("Tạo thành công!");
            $('#exampleModal').modal('hide');
            document.getElementById("addForm").reset()
        }
    })
    event.preventDefault()
}


function listCategory(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/categories",
        success: function (listCategory){
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result += "<option value="+listCategory[i].id+">"+ listCategory[i].name +"</option>"
            }
            document.getElementById("category").innerHTML = result;
            document.getElementById("category1").innerHTML = result;
        }
    })
}
function listCategory1(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/categories",
        success: function (listCategory){
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result+="<li class=\"nav-item me-2\">\n" +
                    "                        <a class=\"btn btn-outline-primary border-2 active\" data-bs-toggle=\"pill\"\n" +
                    "                           href=\"#tab-1\" value="+listCategory[i].id +">"+ listCategory[i].name +"</a>\n" +
                    "                    </li>"



                // result += "<a class=\"btn btn-outline-primary border-2 active\" data-bs-toggle=\"pill\"\n" +
                //     " href=\"#tab-1\" value="+listCategory[i].id +">"+ listCategory[i].name +"</a>"
            }
            document.getElementById("category3").innerHTML = result;
        }
    })
}
function listUser(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/user",
        success: function (listUser){
            result = ""
            for (let i = 0; i < listUser.length; i++) {
                result += "<option value="+listUser[i].id+">"+ listUser[i].name +"</option>"
            }
            document.getElementById("user").innerHTML = result;
            document.getElementById("user1").innerHTML = result;
        }
    })
}



function deleteComfirm(id){
    let result = confirm("Bạn có muốn xóa không?")
    if (result){
        deleteProduct(id);
    }
}
function deleteProduct(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/food/"+ id,
        success: function (){
            getAllFood()
            alert("Xóa thành công")
        }
    })
}

let idProduct;
function showEditForm(id){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/" + id,
        success: function (data) {
            listCategory()
            listUser()
            console.log(id)
            idProduct = data.id;
            document.getElementById("name1").value = data.name
            document.getElementById("price1").value = data.price
            document.getElementById("description1").value = data.description
            document.getElementById("image1").value = data.image
            document.getElementById("category1").value = data.category.name
            document.getElementById("user1").value = data.user.name

        }
    })
    $('#exampleModal1').modal('show');
}



function updateProduct(){
    let form = new FormData();
    let name = $('#name1').val();
    let price = $('#price1').val();
    let description = $('#description1').val();
    let category = $('#category1').val();
    let user = $('#user1').val();
    let image = $('#image1')[0].files[0];
    let product ={
        id: idProduct,
        name : name,
        price : price,
        description : description,
        category : {
            id : category
        },
        user : {
            id : user
        }

    }
    form.append("file",image)
    form.append("food",new Blob([JSON.stringify(product)],{type : "application/json"}))
    $.ajax({
        type: "PUT",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food/" + idProduct,
        data: form,
        success:function (){
            getAllFood();
            alert("Sửa thành công!");
            $('#exampleModal1').modal('hide');
            document.getElementById("editForm").reset()
        }
    })
    event.preventDefault()
}

function search(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/food/search-by-name?name="+ seachName.value,
        success :function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable(data.content)

        }})}


//Tìm kiếm theo category
function searchCategory(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/food/search-category?name="+ seachName.value,
        success :function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable(data.content)

        }})}

// Tạo category
function formCreateCategory() {
    $('#exampleModal3').modal('show');
}
function createCategory(){
    let name = $('#nameCategory').val()
    let category = {
        name : name
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/categories",
        data: JSON.stringify(category),
        success: function (){
            getAllFood();
            alert("Tạo thành công!");
            $('#exampleModal3').modal('hide');
            document.getElementById("addFormCategory").reset()
        }
    })
    event.preventDefault()
}
