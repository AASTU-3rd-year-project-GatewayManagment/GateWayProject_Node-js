document.getElementById('open-btn').addEventListener('click', function() {
    document.getElementsByClassName('box-container')[0].style.display = 'flex';
});
document.querySelector("#close-import-box").addEventListener("click", function(event) {
    event.preventDefault();

}, false);

function closeBox(cname) {
    document.getElementsByClassName(cname)[0].style.display = 'none';
}
closeBox('box-container');