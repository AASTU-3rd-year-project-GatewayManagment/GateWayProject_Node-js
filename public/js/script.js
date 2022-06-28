// sessionStorage.clear();
console.log(sessionStorage.getItem('mini'));
if (sessionStorage.getItem('mini') == 'true') {
    resize();
}

let addDeviceContainer = document.getElementById('form1');



if (document.getElementById('burgerMenu')) {
    document.getElementById('burgerMenu').addEventListener('click', function() {
        if (sessionStorage.getItem('mini') == 'true') {
            sessionStorage.setItem('mini', false);
            resize();
        } else {
            sessionStorage.setItem('mini', true);
            resize();
        }
    });

}


function addDevice() {
    addDeviceContainer.style.display = "block";
}

function resize() {

    let links = document.getElementsByClassName('sidenav-link');
    let sidebar = document.getElementsByClassName('sidebar');
    let mainContent = document.getElementsByClassName('header_body');
    let accountInfo = document.getElementsByClassName('user-profile');
    let systemHeader = document.getElementById('system-name');
    let userProfile = document.getElementsByClassName('user-profile');
    let burgerMenu = document.getElementsByClassName("burger-menu-container");
    for (let i = 0; i < links.length; ++i) {
        links[i].classList.toggle('removeLinks');
    }
    sidebar[0].classList.toggle("collapsed-sidebar");
    mainContent[0].classList.toggle('collapsed-header_body');
    userProfile[0].classList.toggle('collapsed-user-profile');
    systemHeader.classList.toggle('collapsed-system-header');
    burgerMenu[0].classList.toggle('collapsed-burger-menu-container');
}

function openBox(open, close) {

    document.getElementById(close).style.display = 'none';
    document.getElementById(open).style.display = 'block';

}

function preventDef(id) {
    document.getElementById(id).addEventListener('click', function(e) {
        e.preventDefault();
    })
}

// Student Search 


// btn1 = document.getElementById('add-device-btn-cancel')
// btn1.addEventListener('click', function(e) {
//     e.preventDefault();
//     close('form1')
// });




function close(container, open) {
    document.getElementsByClassName(container)[0].style.display = 'none';
    document.getElementById(open).style.display = 'flex'
    console.log('here');
}

function closer(id) {
    document.getElementById(id).style.display = 'none';
}

function opener(id) {
    document.getElementById(id).style.display = 'flex'
}

// change password validation
// document.getElementById('personal-change-password1').addEventListener('submit', function(e) {
//     e.preventDefault();
//     validate('oldPass', 'newPass', 'confirmNewPass', 'error-section');
// })
// $('personal-change-password1').submit(function(ev) {
//     ev.preventDefault();
//     //later you decide you want to submit
//     if () {
//         $(this).unbind('submit').submit()
//     }
// });

// logout img click

if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', function() {
        document.getElementById('logout').click();
    })
}


// add user page error handling and form submit
// if (document.getElementById('add-std-form')) {
//     document.getElementById('add-std-form').addEventListener('submit', function(e) {
//         e.preventDefault();
//         console.log('i wont let u  sumbit');
//         const formData = new FormData(this);
//         // append the image file
//         let imgFile = document.getElementById('user-img');

//         for (const file of imgFile.files) {
//             formData.append('imgFile[]', file);
//         }
//         // append submit key
//         formData.append('submit', 'submit');


//         console.log(formData);
//         sendForm(formData);
//     })
// }


// import btn submit

if (document.getElementById('import-btn-sumbit')) {
    document.getElementById('import-btn-sumbit').addEventListener('click', function(e) {
        e.preventDefault();
        closer('import-box-container');
        sendFile();
    })
}
if (document.getElementById('open-btn')) {


    document.getElementById('open-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (document.getElementById('import-box-container')) {
            opener('import-box-container');
        }
    })
}

if (document.getElementById('close-import-box')) {
    if (document.getElementById('import-box-container')) {

        closer('import-box-container');
    }
    if (document.getElementById('add_device_container')) {
        closer('add_device_container');
    }

    document.getElementById('close-import-box').addEventListener('click', function(e) {
        e.preventDefault();
        if (document.getElementById('add_device_container')) {
            document.getElementById('add-device-box').reset();
            document.getElementById('add_device_error').innerHTML = "";
            closer('add_device_container');
        }
        if (document.getElementById('import-box-container')) {

            closer('import-box-container');
        }
    })
}

