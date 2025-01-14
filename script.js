fetch(
  'https://car-api2.p.rapidapi.com/api/models?sort=id&direction=asc&year=2020&verbose=yes', {
  headers: { 'x-rapidapi-host': 'car-api2.p.rapidapi.com', 'x-rapidapi-key': 'a0df3867e6mshb9976cc962f0ad6p1149d0jsn622846aac48d' }
}
)
  .then((respuesta) => {
    if (!respuesta.status == 200) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }
    return respuesta.json();
  })
  .then((datos) => {
    const linea = datos.data;
    let marcas_unicas = [];
    const seleccion = document.getElementById("lista_marcas")

    // Crear el HTML dinámicamente
    const resultado = document.getElementById("resultado");
    if (linea == "0") {
      info.innerHTML = "";
      resultado.innerHTML = ` El coche no esta`;
    } else {
      //Crea la Array con marcas unicas
      linea.forEach(listado => {
        if (!marcas_unicas.includes(listado.make.name)) {
          marcas_unicas.push(listado.make.name);
        }
      });

      marcas_unicas.forEach(marca => {
        const opcion = document.createElement("option");
        opcion.textContent = marca;
        opcion.value = marca;
        seleccion.appendChild(opcion);
      });

      const info = document.getElementById('resultado');
      info.innerHTML = "";

      linea.forEach(listado => {
        const caja = document.createElement("div");
        caja.className = "vehiculo";
        const nombre = document.createElement("h3");
        const coche = document.createElement("h4");
        const marca = document.createElement("p");
        nombre.textContent = "Datos del Coche";
        coche.textContent = "Nombre: " + listado.name;
        marca.textContent = "Marca: " + listado.make.name;
        caja.appendChild(nombre);
        caja.appendChild(coche);
        caja.appendChild(marca);
        info.appendChild(caja);
      });

      seleccion.addEventListener("change", function (e) {
        const info = document.getElementById('resultado');
        info.innerHTML = "Cargando datos del vehículo...";
        info.innerHTML = "";

        linea.forEach(listado => {
          const caja = document.createElement("div");
          caja.className = "vehiculo";
          const nombre = document.createElement("h3");
          const coche = document.createElement("h4");
          const marca = document.createElement("p");
          if (seleccion.value == listado.make.name) {
            nombre.textContent = "Datos del Coche";
            coche.textContent = "Nombre: " + listado.name;
            marca.textContent = "Marca: " + listado.make.name;
            console.log(listado);
            caja.appendChild(nombre);
            caja.appendChild(coche);
            caja.appendChild(marca);
            info.appendChild(caja);

          } if (seleccion.value == "") {
            nombre.textContent = "Datos del Coche";
            coche.textContent = "Nombre: " + listado.name;
            marca.textContent = "Marca: " + listado.make.name;
            console.log(listado);
            caja.appendChild(nombre);
            caja.appendChild(coche);
            caja.appendChild(marca);
            info.appendChild(caja);

          }
        });
      });
    }
  }).catch((error) => {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  });