function openBox(open, close) {

    document.getElementById(close).style.display = 'none';
    document.getElementById(open).style.display = 'block';

}

function preventDef(id) {
    document.getElementById(id).addEventListener('click', function(e) {
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
    });
}


// hide the error or ok bar on click
if (document.getElementById('submitstatus')) {
    document.getElementById('submitstatus').addEventListener('click', function() {

        document.getElementById('submitstatus').style.display = "none";
        window.location.reload();

    });
}

// document.getElementById('createAccountBtn').addEventListener('click', function(e) {
//     e.preventDefault();
// 	document.getElementById()
// })


function sendUserID(id, input, open) {
    openBox(open, 'accounts-list')
    let realId = id.split('-');
    // input section for id on change password and email box
    document.getElementById(input).value = realId[1];



}


// change user account password and cancel changing btn

if (document.querySelector('#cancelChangePassword')) {
    document.querySelector('#cancelChangePassword').addEventListener('click', function(e) {
        e.preventDefault();
    })
}
if (document.querySelector('#UserchangePass')) {

    document.querySelector('#UserchangePass').addEventListener('click', function(ev) {
        ev.preventDefault();
        //later you decide you want to submit
        let newPass = document.getElementById('UserNewPass').value;
        let confPass = document.getElementById('UserConfirmNewPass').value;
        let adminPass = document.getElementById('UserAdminPass').value;
        let errorBox = document.getElementById('UserPassErrorSection');
        let changePid = document.getElementById('UserID').value;
        if (validate(newPass, newPass, confPass, errorBox)) {
            changeUserPass(newPass, confPass, adminPass, changePid);
        };

    });
}

// change user account userName and cancel changing btn
if (document.querySelector('#cancelChangeUserName')) {
    document.querySelector('#cancelChangeUserName').addEventListener('click', function(e) {
        e.preventDefault();
    })
}

if (document.querySelector('#changeUserName')) {

    document.querySelector('#changeUserName').addEventListener('click', function(ev) {
        ev.preventDefault();
        //later you decide you want to submit
        let changeUid = document.getElementById('userName-userID').value;
        let newUserName = document.getElementById('newUserName').value
        let adminPass = document.getElementById('admin-password').value;
        let errorBox = document.getElementById('userNameErrorSection');

        changeUserName(changeUid, newUserName, adminPass, errorBox);

    });
}


// delete User Account and cancel deleting btn

if (document.querySelector('#deleteAccountCancel')) {
    document.querySelector('#deleteAccountCancel').addEventListener('click', function(e) {
        e.preventDefault();
    })
}

if (document.querySelector('#deleteAccount')) {

    document.querySelector('#deleteAccount').addEventListener('click', function(ev) {
        ev.preventDefault();
        //later you decide you want to submit
        let id = document.getElementById('to-be-delete-id').value;
        let adminPass = document.getElementById('delete-admin-password').value;
        let errorBox = document.getElementById('delete-acc-err');

        if (adminPass != '') {

            deleteAccount(id, adminPass, errorBox);
        } else {
            errorBox.innerHTML = "Password field can't be empty";
        }
    });
}


function changeUserPass(newP, confirmP, adminPass, id) {
    let passInfo = {
        'newp': newP,
        'confp': confirmP,
        'adminP': adminPass,
        'id': id
    };
    var passInfoJson = JSON.stringify(passInfo);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('am here changeing password');
            console.log(passInfoJson);
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;



        }
    };
    xmlhttp.open("get", "../../controller/changePass.php?userPass=" + passInfoJson, true);
    xmlhttp.send();


}

function changeUserName(id, newUserName, adminPass, errorBox) {

    let passInfo = {
        'id': id,
        'newUserName': newUserName,
        'adminP': adminPass,
    };
    var passInfoJson = JSON.stringify(passInfo);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('am here change username');
            console.log(passInfoJson);
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;



        }
    };
    xmlhttp.open("get", "../../controller/changePass.php?userName=" + passInfoJson, true);
    xmlhttp.send();

}

function deleteAccount(id, adminPass, errorBox) {
    let passInfo = {
        'id': id,
        'adminP': adminPass
    };
    var passInfoJson = JSON.stringify(passInfo);
    //  do nothing
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('am here change username');
            console.log(passInfoJson);
            document.getElementById('submitstatus').style.display = "flex";
            document.getElementById('submitstatus').innerHTML = this.responseText;



        }
    };
    xmlhttp.open("get", "../../controller/changePass.php?deleteAcc=" + passInfoJson, true);
    xmlhttp.send();

}