import { url as link } from "./url.js";

const card = document.querySelector(".row");
const form = document.getElementById("form");
const consultar = document.getElementById("consultar");
const modificar = document.getElementById("modificar");

const capturarDatos = () => {
    const url = document.getElementById("url").value;
    const nombre = document.getElementById("name").value;
    const tipo = document.getElementById("tipo").value;
    const año = document.getElementById("año").value;
    
    console.log(url, nombre, tipo, año)
    const videogame = {
        url,
        nombre,
        tipo,
        año
    };

    return videogame;

};

const pintarDatos = async () => {

    const res = await fetch(link);
    const data = await res.json();

    data.forEach(element => {
        const { id, url, name, tipo, año } = element;

        card.innerHTML += `
        <div class="col-sm-6">
        <div class="card">
            <img src="${url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${tipo}</p>
                <p class="card-text"><small class="text-muted">${año}</small></p>
                <button class="btn btn-danger" id="${id}">Eliminar</button>
            </div>
        </div>
    </div>
        `
    });
};
document.addEventListener('DOMContentLoaded', pintarDatos);


form.addEventListener("submit", async (e) => {
    const obj = capturarDatos();

    await fetch(link, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
           "Content-Type": "application/json; charset=utf-8",
        },
    });
});

card.addEventListener("click", async (e) => {
    const eliminar = e.target.classList.contains("btn-danger");

    if(eliminar){
        const id = e.target.id;
        await fetch(link + id, {
         method: "DELETE",
      });
    }
});

consultar.addEventListener("click", async (e) => {
    const input = document.getElementById("name").value;

    const res = await fetch(link);
    const data = await res.json();

    const buscado = data.find((e) => e.nombre.toLocaleLowerCase() === input.toLocaleLowerCase());

    if (buscado !== undefined) {
        const { id, url, nombre, tipo, año } = buscado;
  
        document.getElementById("url").value = url;
        document.getElementById("name").value = nombre;
        document.getElementById("tipo").value = tipo;
        document.getElementById("año").value = año;
     } else {
        alert("No encontrado");
     }
});

modificar.addEventListener("click", async (e) => {
    const datosModificar = capturarDatos();

    const {url, nombre, tipo, año} = datosModificar;

    if (url==="", nombre==="", tipo==="", año==="") {
        alert("Llenar todos los campos");
    }else{

        const id = document.getElementById("id").value;

        await fetch(url + id, {
            method: "PUT",
            body: JSON.stringify(datosModificar),
            headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
         });
    }
})