if (document.querySelector('#changePass')) {

    document.querySelector('#changePass').addEventListener('click', function(ev) {

        ev.preventDefault();
        let oldpass = document.getElementById('oldPass').value;
        let newPass = document.getElementById('newPass').value;
        let confPass = document.getElementById('confirmNewPass').value;
        let errorBox = document.getElementById('change-pass-err');
        //later you decide you want to submit
        if (validate(oldpass, newPass, confPass, errorBox)) {

            submitPass(oldpass, newPass, confPass);

        };

    });
}
//  cancel Button
if (
    document.getElementById('createAccountCancel')
) {
    document.getElementById('createAccountCancel').addEventListener('click', function(e) {
        e.preventDefault();
    })
}

// change Email
if (document.getElementById('changeEmail')) {

    document.getElementById('changeEmail').addEventListener('click', function(e) {
        e.preventDefault();
        let newEmail = document.getElementById('newEmail').value;
        let password = document.getElementById('admin-password').value;

        changeEmail(newEmail, password);
    })
}
// hide the error or ok bar on click

if (document.getElementById('submitstatus')) {
    document.getElementById('submitstatus').addEventListener('click', function() {

        document.getElementById('submitstatus').style.display = "none";
        window.location.reload();

    });
}
// create Account
if (document.getElementById('createAccount')) {
    document.getElementById('createAccount').addEventListener('click', function(e) {
        e.preventDefault();

        let newPass = document.getElementById('new-password').value;
        let confPass = document.getElementById('re-new-password').value;
        let errorBox = document.getElementById('create-acc-err');
        if (validate(newPass, newPass, confPass, errorBox)) {
            let id = document.getElementById('create_id').value;
            let userName = document.getElementById('new-user-name').value;
            let password = document.getElementById('new-password').value;
            let retype = document.getElementById('re-new-password').value;

            createAccount(id, userName, password, retype);
        };
    })
}

function validate(old, newP, confirm, error) {


    if (newP.length >= 8 && newP.length <= 20) {
        let matched = (newP === confirm) ? true : false;
        if (matched) {
            // submit the form
            return true;
        } else {
            error.innerHTML = "Password don't match.";

        }
    } else {
        error.innerHTML = "Password length must be between 8 and 20 characters";
    }

}

function submitPass(oldP, newP, confirmP) {
    let passInfo = {
        'old': oldP,
        'new': newP,
        'confirmP': confirmP
    };
    var passInfoJson = JSON.stringify(passInfo);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('am here');
            console.log(passInfoJson);
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;



        }
    };
    xmlhttp.open("post", "changePassword", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(passInfoJson);


}

function changeEmail(email, password) {

    let passInfo = {
        'email': email,
        'password': password
    };
    var passInfoJson = JSON.stringify(passInfo);
    console.log(passInfoJson);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            console.log(passInfoJson);
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;



        }
    };
    xmlhttp.open("post", "changePassword", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(passInfoJson);

}

function createAccount(ID, userName, password, repassword) {
    let passInfo = {
        'ID': ID,
        'userName': userName,
        'password': password,
        'repassword': repassword
    };
    var passInfoJson = JSON.stringify(passInfo);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let response = this.responseText;
            let text_status = response.split('_');
            console.log(text_status);
            if (this.readyState == 4 && this.status == 200) {


                // if it went well.
                if (text_status[1] == "good") {
                    setTimeout(() => {
                        document.getElementById('personal-change-account').reset();
                        document.getElementById('submitstatus').style.display = "flex";

                        document.getElementById('submitstatus').innerHTML = text_status[0];
                    }, 3000);
                    window.location.reload();


                } else {
                    document.getElementById('create-acc-err').innerHTML = text_status[0];
                }

            }

            console.log(this.response);

        }
    };
    xmlhttp.open("post", "createAccount", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(passInfoJson);
}

function sendFile() {
    const xmlhttp = new XMLHttpRequest();
    const formData = new FormData();
    const inpfile = document.getElementById('import-file')

    for (const file of inpfile.files) {
        formData.append('myFiles[]', file)
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;
        }
    };
    xmlhttp.open("post", "../../controller/import-export.php");
    xmlhttp.send(formData);

}

function sendForm(formData) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;
        }
    }
    xmlhttp.open("post", "../../controller/add-student.php");
    xmlhttp.send(formData);
}