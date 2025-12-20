"use strict";

let CartInfo = [];

const restaurantContainer = document.querySelector(".Resturant-list");
restaurantContainer.innerHTML = ""; // Clear existing content once

const restaurantItemsCOntainer = document.querySelector(".Resturant-item-list");
restaurantItemsCOntainer.innerHTML = ""; // Clear existing content once

const cartItemsContainer = document.querySelector(".cart-item-list");
cartItemsContainer.innerHTML = ""; // Clear existing content once

const mainContent = document.querySelector(".main-content");
const menuContent = document.querySelector(".menu-content");
const cartContent = document.querySelector(".cart-content");

mainContent.classList.remove("hidden");
menuContent.classList.add("hidden");
cartContent.classList.add("hidden");

fetch("http://localhost:3001/ResturantList")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
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
  fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then((Respdata) => {
      console.log(Respdata);
      const Itemdata = Respdata.recipes;
      for (let i = 0; i < Itemdata.length; i++) {
        const Itemcard = `
    <div class="Resturant-item-info">
      <div class="Resturant-item-details">
        <h3 class="child" >${Itemdata[i].name}</h3>
        <p class="child">${Itemdata[i].cuisine}</p>
        <p class="child">${Itemdata[i].rating}&starf;</p>
      </div>
      <div class="Resturant-item-image">
        <img src="${Itemdata[i].image}" alt="Item image" class="Resturant-item-img"  />
        <button class="Add-btn" onclick="AddToCart(${Itemdata[i].id},${Itemdata[i].name},${Itemdata[i].cuisine},${Itemdata[i].rating},${Itemdata[i].image})">ADD</button>
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

function AddToCart(recipeId, name, type, rating, image) {
  console.log("recipeId=", recipeId);
  const ItemDetails = {
    ItemId: recipeId,
    ItemName: name,
    ItemType: type,
    ItemRating: rating,
    ItemImage: image,
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
  let cartItemString = "";
  for (let j = 0; j < CartInfo.length; j++) {
    // const ItemIdVal = CartInfo[j];
    cartItemString = `
    <div class="cart-item-info">
      <div class="cart-item-details">
        <h3 class="child" >${CartInfo[j].name}</h3>
        <p class="child">${CartInfo[j].cuisine}</p>
        <p class="child">${CartInfo[j].rating}&starf;</p>
        <h4 class="child">&#8377;${CartInfo[j].price}</h4>
      </div>
      
      <div class="cart-item-image">
        <img src="${CartInfo[j].image}" alt="Item image" class="cart-item-img"  />
        <div class="Item-qty-btns"><button class="minus-btn" onclick="DecreaseQuantity(${CartInfo[j].ItemId})">-</button><span class="Item-qty-value">${CartInfo[j].quantity}</span><button class="plus-btn"  onclick="IncreaseQuantity(${CartInfo[j].ItemId})">+</button></div>
      </div>
    </div>
  `;
    // console.log(cartItemString);
    cartItemsContainer.insertAdjacentHTML("beforeend", cartItemString);
  }
}

function DecreaseQuantity(ItemId) {
  for (let x = 0; x < CartInfo.length; x++) {
    if (CartInfo[x].ItemId == ItemId && CartInfo[x].quantity > 1) {
      CartInfo[x].quantity -= 1;
    }
  }
  myCartItems();
}

function IncreaseQuantity(ItemId) {
  for (let x = 0; x < CartInfo.length; x++) {
    if (CartInfo[x].ItemId == ItemId && CartInfo[x].quantity > 1) {
      CartInfo[x].quantity += 1;
    }
  }
  myCartItems();
}
