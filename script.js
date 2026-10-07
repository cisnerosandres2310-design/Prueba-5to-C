document.addEventListener('DOMContentLoaded', () => {

    // 1. Ticker de Mercado Dinámico
    const tickerData = [
        { symbol: 'BTC/USD', price: '64,230.50', change: '+2.45%', positive: true },
        { symbol: 'ETH/USD', price: '3,450.10', change: '+1.80%', positive: true },
        { symbol: 'EUR/USD', price: '1.0850', change: '-0.12%', positive: false },
        { symbol: 'AAPL', price: '224.30', change: '+0.75%', positive: true },
        { symbol: 'NVDA', price: '128.50', change: '+4.10%', positive: true },
        { symbol: 'GOLD', price: '2,380.00', change: '-0.45%', positive: false }
    ];

    const tickerContainer = document.getElementById('tickerContainer');
    
    // Duplicar datos para flujo continuo infinito
    const fullTicker = [...tickerData, ...tickerData];
    
    tickerContainer.innerHTML = fullTicker.map(item => `
        <div class="ticker-item">
            <strong>${item.symbol}</strong>
            <span>${item.price}</span>
            <span class="${item.positive ? 'positive' : 'negative'}">${item.change}</span>
        </div>
    `).join('');

    // 2. Gráfico Interactivo Simulado (Canvas)
    const canvas = document.getElementById('tradingChart');
    const ctx = canvas.getContext('2d');
    
    let points = [120, 115, 125, 130, 128, 135, 140, 138, 145, 150, 148, 160, 155, 170];

    function drawChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const height = canvas.height;
        const step = width / (points.length - 1);

        // Dibujar Degradado de Fondo del Gráfico
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let i = 0; i < points.length; i++) {
            const x = i * step;
            const y = height - (points[i] * 1.2);
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Dibujar Línea Principal
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            const x = i * step;
            const y = height - (points[i] * 1.2);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    drawChart();

    // Actualización de Precios Simulado en Tiempo Real
    const livePriceEl = document.getElementById('livePrice');
    let currentPrice = 64230.50;

    setInterval(() => {
        const randomChange = (Math.random() - 0.48) * 50;
        currentPrice += randomChange;
        
        // Actualizar el gráfico
        points.shift();
        points.push(points[points.length - 1] + (randomChange / 10));
        drawChart();

        // Renderizar el nuevo precio en interfaz
        livePriceEl.innerText = `$${currentPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }, 2000);

    // Botones de Compra/Venta rápidos (Interacción)
    document.getElementById('btnBuy').addEventListener('click', () => {
        alert('Orden de COMPRA enviada a la cuenta de prueba.');
    });

    document.getElementById('btnSell').addEventListener('click', () => {
        alert('Orden de VENTA enviada a la cuenta de prueba.');
    });

    // 3. Calculadora de Rendimiento
    const depositRange = document.getElementById('depositRange');
    const returnRange = document.getElementById('returnRange');
    const monthsRange = document.getElementById('monthsRange');

    const depositVal = document.getElementById('depositVal');
    const returnVal = document.getElementById('returnVal');
    const monthsVal = document.getElementById('monthsVal');

    const calcTotal = document.getElementById('calcTotal');
    const calcProfit = document.getElementById('calcProfit');

    function calculateReturns() {
        const P = parseFloat(depositRange.value);
        const r = parseFloat(returnRange.value) / 100;
        const n = parseInt(monthsRange.value);

        // Fórmula Interés Compuesto
        const total = P * Math.pow((1 + r), n);
        const profit = total - P;

        depositVal.innerText = `$${P.toLocaleString()}`;
        returnVal.innerText = `${(r * 100).toFixed(1)}%`;
        monthsVal.innerText = `${n} meses`;

        calcTotal.innerText = `$${total.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
        calcProfit.innerText = `+$${profit.toLocaleString('en-US', {maximumFractionDigits: 2})}`;
    }

    depositRange.addEventListener('input', calculateReturns);
    returnRange.addEventListener('input', calculateReturns);
    monthsRange.addEventListener('input', calculateReturns);

    calculateReturns();

    // 4. Toggle de Precios (Mensual / Anual)
    const billingSwitch = document.getElementById('billingSwitch');
    const priceVals = document.querySelectorAll('.price-val');

    billingSwitch.addEventListener('change', () => {
        const isYearly = billingSwitch.checked;
        priceVals.forEach(priceEl => {
            const monthlyPrice = priceEl.getAttribute('data-monthly');
            const yearlyPrice = priceEl.getAttribute('data-yearly');
            priceEl.innerText = isYearly ? yearlyPrice : monthlyPrice;
        });
    });

    // 5. Ventana Modal (Popup de Registro)
    const modal = document.getElementById('registerModal');
    const closeModalBtn = document.getElementById('closeModal');

    window.openModal = function() {
        modal.classList.add('active');
    };

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.getElementById('modalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Registro exitoso! Te hemos enviado un correo de confirmación.');
        modal.classList.remove('active');
    });
});