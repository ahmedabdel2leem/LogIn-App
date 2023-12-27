// Switch Variabels
var c = console.log.bind();
var transtionShape = document.getElementById('transtion-shape'),
logIn = document.getElementById('logIn'),
signUp = document.getElementById('signUp'),
switchBtn = document.querySelectorAll('#switchBtn');
c(switchBtn)
// logIn vars
var inEmailInput = document.getElementById('inEmailInput'),
 inPassInput = document.getElementById('inPassInput');
 // SignUp variabels
var upNameInput = document.getElementById('upNameInput'),
upEmailInput = document.getElementById('upEmailInput'),
upPassInput = document.getElementById('upPassInput');
// hiddenInfo
var upHiddenText = document.getElementById('upHiddenText');
var inHiddenText = document.getElementById('inHiddenText');
// buttons
var upBtn = document.getElementById('UpBtn');
var inBtn = document.getElementById('inBtn');
var outBtn = document.getElementById('outBtn')
// users Array
var usersArray = [];
// regex
var chekEmail=  /@/;

var checkPass = /\d?w?/;


if(JSON.parse(localStorage.getItem('users')) !== null){
    usersArray = JSON.parse(localStorage.getItem('users'));
}





// cheak if email Exist
function exist(){
    for (let i = 0; i < usersArray.length; i++) {
        if( usersArray[i].email === upEmailInput.value.toLowerCase()){
            return false
        }
    }
    return true
}

// check validation
function cheakValidation() {
    const isEmailValid = chekEmail.test(upEmailInput.value);
    const isPasswordValid = checkPass.test(upPassInput.value);

    console.log('Email Test Result:', isEmailValid);
    console.log('Password Test Result:', isPasswordValid);

    return isEmailValid && isPasswordValid;
}
if(upBtn != null){
upBtn.addEventListener('click', () => {
    var user = {
        name: upNameInput.value.toLowerCase(),
        email: upEmailInput.value.toLowerCase(),
        password: upPassInput.value.toLowerCase(),
    };
    // Check if Empty
    if(upNameInput.value != "" && upEmailInput.value != "" && upPassInput.value != ""){
        // cheakValidation
        if (cheakValidation()) {
            console.log('Validation passed');
            // Check existence
            if (exist() !== false) {
                usersArray.push(user);
                localStorage.setItem('users', JSON.stringify(usersArray));
                upHiddenText.innerText = 'Successfully registered'
                upHiddenText.classList.replace('text-danger','text-success')
                upHiddenText.classList.remove('d-none')
                console.log('User added to array');
            } else {
                upHiddenText.innerText = 'Email ALready exist'
                upHiddenText.classList.remove('d-none')
            }
        } else {
            upHiddenText.innerText = 'Email must includes @'
            upHiddenText.classList.remove('d-none')
        }
    }else{
        upHiddenText.innerText = 'All inputs must be fulfilled'
        upHiddenText.classList.remove('d-none')
    }
   
});
}


// logIn 
if(inBtn != null){
    if(JSON.parse(localStorage.getItem('userName')) != null){
        window.location.href = '/home.html'
    }
inBtn.addEventListener('click',function(){
    console.log('test parent')
    if(inEmailInput.value != "" && inPassInput.value!= ""){
        for (let i = 0; i < usersArray.length; i++) {
            if(inEmailInput.value == usersArray[i].email && inPassInput.value==usersArray[i].password){
                localStorage.setItem('userName',JSON.stringify(usersArray[i].name))
                window.location.href = '/home.html';
            }else{
                inHiddenText.classList.remove('d-none')
                inHiddenText.innerText = 'incorrect Email or Password'
            } 
        
    }
    }else{
        inHiddenText.classList.remove('d-none')
        inHiddenText.innerText = 'All inputs must be fulfilled'
    }
    
})
}


// LogIn  signUp switcher
if(switchBtn != null){
    for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener('click',()=>{
            console.log('test')
                upHiddenText.classList.add('d-none')
                inHiddenText.classList.add('d-none')
                transtionShape.classList.toggle('order-2');
                if(transtionShape.classList.contains('order-2')){
                    switchBtn.innerText = "Log In"
                }else{
                    switchBtn.innerText = "SignUp"
                }
                logIn.classList.toggle('d-none');
                signUp.classList.toggle('d-none')
            
            })
    }

}

// logOut
if(outBtn != null){
    if(JSON.parse(localStorage.getItem('userName')) == null){
        window.location.href = '/index.html'
    }
    if(JSON.parse(localStorage.getItem('userName')) != null){
        document.getElementById('welcomeMsg').innerText = `Welcome ${JSON.parse(localStorage.getItem('userName'))}`
    }
    outBtn.addEventListener('click', ()=>{
        localStorage.removeItem('userName')
        window.location.href = "/index.html";

    })
}


