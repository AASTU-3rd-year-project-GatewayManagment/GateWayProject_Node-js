function opener(id) {
    document.getElementById(id).style.display = 'flex';
}

function openBox(open, close) {

    document.getElementById(close).style.display = 'none';
    document.getElementById(open).style.display = 'block';

}
// document.getElementById('signin-box').addEventListener('submit', function(e) {
//     console.log('hello worlds');
//     e.preventDefault();
//     const form = { 'name': "Naol" };
//     signin(form);
// })

function signin(form) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = this.responseText;
            let text_status = res.split('_');
            document.getElementById('signin_error_box').innerHTML = text_status[0];
            console.log(text_status);

            if (text_status[1] == "goodadmin" || text_status[1] == "goodemp") {
                window.location.replace('../../../GateWayProject/view/pages/admin-search.php');
            }


        }
    }
    orm = JSON.stringify(form);
    console.log(form);
    xmlhttp.open('post', '/signin');

    xmlhttp.send(orm);
}

document.getElementById('forgot-pass-box').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = new FormData(this);
    recover(form);
})

function recover(form) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let res = this.responseText;
            let text_status = res.split('_');
            document.getElementById('signin_recover_error').innerHTML = text_status[0];
            console.log(text_status);

            if (text_status[1] == "goodadmin" || text_status[1] == "goodemp") {
                window.location.reload();
            }


        }
    }
    console.log(form);
    form = JSON.stringify(form);
    xmlhttp.open('get', '../../../GateWayProject/controller/password-recovery.php' + form);
    xmlhttp.send();
}