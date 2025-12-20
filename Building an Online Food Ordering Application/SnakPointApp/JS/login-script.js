"use strict";

const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const AlertContent = document.querySelector(".alert-content");

function FormResetFun() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function FormSubmitFun() {
  let emailId = document.getElementById("email").value;
  let Password = document.getElementById("password").value;

  if (emailId.trim() != "" && Password.trim() != "") {
    if (emailId.trim() == "admin@gmail.com" && Password.trim() == "Admin@123") {
      //alert("Logged-In Successfully");
      AlertContent.textContent = "Logged-In Successfully";
      DisplayAlert();
      window.location.href = "./dashboard.html";
      return true;
    } else {
      // alert("LogIn Credentails are not matching");
      AlertContent.textContent = "LogIn Credentails are not matching";
      DisplayAlert();
      return false;
    }
  } else {
    // alert("Enter Email Address and Password");
    AlertContent.textContent = "Enter Email Address and Password";
    DisplayAlert();
    return false;
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
