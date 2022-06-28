// in and out section
if (document.getElementById("force_link")) {
    document.getElementById("force_link").addEventListener('click', function() {
        document.getElementById('force_link_pass').style.display = "block";
    })
}

// 

let dd = document.getElementById('entrance_form');
dd.addEventListener('submit', function(e) {

    e.preventDefault();
    const form = new FormData(this);
    submitForm(form);
});



function submitForm(form) {
    const xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            let text_status = response.split('_');
            console.log(text_status);
            document.getElementById("entrance_error_box").innerHTML = text_status[0];

            // if user entry went well close the in or out conainer
            if (text_status[1] == "good") {
                setTimeout(() => {
                    document.getElementById('in_or_out_container').style.display = "none"
                }, 1500);


            }
        }
    }
    xmlhttp.open('post', '../../controller/entrance.php');
    xmlhttp.send(form);
}