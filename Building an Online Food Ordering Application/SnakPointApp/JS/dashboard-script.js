"use strict";

let CartInfo = [];

const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const AlertContent = document.querySelector(".alert-content");

const restaurantContainer = document.querySelector(".Resturant-list");
restaurantContainer.innerHTML = ""; // Clear existing content once

const restaurantItemsCOntainer = document.querySelector(".Resturant-item-list");
restaurantItemsCOntainer.innerHTML = ""; // Clear existing content once

const cartItemsContainer = document.querySelector(".cart-item-list");
// cartItemsContainer.innerHTML = ""; // Clear existing content once

const ordersItemsContainer = document.querySelector(".orders-item-list");
// ordersItemsContainer.innerHTML = ""; // Clear existing content once

const mainContent = document.querySelector(".main-content");
const menuContent = document.querySelector(".menu-content");
const cartContent = document.querySelector(".cart-content");
const paymentContent = document.querySelector(".payment-content");
const ordersContent = document.querySelector(".orders-content");

const homeLink = document.querySelector(".home-link");
const aboutLink = document.querySelector(".about-link");
const paymentLink = document.querySelector(".payment-link");
const ordersLink = document.querySelector(".orders-link");
const cartLink = document.querySelector(".cart-link");
const contactsLink = document.querySelector(".contacts-link");
const addressLink = document.querySelector(".address-link");

homeLink.style.color = "#f04141ff";
ordersLink.style.color = "#fafafa";
cartLink.style.color = "#fafafa";
paymentLink.style.color = "#fafafa";

const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.name); // Alice
document.querySelector(".logged-in-username").textContent = userData.name;

mainContent.classList.remove("hidden");
menuContent.classList.add("hidden");
cartContent.classList.add("hidden");
paymentContent.classList.add("hidden");
ordersContent.classList.add("hidden");

// fetch("http://localhost:3001/ResturantList")
fetch("./Server/db.json")
  .then((res) => res.json())
  .then((respdata) => {
    console.log(respdata);
    let data = respdata.ResturantList;
    let infoDiv;
    for (let i = 0; i < data.length; i++) {
      const card = `
    <div class="Resturant-info">
      <div class="Resturant-details">
        <h3 class="child" onclick="LoadRestaurantItems(${data[i].restaurantID})">${data[i].restaurantName}</h3>
        <p class="child">${data[i].type}</p>
        <p class="child">${data[i].address}</p>
        <p class="child"></p>
      </div>
      <div class="Resturant-image">
        <img src="assets/snak-img1.jpg" alt="Restaurant image" class="Resturant-img"  onclick="LoadRestaurantItems(${data[i].restaurantID})"/>
      </div>
    </div>
  `;
      restaurantContainer.insertAdjacentHTML("beforeend", card);
    }
  })
  .catch((error) => {
    // Handle any errors
    console.error("There was a problem with the fetch operation:", error);
  });

