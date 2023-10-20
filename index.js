//firebaseIntegration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://emailsignup-7d44c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const subscriberListInDB = ref(database, "subscriberList")


// input elements
const firstNameInput = document.getElementById("firstNameInput")
const lastNameInput = document.getElementById("lastNameInput")
const emailInput = document.getElementById("emailInput")
const passwordInput = document.getElementById("passwordInput")

const submitBtn = document.getElementById("submitButton")


//error variables
const errorFirstNameMsg = document.getElementById("errorFirstName")
const errorFirstNameIcn = document.getElementById("errorIconFirstName")
const errorLastNameMsg = document.getElementById("errorLastName")
const errorLastNameIcn = document.getElementById("errorIconLastName")
const errorEmailMsg = document.getElementById("errorEmail")
const errorEmailIcn = document.getElementById("errorIconEmail")
const errorPasswordMsg = document.getElementById("errorPassword")
const errorPasswordIcn = document.getElementById("errorIconPassword")

//Regex for checking

const firstNameRegEx = /^[^\d]{3,}$/;
const lastNameRegEx = /^[^\d]{3,}$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRexEx =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;


//first name logic
let firstNameValidity = false
let firstName = ""

firstNameInput.addEventListener("change", function(event){
    firstName = event.target.value;
    console.log(firstName)

    if (firstNameRegEx.test(firstName)) {
        console.log("valid")
        firstNameInput.classList.remove("inputError")
        errorFirstNameMsg.style.display = "none"
        errorFirstNameIcn.style.display = "none"
        firstNameInput.style.marginBottom = "20px"
        firstNameInput.style.border = "1px solid #DEDEDE"
        firstNameValidity = true
    } else {
        firstNameInput.className = "inputError"
        errorFirstNameMsg.style.color = "#FF7979"
        errorFirstNameMsg.style.display = "block"
        errorFirstNameIcn.style.display = "block"
        firstNameInput.style.marginBottom = "0"
        firstNameInput.style.border = "2px solid #FF7979"
    }
    console.log(firstNameValidity)
})

// last name logic 

let lastNameValidity = false;
let lastName = ""

lastNameInput.addEventListener("change", function(event){
    lastName = event.target.value;
    console.log(lastName)

    if (lastNameRegEx.test(lastName)) {
        
        console.log("valid")
        lastNameInput.classList.remove("inputError")
        errorLastNameMsg.style.display = "none"
        errorLastNameIcn.style.display = "none"
        lastNameInput.style.marginBottom = "20px"
        lastNameInput.style.border = "1px solid #DEDEDE"
        lastNameValidity = true
    } else {
        lastNameInput.className = "inputError"
        errorLastNameMsg.style.display = "block"
        errorLastNameMsg.style.color = "#FF7979"
        errorLastNameIcn.style.display = "block"
        lastNameInput.style.marginBottom = "0"
        lastNameInput.style.border = "2px solid #FF7979"
    }
    console.log(lastNameValidity)
})



// email logic 

let emailValidity = false;
let email = ""

emailInput.addEventListener("change", function(event){
    email = event.target.value;
    console.log(email)

    if (emailRegEx.test(email)) {
        console.log("valid")
        emailInput.classList.remove("inputError")
        errorEmailMsg.style.display = "none"
        errorEmailIcn.style.display = "none"
        emailInput.style.marginBottom = "20px"
        emailInput.style.border = "1px solid #DEDEDE"
        emailValidity = true
    } else {
        emailInput.className = "inputError"
        errorEmailMsg.style.display = "block"
        errorEmailMsg.style.color = "#FF7979"
        errorEmailIcn.style.display = "block"
        emailInput.style.marginBottom = "0"
        emailInput.style.border = "2px solid #FF7979"
    }
    console.log(emailValidity)
    console.log(email)
})


// pw logic 

let passwordValidity = false;
let password = ""

passwordInput.addEventListener("change", function(event){
    password = event.target.value;
    console.log(password)

    if (passwordRexEx.test(password)) {
        console.log("valid")
        passwordInput.classList.remove("inputError")
        errorPasswordMsg.style.display = "none"
        errorEmailMsg.style.color = "#FF7979"
        errorPasswordIcn.style.display = "none"
        passwordInput.style.marginBottom = "20px"
        passwordInput.style.border = "1px solid #DEDEDE"
        passwordValidity = true
    } else {
        passwordInput.className = "inputError"
        errorPasswordMsg.style.display = "block"
        errorPasswordMsg.style.color = "#FF7979"
        errorPasswordMsg.textContent = "Passwords must contain at least 8 characters, numbers or symbols"
        errorPasswordIcn.style.display = "block"
        passwordInput.style.marginBottom = "0"
        passwordInput.style.border = "2px solid #FF7979"
    }
    console.log(emailValidity)
})


//logic submit button 

let inputBox = document.getElementsByClassName("input-box")
let trialBox = document.getElementById("trialContainer")
let terms = document.getElementById("terms")
let success = document.getElementById("success")

submitBtn.addEventListener("click", function(){
    
    if(firstNameValidity === true && lastNameValidity === true && emailValidity === true && passwordValidity === true) {
        let newSubscriber = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        } 

        push(subscriberListInDB, newSubscriber)
        console.log("success")

       //success message logic
        trialBox.style.display = "none"
        for(let i = 0; i < inputBox.length; i++) {
            inputBox[i].style.display = "none";
        }
        submitBtn.style.display = "none"
        terms.style.display = "none"
        success.style.display = "block"
    } 
    else if (firstNameValidity === false ) {
        firstNameInput.focus()
        firstNameInput.style.border = "2px solid #38CC8B"
        firstNameInput.style.color = "#000"
        errorFirstNameMsg.style.display = "block"
        errorFirstNameMsg.style.color = "#38CC8B"
        errorFirstNameMsg.textContent = "First Name is required"
        errorFirstNameMsg.style.display = "block"
        errorFirstNameIcn.style.display = "none"
        firstNameInput.style.marginBottom = "0"
    } 
    else if (lastNameValidity === false) {
        lastNameInput.focus()
        lastNameInput.style.border = "2px solid #38CC8B"
        lastNameInput.style.color = "#000"
        errorLastNameMsg.style.display = "block"
        errorLastNameMsg.style.color = "#38CC8B"
        errorLastNameMsg.textContent = "Last Name is required"
        errorLastNameMsg.style.display = "block"
        
        errorLastNameIcn.style.display = "none"
        lastNameInput.style.marginBottom = "0"
    } 
    else if (emailValidity === false) {
        emailInput.focus()
        emailInput.style.border = "2px solid #38CC8B"
        errorEmailInput.style.color = "#000"
        errorEmailMsg.style.display = "block"
        errorEmailMsg.style.color = "#38CC8B"
        errorEmailMsg.textContent = "Email is required"
        errorEmailMsg.style.display = "block"
        
        errorLastNameIcn.style.display = "none"
        emailInput.style.marginBottom = "0"
    }
    else if (passwordValidity === false) {
        passwordInput.focus()
        passwordInput.style.border = "2px solid #38CC8B"
        passwordInput.style.color = "#000"
        errorPasswordMsg.style.display = "block"
        errorPasswordMsg.style.color = "#38CC8B"
        errorPasswordMsg.textContent = "Password is required"
        errorPasswordMsg.style.display = "block"
        
        errorLastNameIcn.style.display = "none"
        passwordInput.style.marginBottom = "0"
    }
})