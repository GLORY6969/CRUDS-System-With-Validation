// DECLARATION
var productName = document.getElementById("productName");
var alertmsg = document.getElementById("alert");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var products;
var temp;
var mood = "create";

// CHECK IF THAT IS THE FIRST TIME FOR THAT USER OR NO
if (localStorage.getItem("myproducts") == null) {
	products = [];
} else {
	products = JSON.parse(localStorage.getItem("myproducts", products));
	display();
}

// ADD PRODUCT FUNCTION
function addproduct() {
	if (validcheck() == true) {
		var product = {
			name: productName.value,
			price: productPrice.value,
			category: productCategory.value,
			description: productDescription.value,
		};
		if (mood === "create") {
			products.push(product);
		} else if (mood === "update");
		{
			products[temp] = product;
			addBtn.innerHTML = "Add Product";
		}
		localStorage.setItem("myproducts", JSON.stringify(products));
		cleardata();
		display();
		scroll({
			top: 100000,
			behavior: "smooth",
		});
		if (mood === "create") {
			toastr["success"]("New Product Added Successfully");
		} else if (mood === "update") {
			toastr["info"]("Product Updated Successfully");
			mood = "create";
		}
	} else {
		toastr["error"]("This Is Invalid Value");
	}
}

// CLEAR DATA FUNCTION
function cleardata() {
	productName.value = "";
	productPrice.value = "";
	productCategory.value = "";
	productDescription.value = "";
}

// SHOW DATA FUNCTION
function display() {
	var tableBody = ``;
	for (var i = 0; i < products.length; i++) {
		tableBody +=
			`<tr>
        <td class="index">` +
			(i + 1) +
			`</td>
        <td>` +
			products[i].name +
			`</td>
        <td>` +
			products[i].price +
			`</td>
        <td class="ProductCategory">` +
			products[i].category +
			`</td>
        <td class="ProductDesc">` +
			products[i].description +
			`</td>
        <td> <button onclick="updateProduct(` +
			i +
			`)" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProduct(` +
			i +
			`)" class="btn btn-outline-danger">delete</button> </td>
        </tr>`;
	}
	document.getElementById("tableBody").innerHTML = tableBody;
}

// SEARCH IN PRODUCTS FUNCTION
function searchProducts(searchInput) {
	var tableBodyInSearch = ``;
	for (var i = 0; i < products.length; i++) {
		if (
			products[i].name.toLowerCase().includes(searchInput.toLowerCase()) == true
		) {
			tableBodyInSearch +=
				`<tr>
        <td class="index">` +
				(i + 1) +
				`</td>
        <td>` +
				products[i].name +
				`</td>
        <td>` +
				products[i].price +
				`</td>
        <td class="ProductCategory">` +
				products[i].category +
				`</td>
        <td class="ProductDesc">` +
				products[i].description +
				`</td>
        <td> <button onclick="updateProduct(` +
				i +
				`)" class="btn btn-outline-warning">update</button> </td>
        <td> <button onclick="deleteProduct(` +
				i +
				`)" class="btn btn-outline-danger">delete</button> </td>
        </tr>`;
		}
	}
	document.getElementById("tableBody").innerHTML = tableBodyInSearch;
}

// DELETE PRODUCT FUNCTION
function deleteProduct(i) {
	products.splice(i, 1);
	localStorage.setItem("myproducts", JSON.stringify(products));
	toastr["error"]("Product Deleted Successfully");
	display();
}

// ADD PRODUCT FUNCTION
function updateProduct(i) {
	productName.value = products[i].name;
	productPrice.value = products[i].price;
	productCategory.value = products[i].category;
	productDescription.value = products[i].description;
	addBtn.innerHTML = "Update";
	mood = "update";
	temp = i;
	scroll({
		top: 0,
		behavior: "smooth",
	});
}

// ALERTS
function alert() {
	toastr.options = {
		closeButton: false,
		debug: false,
		newestOnTop: false,
		progressBar: false,
		positionClass: "toast-top-right",
		preventDuplicates: false,
		onclick: null,
		showDuration: "300",
		hideDuration: "1000",
		timeOut: "5000",
		extendedTimeOut: "1200",
		showEasing: "swing",
		hideEasing: "linear",
		showMethod: "fadeIn",
		hideMethod: "fadeOut",
	};
}

productName.addEventListener("keyup", validcheck);

function validcheck() {
	var Regex = /^[A-Z][a-z]{2,10}[0-9]?$/;
	if (Regex.test(productName.value) == true) {
		productName.classList.add("is-valid");
		productName.classList.remove("is-invalid");
		alertmsg.classList.replace("d-block", "d-none");
		return true;
	} else {
		productName.classList.add("is-invalid");
		productName.classList.remove("is-valid");
		alertmsg.classList.replace("d-none", "d-block");
		return false;
	}
}
