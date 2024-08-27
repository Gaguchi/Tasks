document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        const content = header.nextElementSibling;
        const subtables = [];
        
        let nextElement = content.nextElementSibling;
        while (nextElement && nextElement.classList.contains('subtable')) {
            subtables.push(nextElement);
            nextElement = nextElement.nextElementSibling;
        }
        
        if (header.classList.contains('active')) {
            content.style.display = 'table-row';
            subtables.forEach(subtable => {
                subtable.style.display = 'table-row';
            });
        } else {
            content.style.display = 'none';
            subtables.forEach(subtable => {
                subtable.style.display = 'none';
            });
        }
        
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (content.style.display === 'table-row') {
                content.style.display = 'none';
                subtables.forEach(subtable => {
                    subtable.style.display = 'none';
                });
            } else {
                content.style.display = 'table-row';
                subtables.forEach(subtable => {
                    subtable.style.display = 'table-row';
                });
            }
        });
    });
});

Highcharts.chart('container', {
    title: {
        text: 'Growth of Internet Users Worldwide (logarithmic scale)'
    },

    accessibility: {
        point: {
            valueDescriptionFormat:
                '{xDescription}{separator}{value} million(s)'
        }
    },

    xAxis: {
        title: {
            text: 'Year'
        },
        categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023]
    },

    yAxis: {
        type: 'logarithmic',
        title: {
            text: 'Number of Internet Users (in millions)'
        }
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br />',
        pointFormat: '{point.y} million(s)'
    },

    series: [{
        name: 'Internet Users',
        keys: ['y', 'color'],
        data: [
            [16, '#0000ff'],
            [361, '#8d0073'],
            [1018, '#ba0046'],
            [2025, '#d60028'],
            [3192, '#eb0014'],
            [4673, '#fb0004'],
            [5200, '#ff0000']
        ],
        color: {
            linearGradient: {
                x1: 0,
                x2: 0,
                y1: 1,
                y2: 0
            },
            stops: [
                [0, '#0000ff'],
                [1, '#ff0000']
            ]
        }
    }]
});
document.addEventListener('DOMContentLoaded', function() {
    function initializeChart(containerId) {
        Highcharts.chart(containerId, {
            chart: {
                type: 'spline',
                inverted: true
            },
            title: {
                text: 'Atmosphere Temperature by Altitude',
                align: 'left'
            },
            subtitle: {
                text: 'According to the Standard Atmosphere Model',
                align: 'left'
            },
            xAxis: {
                reversed: false,
                title: {
                    enabled: true,
                    text: 'Altitude'
                },
                labels: {
                    format: '{value} km'
                },
                accessibility: {
                    rangeDescription: 'Range: 0 to 80 km.'
                },
                maxPadding: 0.05,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    format: '{value}°'
                },
                accessibility: {
                    rangeDescription: 'Range: -90°C to 20°C.'
                },
                lineWidth: 2
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x} km: {point.y}°C'
            },
            plotOptions: {
                spline: {
                    marker: {
                        enable: false
                    }
                }
            },
            series: [{
                name: 'Temperature',
                data: [
                    [0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                    [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]
                ]
            }]
        });
    }

    for (let i = 2; i <= 7; i++) {
        initializeChart(`container-${i}`);
    }
});