function LoadRestaurantItems(RestaurantId) {
  mainContent.classList.add("hidden");
  menuContent.classList.remove("hidden");
  cartContent.classList.add("hidden");
  paymentContent.classList.add("hidden");
  ordersContent.classList.add("hidden");
  fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then((Respdata) => {
      console.log(Respdata);
      const Itemdata = Respdata.recipes;
      for (let i = 0; i < Itemdata.length; i++) {
        let CartItemValues =
          Itemdata[i].id +
          "##" +
          Itemdata[i].name +
          "##" +
          Itemdata[i].cuisine +
          "##" +
          Itemdata[i].rating +
          "##" +
          Itemdata[i].image;

        const Itemcard = `
    <div class="Resturant-item-info">
      <div class="Resturant-item-details">
        <h3 class="child" >${Itemdata[i].name}</h3>
        <p class="child">${Itemdata[i].cuisine}</p>
        <p class="child">${Itemdata[i].rating}&starf;</p>
      </div>
      <div class="Resturant-item-image">
        <img src="${Itemdata[i].image}" alt="Item image" class="Resturant-item-img"  />
        <button class="Add-btn" onclick="AddToCart('${CartItemValues}')">ADD</button>
      </div>
    </div>
  `;
        restaurantItemsCOntainer.insertAdjacentHTML("beforeend", Itemcard);
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

function AddToCart(CartItemDetails) {
  console.log("CartItemDetails=", CartItemDetails);
  const CartItemInfo = CartItemDetails.split("##");
  // console.log(CartItemInfo);
  const ItemDetails = {
    ItemId: CartItemInfo[0],
    ItemName: CartItemInfo[1],
    ItemType: CartItemInfo[2],
    ItemRating: CartItemInfo[3],
    ItemImage: CartItemInfo[4],
    quantity: 1,
    price: 100,
  };
  CartInfo.push(ItemDetails);
  console.log(CartInfo);
}

function myCartItems() {
  mainContent.classList.add("hidden");
  menuContent.classList.add("hidden");
  cartContent.classList.remove("hidden");
  paymentContent.classList.add("hidden");
  ordersContent.classList.add("hidden");

  homeLink.style.color = "#fafafa";
  ordersLink.style.color = "#fafafa";
  cartLink.style.color = "#f04141ff";
  paymentLink.style.color = "#fafafa";

  ShowCartItems();
}

function ShowCartItems() {
  cartItemsContainer.innerHTML = ""; // Clear existing content once

  let cartItemString = "";
  let CartItemTotal = 0;
  for (let j = 0; j < CartInfo.length; j++) {
    CartItemTotal += CartInfo[j].price * CartInfo[j].quantity;
    cartItemString = `
    <div class="cart-item-info">
      <div class="cart-item-details">
        <h3 class="child" >${CartInfo[j].ItemName}</h3>
        <p class="child">${CartInfo[j].ItemType}</p>
        <p class="child">${CartInfo[j].ItemRating}&starf;</p>
        <h4 class="child">&#8377;${CartInfo[j].price}</h4>
      </div>
      
      <div class="cart-item-image">
        <img src="${CartInfo[j].ItemImage}" alt="Item image" class="cart-item-img"  />
        <div class="Item-qty-btns"><button class="minus-btn" onclick="DecreaseQuantity(${CartInfo[j].ItemId})">-</button><span class="Item-qty-value">${CartInfo[j].quantity}</span><button class="plus-btn"  onclick="IncreaseQuantity(${CartInfo[j].ItemId})">+</button></div>
      </div>
    </div>    
  `;
    // console.log(cartItemString);
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemString);
  }
  let itemsRowList = "";
  let itemTotalStr = "";
  let cartItemTotalStr = "";
  let FinalCartTotalString = "";
  cartItemTotalStr = `
    <div class="cart-item-bill" id="table">
            <div class="tr">
              <p class="th">Item Name</p>
              <p class="th">Item Price</p>
            </div>`;
  for (let l = 0; l < CartInfo.length; l++) {
    let ItemPice = CartInfo[l].price * CartInfo[l].quantity;
    itemsRowList += `<div class="tr">
              <p class="td">${CartInfo[l].ItemName}(${CartInfo[l].quantity})</p>
              <p class="td">&#8377;${ItemPice}</p>
            </div>`;
  }
  itemTotalStr = `<div class="tr total">
              <p class="th">Total:</p>
              <p class="th">&#8377;${CartItemTotal}</p>
            </div>
          </div>
          <div class="cart-item-order">
            <button class="order-btn" onclick="goToPaymentPage(${CartItemTotal})">Place Order</button>
            <button class="cancel-btn" onclick="goBackToMenuPage()">Cancel</button>
          </div>
  `;
  FinalCartTotalString = cartItemTotalStr + itemsRowList + itemTotalStr;
  cartItemsContainer.insertAdjacentHTML("beforeend", FinalCartTotalString);
}

function DecreaseQuantity(ItemId) {
  for (let x = 0; x < CartInfo.length; x++) {
    if (Number(CartInfo[x].ItemId) == ItemId && CartInfo[x].quantity > 1) {
      CartInfo[x].quantity -= 1;
    }
  }
  console.log(CartInfo);
  ShowCartItems();
}

function IncreaseQuantity(ItemId) {
  // console.log("Inside of IncreaseQuantity");
  // debugger;
  for (let x = 0; x < CartInfo.length; x++) {
    if (Number(CartInfo[x].ItemId) == ItemId && CartInfo[x].quantity > 0) {
      CartInfo[x].quantity += 1;
    }
  }
  // debugger;
  console.log(CartInfo);
  ShowCartItems();
}

function goToPaymentPage(TotalPrice) {
  console.log("Inside of goToPaymentPage");
  mainContent.classList.add("hidden");
  menuContent.classList.add("hidden");
  cartContent.classList.add("hidden");
  paymentContent.classList.remove("hidden");
  ordersContent.classList.add("hidden");
  document.querySelector(".payment-value").innerHTML = "&#8377;" + TotalPrice;

  homeLink.style.color = "#fafafa";
  ordersLink.style.color = "#fafafa";
  cartLink.style.color = "#fafafa";
  paymentLink.style.color = "#f04141ff";

  const accordion1 = document.querySelector(".accordion1");
  const accordion2 = document.querySelector(".accordion2");

  accordion1.addEventListener("click", function () {
    console.log("Inside of accordian 1");
  });

  accordion2.addEventListener("click", function () {
    console.log("Inside of accordian 2");
  });
}

function goBackToMenuPage() {
  homeLink.style.color = "#f04141ff";
  ordersLink.style.color = "#fafafa";
  cartLink.style.color = "#fafafa";
  paymentLink.style.color = "#fafafa";
  location.href = "./dashboard.html";
}

function MakePaymentforFood(paymentType) {
  homeLink.style.color = "#fafafa";
  ordersLink.style.color = "#fafafa";
  cartLink.style.color = "#fafafa";
  paymentLink.style.color = "#f04141ff";
  if (paymentType == "credit") {
    const nameofcard = document.getElementById("name");
    const cardnumber = document.getElementById("card-number");
    const expiry = document.getElementById("expiration");
    const cvv = document.getElementById("cvv");
    if (nameofcard.value == "") {
      AlertContent.textContent = "Enter Name";
      DisplayAlert();
    } else if (cardnumber.value == "") {
      AlertContent.textContent = "Enter Card Number";
      DisplayAlert();
    } else if (expiry.value == "") {
      AlertContent.textContent = "Enter Expiry date";
      DisplayAlert();
    } else if (cvv.value == "") {
      AlertContent.textContent = "Enter CVV Number";
      DisplayAlert();
    } else {
      AlertContent.textContent = "Payment has been done successfully";
      DisplayAlert();
      setTimeout(() => goTomyOrders(), 2000);
      // setTimeout(() => (location.href = "./dashboard.html"), 2000);
      // location.href = "./dashboard.html";
    }
  } else if (paymentType == "debit") {
    const deb_nameofcard = document.getElementById("deb-name");
    const deb_cardnumber = document.getElementById("deb-card-number");
    const deb_expiry = document.getElementById("deb-expiration");
    const deb_cvv = document.getElementById("deb-cvv");
    if (deb_nameofcard.value == "") {
      AlertContent.textContent = "Enter Name";
      DisplayAlert();
    } else if (deb_cardnumber.value == "") {
      AlertContent.textContent = "Enter Card Number";
      DisplayAlert();
    } else if (deb_expiry.value == "") {
      AlertContent.textContent = "Enter Expiry date";
      DisplayAlert();
    } else if (deb_cvv.value == "") {
      AlertContent.textContent = "Enter CVV Number";
      DisplayAlert();
    } else {
      AlertContent.textContent = "Payment has been done successfully";
      DisplayAlert();
      // setTimeout(() => (location.href = "./dashboard.html"), 2000);
      setTimeout(() => goTomyOrders(), 2000);
    }
  }
}

function goTomyOrders() {
  console.log("Inside of goToPaymentPage");
  mainContent.classList.add("hidden");
  menuContent.classList.add("hidden");
  cartContent.classList.add("hidden");
  paymentContent.classList.add("hidden");
  ordersContent.classList.remove("hidden");

  homeLink.style.color = "#fafafa";
  ordersLink.style.color = "#f04141ff";
  cartLink.style.color = "#fafafa";
  paymentLink.style.color = "#fafafa";

  ordersItemsContainer.innerHTML = ""; // Clear existing content once

  let ordersItemString = "";
  for (let j = 0; j < CartInfo.length; j++) {
    let eachItemPrice = 0;
    eachItemPrice += CartInfo[j].price * CartInfo[j].quantity;
    ordersItemString = `
    <div class="orders-item-info">
      <div class="orders-item-details">
        <h3 class="child" >${CartInfo[j].ItemName}</h3>
        <p class="child">${CartInfo[j].ItemType}</p>
        <p class="child">Qty:${CartInfo[j].quantity}</p>
        <h4 class="child">&#8377;${eachItemPrice}</h4>
      </div>
      
      <div class="orders-item-image">
        <img src="${CartInfo[j].ItemImage}" alt="Item image" class="orders-item-img"  />
      </div>
    </div>    
  `;
    // console.log(cartItemString);
    ordersItemsContainer.insertAdjacentHTML("beforeend", ordersItemString);
  }
}

function DisplayAlert() {
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeAlert() {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
}

function LogoutPage() {
  location.href = "./login.html";
}
