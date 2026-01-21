// Función para colapsar/expandir secciones
function toggleSection(header) {
    const section = header.closest('.collapsible-section');
    const content = section.querySelector('.section-content');
    const icon = header.querySelector('.section-icon');
    
    if (content.classList.contains('collapsed')) {
        content.classList.remove('collapsed');
        icon.textContent = '-';
        icon.classList.remove('expand-icon');
        icon.classList.add('collapse-icon');
        section.classList.add('expanded');
    } else {
        content.classList.add('collapsed');
        icon.textContent = '+';
        icon.classList.remove('collapse-icon');
        icon.classList.add('expand-icon');
        section.classList.remove('expanded');
    }
}

// Función para simular préstamo
function simulateLoan() {
    const amount = document.getElementById('amount').value;
    const interest = document.getElementById('interest').value;
    const term = document.getElementById('term').value;
    
    // Validación básica
    if (!amount || !interest || !term) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    // Convertir valores para cálculo
    const principal = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
    const annualRate = parseFloat(interest.replace(',', '.')) / 100;
    const monthlyRate = annualRate / 12;
    const numPayments = parseInt(term);
    
    // Cálculo de cuota mensual (fórmula de amortización)
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
        monthlyPayment = principal / numPayments;
    }
    
    // Calcular interés total
    const totalInterest = (monthlyPayment * numPayments) - principal;
    
    // Formatear valores
    const formattedMonthly = monthlyPayment.toFixed(2).replace('.', ',');
    const formattedInterest = totalInterest.toFixed(2).replace('.', ',');
    const formattedPrincipal = principal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.').replace(',', ',');
    
    // Actualizar resumen
    const summaryInputs = document.querySelectorAll('.summary-input');
    summaryInputs[0].value = formattedMonthly + ' $';
    summaryInputs[1].value = numPayments;
    summaryInputs[2].value = formattedInterest + ' $';
    summaryInputs[3].value = formattedPrincipal;
    
    // Scroll suave al resumen
    document.querySelector('.summary-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Formatear inputs numéricos
    const amountInput = document.getElementById('amount');
    const interestInput = document.getElementById('interest');
    
    amountInput.addEventListener('blur', function() {
        let value = this.value.replace(/\./g, '').replace(',', '.');
        if (!isNaN(value) && value !== '') {
            value = parseFloat(value).toFixed(2);
            this.value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
    });
    
    interestInput.addEventListener('blur', function() {
        let value = this.value.replace(',', '.');
        if (!isNaN(value) && value !== '') {
            value = parseFloat(value).toFixed(2);
            this.value = value.replace('.', ',');
        }
    });
    
    // Botón Cerrar
    const btnClose = document.querySelector('.btn-close');
    if (btnClose) {
        btnClose.addEventListener('click', function() {
            // Limpiar resumen
            const summaryInputs = document.querySelectorAll('.summary-input');
            summaryInputs[0].value = '';
            summaryInputs[1].value = '';
            summaryInputs[2].value = '';
            summaryInputs[3].value = '';
        });
    }
    
    // Botón Crear Solicitud
    const btnCreate = document.querySelector('.btn-create');
    if (btnCreate) {
        btnCreate.addEventListener('click', function() {
            const summaryInputs = document.querySelectorAll('.summary-input');
            const hasResults = summaryInputs[0].value !== '';
            
            if (hasResults) {
                alert('Solicitud creada exitosamente');
                // Aquí se podría enviar la solicitud al servidor
            } else {
                alert('Por favor simule un préstamo primero');
            }
        });
    }
});
