const addContact = document.querySelector('.add');
const displayModal = document.getElementById('first_modal');
const removeContact = document.getElementById('close');

addContact.addEventListener('click', () => {
    displayModal.style.display = "block";
});

removeContact.addEventListener('click', () => {
    displayModal.style.display = "none";
});

const submitBtn = document.getElementById('submit_btn');
const resetBtn = document.getElementById('reset_btn');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const phoneNumeber = document.getElementById('phone_number');

let ContactArray = [];

function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

document.addEventListener('DOMContentLoaded', () => {
    ContactArray[
        {
            firstName: "Eric",
            lastName: "Elliot",
            phoneNumeber: 08145663725
        }
    ]
    displayRecord();
});

function displayRecord() {
    ContactArray.forEach(function (singleContact) {
        addToList(singleContact);
    });
}

submitBtn.addEventListener('click', (e) => {
    const contact = new Contact(firstName.value, lastName.value, phoneNumeber.value);
    ContactArray.push(contact);
    addToList(contact);
    e.preventDefault();

    displayModal.style.display = "none";
    document.querySelectorAll('input').forEach((input) => {
        input.value ="";
    });
});

resetBtn.addEventListener('click', () => {
    document.querySelectorAll('input').forEach((input) => {
        input.value ="";
    });
});

function addToList(item) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('contact_list');
    newDiv.innerHTML = `
    <div>
        <p>
            <span>${item.firstName}</span>
            <span>${item.lastName}</span>
        </p>
        <p><img src="icons/call.svg" alt="phone">${item.phoneNumber}</p>
    </div>
    <img id="delete_btn" src="icons/delete.svg" alt="delete">
    `;
    document.querySelector('section').appendChild(newDiv);
}

document.addEventListener('click', event => {
   if (event.target.id === 'delete_btn') {
        alert("Do you want to delete this contact?");
        event.target.parentElement.style.animationPlayState = 'running';
        event.target.parentElement.addEventListener('animationend', () => {
            event.target.parentElement.remove();
        });
   }
});

const input = document.getElementById('input');
const section = document.getElementById('section');
let contactList = section.getElementsByClassName('contact_list');
const filter = () => {
    let filterValue = input.value.toUpperCase();
    for (let i = 0; i < contactList.length; i++) {
        if (contactList[i].innerHTML.toUpperCase().indexOf(filterValue) !== -1) {
            contactList[i].style.display = "";
        } else {
            contactList[i].style.display = "none";
        }
    }
}

input.addEventListener("input", (event) => {
    filter();
});