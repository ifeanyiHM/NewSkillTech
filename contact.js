const addContact = document.querySelector('.add');
const displayModal = document.getElementById('first_modal');
const removeContact = document.getElementById('close');

//TO DISPLAY CONTACT FORM
addContact.addEventListener('click', () => {
    displayModal.style.display = "block";
});

//TO CLOSE CONTACT FORM AFTER FILLING
removeContact.addEventListener('click', () => {
    displayModal.style.display = "none";
});

const submitBtn = document.getElementById('submit_btn');
const resetBtn = document.getElementById('reset_btn');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const phoneNumber = document.getElementById('phone_number');

function Contact(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

//FORM VALIDATION
document.querySelectorAll('.input_valid').forEach(valid => {
    valid.addEventListener('input', () => {
        if (valid.value !== 0) {
           let content = valid.nextElementSibling;
           content.style.visibility ="hidden";
        } 
    });
});

const reall = document.getElementById('phone_number');
reall.addEventListener('input', () => {
    if ( isNaN(reall.value)) {
        let cont = reall.nextElementSibling;
        cont.style.visibility = "visible"
        cont.innerHTML = "This input field only recieves numbers."
    } else {
        let cont = reall.nextElementSibling;
        cont.style.visibility = "hidden"
        cont.innerHTML = "Please enter your phone number";   
    }
})


//TO SUBMIT CONTACT FORM WHEN FILLED AND FORM VALIDATION
submitBtn.onclick = (e) => {
    const contact = new Contact(firstName.value, lastName.value, phoneNumber.value);
   if (firstName.value && lastName.value && phoneNumber.value >= 1) {
        addToList(contact);
    
        displayModal.style.display = "none";
        document.querySelectorAll('input').forEach((input) => {
            input.value ="";
        });  

        document.querySelectorAll('.validation').forEach(validation => {
            validation.style.visibility = "hidden";
        });

    } else {
        if (firstName.value === '' || firstName.value === null) {
            document.getElementById('val1').style.visibility = "visible"
        } else {
            document.getElementById('val1').style.visibility = "hidden"
        }
        if (lastName.value === '' || lastName.value === null) {
            document.getElementById('val2').style.visibility = "visible"
        } else {
            document.getElementById('val2').style.visibility = "hidden"
        }
        if (phoneNumber.value === '' || phoneNumber.value === null) {
            document.getElementById('val3').style.visibility = "visible"
        } else
         if ( phoneNumber.value >= 1 || isNaN(phoneNumber.value)) {
            console.log('hello')
            document.getElementById('val3').innerHTML = "This input field only recieves numbers"
        } 
    }
   e.preventDefault();
};

//TO RESET CONTACT FORM
resetBtn.addEventListener('click', () => {
    document.querySelectorAll('input').forEach((input) => {
        input.value ="";
    });

    document.querySelectorAll('.validation').forEach(validation => {
        validation.style.visibility = "hidden";
    });
});

//TO DISPLAY THE EDIT AND SAVE BUTTON
document.addEventListener('click', event => {
    if (event.target.id === 'nav_btn') {
        let navOption = event.target.previousElementSibling;
        navOption.style.display = "flex"
    }
});

//TO HIDE THE EDIT AND SAVE BUTTION
document.addEventListener('click', event => {
    if (event.target.id === 'exit_option') {
        let navOption = event.target.parentElement;
        navOption.style.display = "none"
        x = event.target.parentElement.parentElement.parentElement
        xy = x.firstElementChild.firstElementChild;
        xz = x.firstElementChild.lastElementChild;
        xy.children[0].contentEditable = false;
        xy.children[1].contentEditable = false;
        xz.children[1].contentEditable = false;
        event.target.parentElement.firstElementChild.innerHTML = "EDIT";
    }
});

//TO RESIZE INPUT
const comm = document.querySelectorAll('.input_content');
comm.forEach(contentFit => {
    contentFit.addEventListener('input', resizeInput);
    resizeInput.call(contentFit)
    function resizeInput() {
        this.style.width = this.value.length + "ch";
    }
});

//TO EDIT CONTACT FORM
document.addEventListener('click', event => {
    if (event.target.id == 'edit_contact') {
       if (event.target.innerHTML === 'EDIT') {
            x = event.target.parentElement.parentElement.parentElement
            xy = x.firstElementChild.firstElementChild;
            xz = x.firstElementChild.lastElementChild;
            xy.children[0].contentEditable = true;
            xy.children[1].contentEditable = true;
            xz.children[1].contentEditable = true;
            xy.children[0].focus()
            event.target.innerHTML = "SAVE";
       } else {
            xy.children[0].contentEditable = false;
            xy.children[1].contentEditable = false;
            xz.children[1].contentEditable = false;
            event.target.innerHTML = "EDIT";
           event.target.parentElement.style.display = 'none';
       }
    }   
});

//TO GET CONTACT FORM DETAILS AND ADD TO LIST
function addToList(item) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('contact_list');
    newDiv.innerHTML = `
    <div>
        <div>
            <span contenteditable="false">${item.firstName}</span>
            <span contenteditable="false">${item.lastName}</span>
        </div>
        <div>
            <img src="icons/call.svg" alt="phone">
            <span contenteditable="false">${item.phoneNumber}</span>
        </div>
    </div>
    <div>
        <div id="nav_option">
            <p id="edit_contact">EDIT</p>
            <img id="delete_btn" src="icons/delete.svg" alt="delete">
            <span id="exit_option">x</span>
        </div>
        <img id="nav_btn" src="icons/nav.svg" alt="navigation">
    </div>
    `;
    document.querySelector('section').appendChild(newDiv);
}

//TO DELETE CONTACT
document.addEventListener('click', event => {
   if (event.target.id === 'delete_btn') {
        console.log('delete')
        document.querySelector('.warning-modal').style.display = 'block';
        let yesd = document.getElementById('yes_delete');
        yesd.addEventListener('click', () => {
            let delete_parent = event.target.parentElement.parentElement.parentElement;
            delete_parent.style.animationPlayState = 'running';
            delete_parent.addEventListener('animationend', () => {
                delete_parent.remove();
            });
            document.querySelector('.warning-modal').style.display = 'none';
        });
   }
});

//To Change you mind about deleteing contact lol
let nod = document.getElementById('no_delete');
nod.addEventListener('click', () => {
    document.querySelector('.warning-modal').style.display = 'none';
});

//TO SEARCH A PARTICULAR CONTACT
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