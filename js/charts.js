const COLORS = {
    primary: '#2563eb',
    accent:  '#f59e0b',
    success: '#22c55e',
    danger:  '#ef4444',
    purple:  '#8b5cf6',
    grid:    'rgba(255,255,255,0.05)',
    text:    '#94a3b8',
};

// Lee el JSON y construye todos los gráficos y KPIs
fetch('data/datos.json')
    .then(response => response.json())
    .then(datos => {
        cargarKPIs(datos.kpis);
        crearLineChart(datos.evolucion_mensual);
        crearDoughnutChart(datos.distribucion);
        crearBarChart(datos.comparativa_trimestral);
        crearRadarChart(datos.rendimiento_areas);
    })
    .catch(err => console.error('Error al cargar datos.json:', err));


function cargarKPIs(kpis) {
    document.getElementById('kpi-total').textContent    = kpis.total_registros.valor;
    document.getElementById('kpi-promedio').textContent = kpis.cumplimiento.valor;
    document.getElementById('kpi-activos').textContent  = kpis.activos.valor;
    document.getElementById('kpi-meta').textContent     = kpis.meta_alcanzada.valor;

    actualizarTendencia('kpi-total',    kpis.total_registros);
    actualizarTendencia('kpi-promedio', kpis.cumplimiento);
    actualizarTendencia('kpi-activos',  kpis.activos);
    actualizarTendencia('kpi-meta',     kpis.meta_alcanzada);
}

function actualizarTendencia(idKpi, datos) {
    const card = document.getElementById(idKpi).closest('.kpi-card');
    const trend = card.querySelector('.kpi-trend');
    trend.textContent = datos.tendencia;
    trend.className = 'kpi-trend ' + (datos.positivo ? 'positive' : 'negative');
}


function crearLineChart(datos) {
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datos.etiquetas,
            datasets: [
                {
                    label: 'Real 2026',
                    data: datos.real_2026,
                    borderColor: COLORS.primary,
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: COLORS.primary,
                },
                {
                    label: 'Meta',
                    data: datos.meta,
                    borderColor: COLORS.accent,
                    borderDash: [6, 3],
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: COLORS.accent,
                }
            ]
        },
        options: baseOptions({ aspectRatio: 3 })
    });
}

function crearDoughnutChart(datos) {
    const ctx = document.getElementById('doughnutChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: datos.etiquetas,
            datasets: [{
                data: datos.valores,
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

function crearBarChart(datos) {
    const ctx = document.getElementById('barChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datos.etiquetas,
            datasets: [
                {
                    label: '2025',
                    data: datos.anio_2025,
                    backgroundColor: 'rgba(37,99,235,0.5)',
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: '2026',
                    data: datos.anio_2026,
                    backgroundColor: 'rgba(245,158,11,0.5)',
                    borderColor: COLORS.accent,
                    borderWidth: 1,
                    borderRadius: 6,
                }
            ]
        },
        options: baseOptions({})
    });
}

function crearRadarChart(datos) {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: datos.etiquetas,
            datasets: [
                {
                    label: 'Actual',
                    data: datos.actual,
                    borderColor: COLORS.primary,
                    backgroundColor: 'rgba(37,99,235,0.15)',
                    pointBackgroundColor: COLORS.primary,
                },
                {
                    label: 'Objetivo',
                    data: datos.objetivo,
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
                legend: { labels: { color: COLORS.text } }
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

function baseOptions(extra) {
    return {
        responsive: true,
        plugins: {
            legend: { labels: { color: COLORS.text, font: { size: 12 } } }
        },
        scales: {
            x: { ticks: { color: COLORS.text }, grid: { color: COLORS.grid } },
            y: { ticks: { color: COLORS.text }, grid: { color: COLORS.grid } }
        },
        ...extra
    };
}
