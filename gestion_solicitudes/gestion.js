// Datos de ejemplo para las cuotas
const installmentsData = [
    { number: 1, amount: '150.000,00', installmentAmount: '8.333,33', interest: '1.062,50', paymentDate: '2024-02-15', status: 'pendiente' },
    { number: 2, amount: '141.666,67', installmentAmount: '8.333,33', interest: '1.003,47', paymentDate: '2024-03-15', status: 'pendiente' },
    { number: 3, amount: '133.333,34', installmentAmount: '8.333,33', interest: '944,44', paymentDate: '2024-04-15', status: 'pendiente' },
    { number: 4, amount: '125.000,01', installmentAmount: '8.333,33', interest: '885,42', paymentDate: '2024-05-15', status: 'pendiente' },
    { number: 5, amount: '116.666,68', installmentAmount: '8.333,33', interest: '826,39', paymentDate: '2024-06-15', status: 'pendiente' }
];

// Mapeo de estados a clases CSS y texto
const statusMap = {
    'pendiente': { class: 'status-pendiente', text: 'Pendiente' },
    'pagada': { class: 'status-pagada', text: 'Pagada' },
    'vencida': { class: 'status-vencida', text: 'Vencida' },
    'proxima': { class: 'status-proxima', text: 'Próxima' }
};

// Variable para almacenar la acción seleccionada
let selectedAction = null;

// Función para generar la tabla de cuotas
function generateInstallmentsTable() {
    const tbody = document.getElementById('installmentsTableBody');
    tbody.innerHTML = '';
    
    installmentsData.forEach(installment => {
        const row = document.createElement('tr');
        const statusInfo = statusMap[installment.status] || statusMap['pendiente'];
        
        row.innerHTML = `
            <td>${installment.number}</td>
            <td>${installment.amount}</td>
            <td>${installment.installmentAmount}</td>
            <td>${installment.interest}</td>
            <td>${formatDate(installment.paymentDate)}</td>
            <td><span class="status-badge ${statusInfo.class}">${statusInfo.text}</span></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Función para formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Función para manejar acciones de los botones
function handleAction(action) {
    selectedAction = action;
    const reasonTextarea = document.getElementById('reason');
    
    // Limpiar textarea
    reasonTextarea.value = '';
    
    // Mensajes según la acción
    const messages = {
        'authorize': 'Ingrese el motivo de autorización',
        'request-info': 'Ingrese la información que necesita solicitar',
        'cancel': 'Ingrese el motivo de cancelación',
        'reject': 'Ingrese el motivo de rechazo'
    };
    
    reasonTextarea.placeholder = messages[action] || 'Ingrese el motivo...';
    reasonTextarea.focus();
    
    // Scroll al textarea
    reasonTextarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Función para confirmar acción
function confirmAction() {
    const reasonTextarea = document.getElementById('reason');
    const reason = reasonTextarea.value.trim();
    
    if (!selectedAction) {
        alert('Por favor seleccione una acción primero');
        return;
    }
    
    if (!reason) {
        alert('Por favor ingrese un motivo');
        reasonTextarea.focus();
        return;
    }
    
    // Mensajes de confirmación según la acción
    const confirmMessages = {
        'authorize': '¿Está seguro de autorizar esta solicitud?',
        'request-info': '¿Desea solicitar información adicional?',
        'cancel': '¿Está seguro de cancelar esta solicitud?',
        'reject': '¿Está seguro de rechazar esta solicitud?'
    };
    
    const message = confirmMessages[selectedAction] || '¿Confirma esta acción?';
    
    if (confirm(message)) {
        // Aquí se enviaría la acción al servidor
        console.log('Acción:', selectedAction);
        console.log('Motivo:', reason);
        
        alert('Acción procesada exitosamente');
        
        // Limpiar formulario
        reasonTextarea.value = '';
        selectedAction = null;
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    generateInstallmentsTable();
    
    // Agregar evento para limpiar acción si se borra el motivo
    const reasonTextarea = document.getElementById('reason');
    reasonTextarea.addEventListener('input', function() {
        if (this.value.trim() === '') {
            // Opcional: mantener la acción seleccionada
        }
    });
});
