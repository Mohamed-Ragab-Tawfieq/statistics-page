// html legend plugin
const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');

    if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.style.display = 'flex';
        listContainer.style.alignItems = 'center';
        listContainer.style.justifyContent = 'center';
        listContainer.style.flexDirection = 'row';
        listContainer.style.margin = 0;
        listContainer.style.padding = 0;

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(item => {
            const li = document.createElement('li');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';
            li.style.marginLeft = '5px';

            li.onclick = () => {
                const {
                    type
                } = chart.config;
                if (type === 'pie' || type === 'doughnut') {
                    // Pie and doughnut charts only have a single dataset and visibility is per item
                    chart.toggleDataVisibility(item.index);
                } else {
                    chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                }
                chart.update();
            };

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.height = '10px';
            boxSpan.style.width = '10px';
            boxSpan.style.marginLeft = '5px';
            boxSpan.style.borderRadius = '50%';

            // Text
            const textContainer = document.createElement('small');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = 0;
            textContainer.style.padding = 0;
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            li.appendChild(boxSpan);
            li.appendChild(textContainer);
            ul.appendChild(li);
        });
    }
}

// product stats
const proData = {
    labels: [
        'المنتجات المقبولة',
        'المنتجات المرفوضة',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [250, 60],
        backgroundColor: [
            '#2A6DEC',
            '#F43636',
        ],
        borderWidth: 15,
        borderRadius: 25,
        hoverBorderColor: '#fff',
    }]
};


// past month difference
var proPastMonth = 188;
var proCurrentMonth = proData.datasets[0].data[0];
var proPastDiffer;

if (proPastMonth > proCurrentMonth) {
    proPastDiffer = Math.floor((proCurrentMonth / proPastMonth) * 10000) / 100
} else {
    proPastDiffer = Math.floor((proPastMonth / proCurrentMonth) * 10000) / 100
}
document.getElementById('proPastDiffer').innerHTML = proPastDiffer + '%'
document.getElementById('approvedProCount').innerHTML = proCurrentMonth

if (proPastMonth < proCurrentMonth) {
    document.getElementsByClassName('stats-curve')[0].src = 'assets/images/icons/up.svg'
} else {
    document.getElementsByClassName('stats-curve')[0].src = 'assets/images/icons/down.svg'
}

const proConfig = {
    type: 'doughnut',
    data: proData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                }
            },
            htmlLegend: {
                containerID: 'proLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                            text: ` ${data} ${chart.data.labels[i]}`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                }
            },
        }
    },
    plugins: [htmlLegendPlugin],
};

var proStats = new Chart(
    document.getElementById('proStats'),
    proConfig
);

// company stats
const comData = {
    labels: [
        'الشركات المقبولة',
        'الشركات المرفوضة',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [250, 60],
        backgroundColor: [
            '#2A6DEC',
            '#F43636',
        ],
        borderWidth: 15,
        borderRadius: 25,
        hoverBorderColor: '#fff',
    }]
};


// past month difference
var comPastMonth = 300;
var comCurrentMonth = comData.datasets[0].data[0];
var comPastDiffer;

if (comPastMonth > comCurrentMonth) {
    comPastDiffer = Math.floor((comCurrentMonth / comPastMonth) * 10000) / 100;
} else {
    comPastDiffer = Math.floor((comPastMonth / comCurrentMonth) * 10000) / 100;
}
document.getElementById('comPastDiffer').innerHTML = comPastDiffer + '%';
document.getElementById('approvedComCount').innerHTML = comCurrentMonth

if (comPastMonth < comCurrentMonth) {
    document.getElementsByClassName('stats-curve')[1].src = 'assets/images/icons/up.svg'
} else {
    document.getElementsByClassName('stats-curve')[1].src = 'assets/images/icons/down.svg'
}

const comConfig = {
    type: 'doughnut',
    data: comData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                }
            },
            htmlLegend: {
                containerID: 'comLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                            text: ` ${data} ${chart.data.labels[i]}`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin],
};

var comStats = new Chart(
    document.getElementById('comStats'),
    comConfig
);

// factory stats
const factData = {
    labels: [
        'المصانع المقبولة',
        'المصانع المرفوضة',
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [250, 60],
        backgroundColor: [
            '#2A6DEC',
            '#F43636',
        ],
        borderWidth: 15,
        borderRadius: 25,
        hoverBorderColor: '#fff',
    }]
};


// past month difference
var factPastMonth = 300;
var factCurrentMonth = factData.datasets[0].data[0];
var factPastDiffer;

