function closer(id) {
    document.getElementById(id).style.display = 'none';
}

function opener(id) {
    document.getElementById(id).style.display = 'flex'
}
if (document.getElementById('add-device-box')) {
    document.getElementById('add-device-box').addEventListener('submit', function(e) {
        e.preventDefault();
        const form = new FormData(this);
        addDevice(form);

    });
}


function addDevice(form) {
    const xmlhttp = new XMLHttpRequest();



    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let text_status = response.split('_');
            console.log(text_status);
            document.getElementById('add_device_error').innerHTML = text_status[0];
            // if device registration went well.
            if (text_status[1] == "good") {
                setTimeout(() => {
                    document.getElementById('add-device-box').reset();
                    document.getElementById('add_device_error').innerHTML = "";
                    document.getElementById('add_device_container').style.display = "none";
                    window.location.reload();
                }, 1500);


            }

        }
    }

    xmlhttp.open('post', '../../controller/add-device.php');
    xmlhttp.send(form);
}

// edit device 

closer("edit_device_container");

function editDevice(deviceName, serial) {
    if (deviceName != '' && serial != '') {
        document.getElementById('toedit_device_name').value = deviceName;
        document.getElementById('toedit_serial').value = serial;
        document.getElementById('orginalSerial').value = serial;
        opener('edit_device_container');

    }
}
// if (document.getElementById('edit-device-box')) {
//     document.getElementById('edit-device-box').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const form = new FormData(this);
//         sendEditForm(form);
//     });
// }

if (document.getElementById('cancel_edit_btn')) {
    document.getElementById('cancel_edit_btn').addEventListener('click', function(e) {
        e.preventDefault();
        closer('edit_device_container');
    })
}

function sendEditForm(form) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let text_status = response.split('_');
            console.log(text_status);
            document.getElementById('edit_device_error').innerHTML = text_status[0];
            if (text_status[1] == "good") {
                setTimeout(() => {
                    document.getElementById('edit-device-box').reset();
                    document.getElementById('edit_device_error').innerHTML = "";
                    document.getElementById('edit_device_container').style.display = "none";
                    window.location.reload();

                }, 1500);


            }
        }
    }
    xmlhttp.open('post', '../../controller/edit-device.php');
    console.log(form);
    xmlhttp.send(form);
}
// delete Device

function deleteDevice(serial, id) {
    console.log(serial, id);
    document.getElementById('to-be-delete-id').value = id;
    document.getElementById('to-be-delete-serial').value = serial;
    opener('delete-account-container');
}
if (document.getElementById('deleteDeviceCancel')) {
    document.getElementById('deleteDeviceCancel').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.reload();
    })
}

// if (document.getElementById('personal-delete-device')) {
//     document.getElementById('personal-delete-device').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const form = new FormData(this);

//         sendDeleteForm(form);
//     })
// }

function sendDeleteForm(form) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let text_status = response.split('_');
            console.log(text_status);
            document.getElementById('delete-device-error').innerHTML = text_status[0];
            if (text_status[1] == "good") {
                setTimeout(() => {
                    document.getElementById('personal-delete-device').reset();
                    document.getElementById('delete-device-error').innerHTML = "";
                    window.location.reload();
                }, 1500);


            }
        }
    }
    xmlhttp.open('post', '../../controller/delete-device.php');
    xmlhttp.send(form);
}