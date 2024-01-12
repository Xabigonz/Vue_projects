const { createApp } = Vue

createApp({
    data() {
        return {
            navbar: ['Inicio', 'Carrito'],
            articulos: [],
            pedido: [],
            total: 0,
            pagina: 1,
            articulosPorPagina: 10
        }
    }, computed: {
        totalPaginas: function () {
            return Math.ceil(this.articulos.length / this.articulosPorPagina)
        }
    },
    methods: {
        obtenerArticulos() {
            fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15')
                .then(response => response.json())
                .then(data => {
                    this.articulos = data
                })
        }

        , w3_open() {
            document.getElementById("sidebar").style.display = "block";
        }, w3_close() {
            document.getElementById("sidebar").style.display = "none";
        },
        toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.style.display = (sidebar.style.display === "none") ? "block" : "none";
        },
        anadirCarrito(event) {
            const card = event.currentTarget;
            const card_cart = card.cloneNode(true);
        
            const nombreProductoElement = card.querySelector('.nombreProducto');
            const nombreProducto = nombreProductoElement ? nombreProductoElement.textContent.trim() : '';
        
            // Intenta encontrar el elemento .precio dentro de la tarjeta clicada
            const precioElement = card.querySelector('.precio');
            const precio = precioElement ? precioElement.textContent.trim() : '';
            
            const producto = document.getElementById('sidebar').appendChild(card_cart) 
            // Añadir producto seleccionado al carro
            if (nombreProducto !== '' && parseFloat(precio) > 0) {
                alert('Producto añadido correctamente!');
        
                const prod = {
                    nombre: nombreProducto,
                    precio: parseFloat(precio)
                };
                this.pedido.push(prod);
                this.total = this.PrecioTotal();
                console.log(this.pedido);
            }
        
            const botonElim = card_cart.querySelector('.boton');
            botonElim.textContent = 'Eliminar';
        
            botonElim.addEventListener('click', () => {
                this.eliminarCarro();
            });
        },
        eliminarCarro() {
            const producto = document.getElementById('sidebar').querySelector('.card')
            const precioElement = producto.querySelector('.precio');
            const precioTexto = precioElement ? precioElement.textContent : '0 €';
        
            // Utilizamos split para obtener solo la parte numérica del precio
            const precio = parseFloat(precioTexto.split(' ')[0]);
            console.log(precio)
            if (producto) {
                producto.remove();
                this.total -= parseFloat(precio)
                alert('Producto eliminado del carrito.');
            }
        },
        PrecioTotal: function () {
            let total = 0;
        
            for (let producto of this.pedido) {
                total += producto.precio;
            }
        
            return total.toFixed(2); // Redondear a dos decimales para el formato de precio
        }

    },
    mounted() {
        this.obtenerArticulos()
    }
}
).mount('#app')


