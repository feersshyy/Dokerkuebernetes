document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-pedidos");

    try {
        const respuesta = await fetch("http://34.135.37.57/api/ventas");
        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        const data = await respuesta.json();
        const pedidos = data.ventas || []; 

        if (pedidos.length === 0) {
            contenedor.innerHTML = "<p>No hay pedidos disponibles.</p>";
            return;
        }

        pedidos.forEach(pedido => {
            const card = document.createElement("div");
            card.classList.add("pedido-card");

            // Formatear la fecha
            const fechaFormateada = new Date(pedido.fecha).toLocaleString("es-MX", {
                dateStyle: "medium",
                timeStyle: "short"
            });

            // Crear la lista de detalles
            const detallesHTML = pedido.detalles.map(d => `
                <li>Autoparte ID: ${d.autoparte_id}, Cantidad: ${d.cantidad}, 
                Precio unitario: $${d.precio_unitario}, Subtotal: $${d.subtotal}</li>
            `).join("");

            card.innerHTML = `
                <h3>Pedido #${pedido.id}</h3>
                <p><strong>Cliente:</strong> ${pedido.cliente_id ?? "Sin cliente"}</p>
                <p><strong>Fecha:</strong> ${fechaFormateada}</p>
                <p><strong>Estado:</strong> ${pedido.estado}</p>
                <p><strong>Total:</strong> $${pedido.total}</p>
                <details>
                    <summary>Ver detalles</summary>
                    <ul>${detallesHTML}</ul>
                </details>
            `;

            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar los pedidos:", error);
        contenedor.innerHTML = `<p class="error">Error al cargar los pedidos. Intenta más tarde.</p>`;
    }
});
