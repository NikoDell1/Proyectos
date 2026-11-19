// script.js - Lógica de la agencia de viajes

document.addEventListener('DOMContentLoaded', function() {
    // Filtros de destinos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinoCards = document.querySelectorAll('.destino-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');

            destinoCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Selección de paquetes
    let paqueteActual = null;
    const selectBtns = document.querySelectorAll('.seleccionar-paquete');
    const paqueteInput = document.getElementById('paqueteSeleccionado');
    const precioInput = document.getElementById('precioBase');

    selectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paqueteActual = {
                nombre: this.getAttribute('data-nombre'),
                precio: parseFloat(this.getAttribute('data-precio'))
            };
            paqueteInput.value = paqueteActual.nombre;
            precioInput.value = paqueteActual.precio;
            // Scroll to form
            document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' });
            alert('Paquete "' + paqueteActual.nombre + '" seleccionado. Completa el formulario.');
        });
    });

    // Formulario de reserva
    const form = document.getElementById('formReserva');
    const resumen = document.getElementById('resumenReserva');
    const resumenContenido = document.getElementById('resumenContenido');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        if (!paqueteActual) {
            alert('Por favor selecciona un paquete primero.');
            return;
        }

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const personas = parseInt(document.getElementById('personas').value);
        const fecha = document.getElementById('fecha').value;
        const seguro = document.getElementById('seguro').checked;
        let total = paqueteActual.precio * personas;
        if (seguro) total += 80 * personas;

        // Aplicar promo simple si es playa (ejemplo)
        let descuento = 0;
        if (paqueteActual.nombre.includes('Cancún') || paqueteActual.nombre.includes('Bali')) {
            descuento = total * 0.20;
            total -= descuento;
        }

        resumenContenido.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Paquete:</strong> ${paqueteActual.nombre}</p>
            <p><strong>Personas:</strong> ${personas}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Precio base:</strong> $${paqueteActual.precio} x ${personas} = $${paqueteActual.precio * personas}</p>
            ${seguro ? '<p><strong>Seguro:</strong> +$' + (80 * personas) + '</p>' : ''}
            ${descuento > 0 ? '<p><strong>Descuento promo 20%:</strong> -$' + descuento.toFixed(2) + '</p>' : ''}
            <h5 class="mt-3">Total estimado: $${total.toFixed(2)} USD</h5>
        `;

        resumen.classList.remove('d-none');
        form.classList.add('was-validated');
    });

    // Modal destinos
    const modal = document.getElementById('modalDestino');
    modal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const destino = button.getAttribute('data-destino');
        const modalTitle = modal.querySelector('.modal-title');
        const modalBody = modal.querySelector('.modal-body');
        modalTitle.textContent = destino;
        modalBody.innerHTML = `<p>Información detallada sobre <strong>${destino}</strong>.</p><p>Disfruta de una experiencia única con nuestros paquetes personalizados. Incluye alojamiento, tours y más. ¡Contáctanos para más info!</p>`;
    });

    // Bootstrap form validation
    // Already handled in submit
});