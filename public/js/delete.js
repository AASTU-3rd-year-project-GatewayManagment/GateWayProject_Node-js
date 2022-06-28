// delete pop up 
function sendUserID(id, input, open) {
    opener(open);
    let realId = id.split('-');
    console.log(realId[1] + "  " + input + "  " + open)
        // input section for id on change password and email box
    document.getElementById(input).value = realId[1];
    console.log(document.getElementById(input).value);

}
// delete form
if (document.getElementById('personal-delete-account1')) {
    document.getElementById('personal-delete-account1').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = new FormData(this);
        // construct json
        let formJson = {};
        form.forEach((value, key) => {
            formJson[key] = value;
        });

        sendDeleteForm(formJson);
    })

}

if (document.getElementById('deleteAccountCancel')) {
    document.getElementById('deleteAccountCancel').addEventListener('click', (e) => {
        e.preventDefault();
        closer('delete-account-container');
    })
}

function sendDeleteForm(form) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        let response = this.responseText;
        let text_status = response.split('_');
        console.log(text_status);
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('delete-acc-err').innerHTML = text_status[0];
            // if user deletion went well.
            if (text_status[1] == "good") {
                setTimeout(() => {
                    document.getElementById('personal-delete-account').reset();
                    document.getElementById('submitstatus').style.display = "flex";
                    document.getElementById('submitstatus').innerHTML = text_status[0];
                }, 3000);
                window.location.reload();
            } else {
                document.getElementById('delete-acc-err').innerHTML = text_status[0];
            }


        }
    };
    xmlhttp.open("post", "deleteUserAccount", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(form);


}