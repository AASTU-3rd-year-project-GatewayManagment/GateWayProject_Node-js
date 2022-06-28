document.querySelector("#changeProfileBtn").addEventListener("click", function(event) {
    event.preventDefault();

}, false);

function closeBox(cname) {
    document.getElementsByClassName(cname)[0].style.display = 'none';
}
closeBox('box-container');
// closeBox('add-device-container');
if (document.getElementById('open-btn')) {
    document.getElementById('open-btn').addEventListener('click', function() {
        document.getElementsByClassName('box-container')[0].style.display = 'flex';
    });
}

document.getElementById('changeProfileBtn').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    document.getElementById('user-img-hidden').click();
})

function btnclick(btn) {
    console.log(document.getElementById(btn));
    document.getElementById(btn).click();
}

// document.getElementById('edit-profile-user-profile').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const form = new FormData(this);
//     editUser(form);

// })

function editUser(form) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        let response = this.responseText;
        let text_status = response.split('_');
        console.log(text_status);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('edit_user_error').innerHTML = text_status[0];
        }
        if (text_status[1] == "good") {
            setTimeout(() => {
                document.getElementById('edit_user_error').innerHTML = "";
            }, 1500);


        }
    }

    xmlhttp.open('post', '../../controller/edit-profile.php');
    xmlhttp.send(form);
}