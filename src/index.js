
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

//User name
//Home page hooks
const index = document.getElementById('index'),
    indexSignUpBtn = document.getElementById('signUpBtn'),
    indexLogInBtn = document.getElementById('logInBtn');

//Sign Up page hooks
const sign = document.getElementById('sign'),
    form = document.getElementById('form0'),
    name = document.getElementById('name'),
    lastN = document.getElementById('last-name'),
    email = document.getElementById('email'),
    passW = document.getElementById('password'),
    checkB = document.getElementById('checkbox'),
    submitSignUp = document.getElementById('submit-btn');

//Log In page hooks
const logIn = document.getElementById('log'),
    emailLogIn = document.getElementById('emailLogIn'),
    passWLogIn = document.getElementById('passWLogIn'),
    submitLogIn = document.getElementById('submitLogIn');

//DAshboard page hooks
const dashboard = document.getElementById('dashboard'),
    createListBtn = document.getElementById('createList'),
    listsContainer = document.getElementById('listsContainer');

//SIGN UP ************************************
//Function to move the view to the sign up form
const signUpFunc = (evt) => {
    evt.preventDefault();

    index.style.display = 'none';
    sign.style.display = 'block';
} // End of signUpFunc

//Validate form
const submitSignUpForm = (evt) => {
    evt.preventDefault();

    const signUpFormVars = [name, lastN, email, passW];
    const keyLabel = ['name', 'last name', 'email', 'password'];

    for(let i = 0; i < signUpFormVars.length; i++) {
        for(let j = 0; j < keyLabel.length; j++) {
            localStorage.setItem(keyLabel[i], signUpFormVars[i].value);
        }
    }

    //Add errors to this array
    let errors = [];
    const regEx = /^[\w ]+$/;
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //Check validity of name and last name the user typed *****
    if(!regEx.test(name.value)) {
        errors.push(`name's input value does not fit the accepted format`)
        name.focus();
    }

    if(!regEx.test(lastN.value)) {
        errors.push(`last name's input value does not fit the accepted format`)
        lastN.focus();
    }
    
    if(name.value === '') { 
        errors.push(`name input is empty`);
        name.focus();
    }

    if(lastN.value === '') { 
        errors.push(`last name's input is empty`);
        lastN.focus();
    }
    // End of name validity check block *****

    // Check validity of email the user has type *****
    if(email.value === '') { 
        errors.push(`email input is empty`);
        email.focus();
    }

    if(!regExEmail.test(email.value)) {
        errors.push(`email's input value does not fit the accepted format`)
        email.focus();
    }
    // End od email validity block *****

    if(passW.value === '') {
        errors.push(`type in a password`);
        passW.focus();
    }

    if(errors.length > 0) {
        let message = `ERRORS:\n\n`;
        for(let i = 0; i < errors.length; i++) {
            message += `${errors[i]}\n`;
        }

        alert(message);
        return false;
    }

    const user = document.getElementById('user');
    user.innerText += ` ${localStorage.getItem('name')} ${localStorage.getItem('last name')}`;

    sign.style.display = 'none';
    dashboard.style.display = 'block';
} // End of submitSignUpForm

//LOG IN ************************************
//Function to move the view to the log in form
const logInFunc = (evt) => {
    evt.preventDefault();

    index.style.display = 'none';
    logIn.style.display = 'block';
} // End of logInFunc

const submitLogInForm = (evt) => {
    evt.preventDefault();

    let errors = [];
    const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    //Check validity of name and last name the user typed *****
    if(emailLogIn.value === '') {
        errors.push(`email field musn't be empty`);
        emailLogIn.focus();
    }
    
    if(!regExEmail.test(emailLogIn.value)) {
        errors.push(`email's input value does not fit the accepted format`)
        emailLogIn.focus();
    }
    
    if(passWLogIn.value === '') {
        errors.push(`password field musn't be empty`);
        passWLogIn.focus();
    }

    if(errors.length > 0) {
        let message = `ERRORS:\n\n`;
        for(let i = 0; i < errors.length; i++) {
            message += `${errors[i]}\n`;
        }

        alert(message);
        return false;
    }

    if(emailLogIn.value !== localStorage.getItem('email') || passWLogIn.value !== localStorage.getItem('password')) {
        alert('Conventional wisdom says that you need to fill up this fields');
        return false;
    }

    const user = document.getElementById('user');
    user.innerText += ` ${localStorage.getItem('name')} ${localStorage.getItem('last name')}`;

    logIn.style.display = 'none';
    dashboard.style.display = 'block';
} // End of submmitLogInForm

// DASHBOARD ************************************
const createNewToDo = () => {
    // Create future listd nodes
    const divEl= document.createElement('div');
    const pEl = document.createElement('p');
    const btnDivEl = document.createElement('div');
    const btnDone = document.createElement('button');
    const btnDel = document.createElement('button');


    pEl.style.paddingLeft = '10';
    pEl.className = 'p-style';
    //Add number to the task
    pEl.innerHTML = prompt('Type the to do action here and press ok');

    divEl.className = 'list';
    divEl.appendChild(pEl);

    btnDel.className = 'btn btn-danger del'
    btnDel.innerText = 'Delete';

    btnDone.className = 'btn btn-primary done';
    btnDone.innerText = 'Done';

    btnDivEl.appendChild(btnDone);
    btnDivEl.appendChild(btnDel);

    divEl.appendChild(btnDivEl);

    listsContainer.appendChild(divEl);

    btnDel.addEventListener('click', () => listsContainer.removeChild(divEl)); 
    btnDone.addEventListener('click', () => {
        pEl.style.textDecoration = 'line-through';
        btnDone.className = 'btn btn-inactive not-active';
    });
}// End of createNewToDo


//EVENT LISTENERS ***************************
//Event Listeners for the sign up and Log In buttons of the #index view
indexSignUpBtn.addEventListener('click', signUpFunc, false );
indexLogInBtn.addEventListener('click', logInFunc, false );

//Event Listener for the Sign Up's(#sign) view Submit button
submitSignUp.addEventListener('click', submitSignUpForm, false);
//Event Listener for the Log In's(#log) view Submit button
submitLogIn.addEventListener('click', submitLogInForm, false);

// Event handler attached to the create new list button
createListBtn.addEventListener('click', createNewToDo, false);
