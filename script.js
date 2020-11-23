
var cities = ['izmir', 'istanbul', 'ankara', 'adana', 'rize', 'kayseri', 'trabzon', 'bursa'];
var leftmenuhtml = '';
var graphDataArr = [];
let minVals, maxVals, dates, icons, degree;
var graphData;

for (var i = 0; i < cities.length; i++) {

    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var resp = JSON.parse(this.responseText).result;

            minVals = resp.map(a => a.min);
            maxVals = resp.map(a => a.max);
            dates = resp.map(a => a.date);
            icons = resp.map(a => a.icons);
            degree = resp.map(a => a.degree);
            graphData = {};

            graphData.city = JSON.parse(this.responseText).city;
            graphData.minVals = minVals;
            graphData.maxVals = maxVals;
            graphData.dates = dates;
            graphData.degree = degree;
            graphDataArr.push(graphData);



        }
    });

    xhr.open("GET", "https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=" + cities[i], true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", "apikey 0YJYUQIzkXuv84JIrKKaRg:176fUPfBnYdk4740WqIFJG");

    xhr.send(data);




    leftmenuhtml += '<div style="width: 100%; padding-top:0.6em;"  >';
    leftmenuhtml +=
        '<div class="cityElements" id="leftmenu' + i + '" style="width: 84%;height: 64px; margin:8px 25px 10px 25px; background: #FFFFFF ; padding-box;border: 1px solid #ECEBE2;opacity: 1;display: flex;justify-content: space-around;flex-direction: row;">';

    leftmenuhtml += '<span style="  font-weight:bold; color:black; height:100%;">' + cities[i] + '</span>';


    leftmenuhtml += '</div>';

    leftmenuhtml += '</div>';

}


function rebuild(graphData) {
    var dom = document.getElementById("container");


    var myChart = echarts.init(dom);

    var max = Math.max.apply(null, graphData.maxVals);

    var min = Math.min.apply(null, graphData.minVals);



    myChart.setOption({
        title: {
            text: graphData.city,
            left: 'center',

            textStyle: {
                fontSize: 30,
                left: 'center'

            },
        },
        yAxis: [{
            type: 'value',
            scale: true,
            name: '',
            max: max + 3,
            min: min,
            boundaryGap: [110.2, 110.2],

            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#43752F',
                }
            },
        }],
        xAxis: [{

            data: graphData.dates,


        },
        ],
        series: [
            {
                type: "line",
                name: "Minimum",
                yAxisIndex: 0,

                data: graphData.minVals,

            },
            {
                type: "line",
                name: "Maksimum",
                yAxisIndex: 0,

                data: graphData.maxVals
            },
            {
                type: "line",
                name: "Derece",
                yAxisIndex: 0,

                data: graphData.degree
            },

        ]
    })
}


$('#left-menu').empty();
$('#left-menu').append(leftmenuhtml);


$('.cityElements').click(function () {
    for (var i = 0; i < cities.length; i++) {


        if (cities[i] === this.firstChild.innerHTML) {
            this.style.backgroundColor = "#e2f733";
            var selectedCityData = graphDataArr.find(a => a.city == this.firstChild.innerHTML);
            rebuild(selectedCityData)


        } else {

            //this.style.backgroundColor = "#ffff";
            $('#leftmenu' + i)[0].style.backgroundColor = "#ffff";



        }

    }



});



///// BUILD GRAPH


function buildGraph(graphData) {
    option = {
        backgroundColor: 'white',
        tooltip: {
            //animation: true,
            //   showContent: true,
            trigger: 'axis',

            axisPointer: { type: 'line' },

        },


        title: {
            text: 'SELECT CITY',
            padding: [10, 10],
            left: 'center',

            textStyle: {
                color: '#8c8c8c',
                textStyle: {
                    fontSize: 30,
                    left: 'center'

                },
            },


        },

        legend: {
            data: ['Minimum', 'Maksimum', 'Derece'],
            top: "bottom",
            padding: [
                5,  // up

                10, // left
            ],
            width: "82%",
            itemGap: 50.5
        },

        xAxis: [{
            axisTick: {
                show: false
            },


            type: 'category',
            boundaryGap: true,
            data: ["---------------------------"],
            //["19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül", "19 Eylül"],
            // ['Eylük', 'Ekim', 'Kasım', 'Aralık', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Agustos'],

            axisLine: {
                show: true,
                lineStyle: {
                    color: '#766D6C'
                }
            },

        },


        ],
        yAxis: [{
            type: 'value',
            scale: true,
            name: '',
            max: 400000,
            min: 0,
            boundaryGap: [110.2, 110.2],

            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#17784F',
                }
            },
        }],
        series: [{
            name: 'Minimum',
            type: 'line',
            // yAxisIndex: 0,
            data: ["-"],
            itemStyle: {
                color: '#FFBF28'
            },

        }, {
            name: 'Maksimum',
            type: 'line',
            // yAxisIndex: 0,
            data: ["-"],
            itemStyle: {
                color: '#27A3F5'
            },
        }
            ,
        {
            name: 'Derece',
            type: 'line',
            // yAxisIndex: 0,
            data: ["-"],
            itemStyle: {
                color: '#e2f733'
            },
        }



        ]
    };
    var dom = document.getElementById("container");

    var myChart = echarts.init(dom);

    // myChart.axes.items[1].maximum = newValue;


    myChart.setOption(option, true);


}


buildGraph();
