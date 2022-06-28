function renderChart(newData, chart, type) {
    var labelVar;
    if (type == "lastEntry") {
        labelVar = "Number Of Entry";
    } else {
        labelVar = "Number Of Exit"
    }

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = {
        labels: labels,
        datasets: [{
            label: labelVar,
            data: [newData.Mon, newData.Tue, newData.Wed, newData.Thu, newData.Fri, newData.Sat, newData.Sun],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    const myChart = new Chart(
        document.getElementById(chart),
        config
    );

}


// renderChart();
function renderDonut(chart, label, newData) {
    const data = {
        labels: label,
        datasets: [{
            label: "Number",
            data: newData,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(235, 230, 69)'
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
    };
    const myChart = new Chart(
        document.getElementById(chart),
        config
    );

}


function accept(type, chart, type) {
    const xmlhttp = new XMLHttpRequest();

    const form = new FormData();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            // console.log(response, chart);
            let data = JSON.parse(response);
            renderChart(data, chart, type);
        }
    }

    xmlhttp.open('get', '../../controller/chart.php?type=' + type);
    xmlhttp.send();

}

function forDonut(type, chart) {

    const xmlhttp = new XMLHttpRequest();

    const form = new FormData();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = this.responseText;
            console.log(response);
            let data = JSON.parse(response);

            console.log(Object.keys(data));
            renderDonut(chart, Object.keys(data), Object.values(data));
            if (type == 'lastEntry') {
                setValues('stat1', Object.keys(data), Object.values(data));
            } else {
                setValues('stat2', Object.keys(data), Object.values(data));
            }

        }
    }

    xmlhttp.open('get', '../../controller/chart.php?donut=' + type);
    xmlhttp.send();

}

document.getElementById('myChart2').style.display = "none";


document.getElementById('filter').addEventListener('click', function(e) {
    console.log(this.value);
    var graph = document.getElementById('myChart').getContext("2d");
    // graph.destroy();
    let chart;
    let type = this.value;

    if (type == 'lastEntry') {
        chart = "myChart";
        document.getElementById('myChart2').style.display = "none";
        document.getElementById('myChart').style.display = "block";

    } else {
        chart = "myChart2"
        document.getElementById('myChart').style.display = "none";
        document.getElementById('myChart2').style.display = "block";

    }
    accept(this.value, chart, type);
});

function setValues(id, label, values) {
    console.log(id, label, values);
    let holder = document.getElementById(id);
    for (let i = 0; i < label.length; ++i) {
        let para = document.createElement('p');
        para.innerHTML = label[i] + " : " + values[i];
        holder.appendChild(para);
        console.log('kdfjkasdfjkasdfj');

    }
    let total = document.createElement('p');
    let totalval = 0;
    for (let val of values) {
        totalval += Number(val);
    }
    total.innerHTML = "Total : " + totalval;
    holder.appendChild(total);


}

accept('lastEntry', 'myChart', 'lastEntry');
forDonut('lastEntry', 'myChart3');
forDonut('lastExit', 'myChart4');