const COLORS = {
    primary: '#2563eb',
    accent: '#f59e0b',
    success: '#22c55e',
    danger: '#ef4444',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    grid: 'rgba(255,255,255,0.05)',
    text: '#94a3b8',
};

const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            labels: { color: COLORS.text, font: { size: 12 } }
        }
    },
    scales: {
        x: {
            ticks: { color: COLORS.text },
            grid: { color: COLORS.grid }
        },
        y: {
            ticks: { color: COLORS.text },
            grid: { color: COLORS.grid }
        }
    }
};

// Gráfico de líneas - Evolución mensual
const lineCtx = document.getElementById('lineChart');
if (lineCtx) {
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Real 2026',
                    data: [65, 72, 68, 80, 87, 91, 88, 94, 89, 96, 92, 98],
                    borderColor: COLORS.primary,
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: COLORS.primary,
                },
                {
                    label: 'Meta',
                    data: [75, 75, 80, 80, 85, 85, 90, 90, 90, 95, 95, 95],
                    borderColor: COLORS.accent,
                    borderDash: [6, 3],
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: COLORS.accent,
                }
            ]
        },
        options: { ...defaultOptions, aspectRatio: 3 }
    });
}

// Gráfico donut - Distribución
const doughnutCtx = document.getElementById('doughnutChart');
if (doughnutCtx) {
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D'],
            datasets: [{
                data: [35, 28, 22, 15],
                backgroundColor: [COLORS.primary, COLORS.accent, COLORS.success, COLORS.purple],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: COLORS.text, padding: 16, font: { size: 12 } }
                }
            }
        }
    });
}

// Gráfico de barras - Comparativa
const barCtx = document.getElementById('barChart');
if (barCtx) {
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: '2025',
                    data: [68, 74, 79, 83],
                    backgroundColor: 'rgba(37,99,235,0.5)',
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: '2026',
                    data: [72, 85, 89, 94],
                    backgroundColor: 'rgba(245,158,11,0.5)',
                    borderColor: COLORS.accent,
                    borderWidth: 1,
                    borderRadius: 6,
                }
            ]
        },
        options: defaultOptions
    });
}

// Gráfico radar - Rendimiento por área
const radarCtx = document.getElementById('radarChart');
if (radarCtx) {
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Calidad', 'Velocidad', 'Eficiencia', 'Innovación', 'Satisfacción', 'Cobertura'],
            datasets: [
                {
                    label: 'Actual',
                    data: [88, 76, 92, 65, 84, 79],
                    borderColor: COLORS.primary,
                    backgroundColor: 'rgba(37,99,235,0.15)',
                    pointBackgroundColor: COLORS.primary,
                },
                {
                    label: 'Objetivo',
                    data: [90, 85, 90, 80, 90, 85],
                    borderColor: COLORS.accent,
                    backgroundColor: 'rgba(245,158,11,0.1)',
                    borderDash: [4, 2],
                    pointBackgroundColor: COLORS.accent,
                }
            ]
        },
        options: {
            responsive: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    labels: { color: COLORS.text }
                }
            },
            scales: {
                r: {
                    ticks: { color: COLORS.text, backdropColor: 'transparent' },
                    grid: { color: COLORS.grid },
                    pointLabels: { color: COLORS.text },
                    min: 0,
                    max: 100
                }
            }
        }
    });
}