if (factPastMonth > factCurrentMonth) {
    factPastDiffer = Math.floor((factCurrentMonth / factPastMonth) * 10000) / 100;
} else {
    factPastDiffer = Math.floor((factPastMonth / factCurrentMonth) * 10000) / 100;
}
document.getElementById('factPastDiffer').innerHTML = factPastDiffer + '%';
document.getElementById('approvedFactCount').innerHTML = factCurrentMonth

if (factPastMonth < factCurrentMonth) {
    document.getElementsByClassName('stats-curve')[2].src = 'assets/images/icons/up.svg'
} else {
    document.getElementsByClassName('stats-curve')[2].src = 'assets/images/icons/down.svg'
}

const factConfig = {
    type: 'doughnut',
    data: factData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                }
            },
            htmlLegend: {
                containerID: 'factLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                            text: ` ${data} ${chart.data.labels[i]}`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin],
};

var factStats = new Chart(
    document.getElementById('factStats'),
    factConfig
);

// users stats
const usersData = {
    labels: ['نشط', 'غير نشط'],
    datasets: [{
        label: 'My First Dataset',
        data: [100, 300],
        backgroundColor: [
            '#2A6DEC',
            '#F43636',
        ],
        borderWidth: 8,
        borderRadius: 25,
        hoverBorderColor: '#fff',
    }],
};

const usersConfig = {
    type: 'doughnut',
    data: usersData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                }
            },
            htmlLegend: {
                containerID: 'usersLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    generateLabels: (chart) => {
                        const datasets = chart.data.datasets;
                        return datasets[0].data.map((data, i) => ({
                            text: `${chart.data.labels[i]} ${data}`,
                            fillStyle: datasets[0].backgroundColor[i],
                        }))
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin],
};

var usersStats = new Chart(
    document.getElementById('usersStats'),
    usersConfig
);

// orders
$(document).ready(function () {
    var ordersMax = [100, 120, 150, 200],
        ordersValue = [50, 70, 100, 120],

        factPercent = Math.floor((ordersValue[0] / ordersMax[0]) * 100),
        comPercent = Math.floor((ordersValue[1] / ordersMax[1]) * 100),
        samplePercent = Math.floor((ordersValue[2] / ordersMax[2]) * 100),
        proPercent = Math.floor((ordersValue[3] / ordersMax[3]) * 100);

    $('#ordersFactStats').parent().find('.percentage').text(factPercent + '%');
    $('#ordersFactStats').attr('value', ordersValue[0]);
    $('#ordersFactStats').attr('max', ordersMax[0]);

    $('#ordersComStats').parent().find('.percentage').text(comPercent + '%');
    $('#ordersComStats').attr('value', ordersValue[1]);
    $('#ordersComStats').attr('max', ordersMax[1]);

    $('#ordersSampleStats').parent().find('.percentage').text(samplePercent + '%');
    $('#ordersSampleStats').attr('value', ordersValue[2]);
    $('#ordersSampleStats').attr('max', ordersMax[2]);

    $('#ordersProStats').parent().find('.percentage').text(proPercent + '%');
    $('#ordersProStats').attr('value', ordersValue[3]);
    $('#ordersProStats').attr('max', ordersMax[3]);

    $('.stats progress::before').css('left', 100);
});


// company approvals
const comApprovalsData = {
    labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [{
            label: 'نشطة',
            data: [0, 1000, 2000, 2000, 3000, 4000, 5000, 6000, 7000, 2000, 8000, 8000],
            backgroundColor: [
                '#2B6FF1'
            ],
            lineTension: 0.3,
            borderWidth: 3,
            pointRadius: 4,
            borderColor: '#2B6FF1',
            pointBorderColor: '#80A9F7',
            hoverBorderColor: '#000',
            hoverBackgroundColor: '#000',
            pointStyle: 'circle',
        },
        {
            label: 'غير نشطة',
            data: [3000, 3000, 4000, 5000, 6000, 5000, 7000, 8000, 8000, 9000, 9000, 9000],
            backgroundColor: [
                'gray'
            ],
            lineTension: 0.3,
            borderWidth: 3,
            pointRadius: 4,
            borderColor: 'gray',
            pointBorderColor: '#ccc',
            hoverBorderColor: '#000',
            hoverBackgroundColor: '#000',
            pointStyle: 'circle',
        }
    ],
};

