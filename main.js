let url = "https://vishal-backend-hjq4.onrender.com/products";

// ==========get data by fetch============

let getData = async () => {
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  renderDom(data);
  console.log("vishal");
};
getData();
document.getElementById("add_product").addEventListener("click", (event) => {
  event.preventDefault();
  addproduct();
  // window.location.reload()
});

// ===========add product to api=========

let addproduct = async () => {
  // let product_data = {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;
  let delivery = document.getElementById("delivery").value;
  let image = document.getElementById("image").value;

  //   =========create aobject using ES6===========

  function product_data(name, price, description, delivery, image) {
    this.name = name;
    this.price = +price;
    this.description = description;
    this.delivery = delivery;
    this.image = image;
  }
  let product_detail = new product_data(
    name,
    price,
    description,
    delivery,
    image
  );

  // =======add data to server using POST ============

  let res = await fetch(`${url}`, {
    method: "POST",
    body: JSON.stringify(product_detail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  console.log(data);
  getData();
  // window.location.reload()
};

// =======append data to dom============

let renderDom = (data) => {
  let cont = document.getElementById("container");
  cont.innerHTML = null;
  console.log(data);
  if (data.length == 0) {
    cont = document.getElementById("container");

    let name = document.createElement("h2");
    name.setAttribute("class", "empty");
    name.innerText = "No Products To Show Right Now...";
    cont.append(name);
  }
  data.forEach((ele) => {
    let div = document.createElement("div");
    div.setAttribute("class", "item");
    let name = document.createElement("p");
    name.innerText = "Product Name :-" + ele.name;

    let price = document.createElement("p");
    price.innerText = "Product Price :- Rs-" + ele.price;
    price.setAttribute("class", "product_price");

    let description = document.createElement("p");
    description.innerText = "Product Description :-" + ele.description;

    let delivery = document.createElement("p");
    delivery.innerText = "Added Date :-" + ele.delivery;
    delivery.setAttribute("class", "product_delivery");

    let image = document.createElement("img");
    image.src = ele.image;

    //         ==========delete function to delete items============

    let del = document.createElement("button");
    del.innerText = "Remove Product ";
    del.setAttribute("class", "remove_item");

    del.onclick = () => {
      deleteITem(ele.id);
    };

    //         =======update function to update price==========

    let update = document.createElement("button");
    update.innerText = "Update Price";
    update.setAttribute("class", "update_price");
    update.onclick = () => {
      updateItem(ele.id);
    };

    div.append(name, price, description, delivery, del, update, image);
    cont.append(div);
  });
};
// ===========delete item form server using DELETE============
let deleteITem = async (id) => {
  let res = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  getData();
};

// ===========update price in json server using UPDATE==============

let updateItem = async (id) => {
  const new_price = prompt("Enter new price");
  let price = { price: +new_price };
  let res = await fetch(`${url}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(price),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  getData();
};

// ============sort data using url============

// extensioin for sort low to high  url == (?_sort=price&_order=asc)

let low = async () => {
  let res = await fetch(`${url}?_sort=price&_order=asc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  renderDom(data);
};
// ============sort data using url============

// extensioin for sort high to low  url == (?_sort=price&_order=desc)

let high = async () => {
  let res = await fetch(`${url}?_sort=price&_order=desc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await res.json();
  renderDom(data);
};

// =======filter data using url===========

let lesser = async () => {
  let res = await fetch(`${url}?price_gte=4000`);
  let data = await res.json();
  renderDom(data);
};

let greater = async () => {
  let res = await fetch(`${url}?price_lte=4000`);
  let data = await res.json();
  renderDom(data);
};