const comApprovalsConfig = {
    type: 'line',
    data: comApprovalsData,
    options: {
        responsive: true,
        chartArea: {
            backgroundColor: "blue"
        },
        interaction: {
            intersect: false,
        },
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                },
            },
            htmlLegend: {
                containerID: 'comApprovalsLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                }
            },

        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000',
                    color: '#000',
                    maxRotation: 45,
                    minRotation: 45,
                }
            },
            y: {
                position: 'right',
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: 5000,
                    callback: function (label, index, labels) {
                        return label == 0 ? label : label / 1000 + 'k';
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin]
};

var comApprovalsStats = new Chart(
    document.getElementById('comApprovalsStats'),
    comApprovalsConfig
);

// factory approvals
const factApprovalsData = {
    labels: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [{
            label: 'نشطة',
            data: [0, 1000, 2000, 2000, 3000, 4000, 5000, 6000, 7000, 2000, 8000, 11000],
            backgroundColor: [
                '#2B6FF1'
            ],
            borderWidth: 3,
            pointRadius: 4,
            borderColor: '#2B6FF1',
            pointBorderColor: '#80A9F7',
            hoverBorderColor: '#000',
            hoverBackgroundColor: '#000',
            pointStyle: 'circle',
        },
        {
            label: 'غير نشطة',
            data: [3000, 3000, 4000, 5000, 6000, 5000, 7000, 8000, 8000, 9000, 9000, 12000],
            backgroundColor: [
                'gray'
            ],
            borderWidth: 3,
            pointRadius: 4,
            borderColor: 'gray',
            pointBorderColor: '#ccc',
            hoverBorderColor: '#000',
            hoverBackgroundColor: '#000',
            pointStyle: 'circle',
        }
    ],
};

const factApprovalsConfig = {
    type: 'line',
    data: factApprovalsData,
    options: {
        responsive: true,
        interaction: {
            intersect: false,
        },
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                },
            },
            htmlLegend: {
                containerID: 'factApprovalsLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                }
            },

        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000',
                    maxRotation: 45,
                    minRotation: 45,
                }
            },
            y: {
                position: 'right',
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: 5000,
                    callback: function (label, index, labels) {
                        return label == 0 ? label : label / 1000 + 'k';
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin]
};

var factApprovalsStats = new Chart(
    document.getElementById('factApprovalsStats'),
    factApprovalsConfig
);

// product approvals
const proApprovalsData = {
    labels: ['ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال', 'ألبان أطفال'],
    datasets: [{
            label: 'نشطة',
            data: [6000, 1000, 2000, 2000, 3000, 4000, 5000, 6000, 7000, 2000, 8000, 11000],
            borderRadius: 5,
            backgroundColor: [
                'gray'
            ],
        },
        {
            label: 'غير نشطة',
            data: [9000, 3000, 4000, 5000, 6000, 5000, 7000, 8000, 8000, 9000, 9000, 12000],
            borderRadius: 5,
            backgroundColor: [
                '#2B6FF1'
            ],
        }
    ],
};

const proApprovalsConfig = {
    type: 'bar',
    data: proApprovalsData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                },
            },
            htmlLegend: {
                containerID: 'proApprovalsLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                }
            },

        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#000',
                    maxRotation: 45,
                    minRotation: 45,
                }
            },
            y: {
                position: 'right',
                grid: {
                    display: false,
                },
                ticks: {
                    stepSize: 5000,
                    callback: function (label, index, labels) {
                        return label == 0 ? label : label / 1000 + 'k';
                    }
                }
            }
        }
    },
    plugins: [htmlLegendPlugin]
};

var proApprovalsStats = new Chart(
    document.getElementById('proApprovalsStats'),
    proApprovalsConfig
);


// total stats
const totalData = {
    labels: ['المنتجات المقبولة', 'المنتجات المعلقة', 'المنتجات المرفوضة'],
    datasets: [{
        label: 'My First Dataset',
        data: [320, 120],
        backgroundColor: [
            '#2A6DEC',
            '#F43636',
        ],
        pointStyle: 'circle',
    }],
};

const totalConfig = {
    type: 'doughnut',
    data: totalData,
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                displayColors: false,
                backgroundColor: '#F1F7FF',
                borderColor: '#D5D5D5',
                borderWidth: 1,
                bodyColor: '#333',
                callbacks: {
                    title: function () {},
                },
            },
            htmlLegend: {
                containerID: 'totalLegend',
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                }
            }
        },
    },
    plugins: [htmlLegendPlugin],
};

var totalStats = new Chart(
    document.getElementById('totalStats'),
    totalConfig
);