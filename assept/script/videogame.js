import { url as link } from "./url.js";

const card = document.querySelector(".row");

const pintarDatos = async () => {

    const res = await fetch(link);
    const data = await res.json();

    data.forEach(element => {
        const { id, url, name, tipo, año } = element;

        card.innerHTML += `
        <div class="col-sm-4">
        <div class="card">
            <img src="${url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">TIPO: ${tipo}, AÑO: ${año}</p>
                <button class="btn btn-danger" id="${id}">Eliminar</button>
            </div>
        </div>
    </div>
        `
    });
};
document.addEventListener('DOMContentLoaded', pintarDatos);
card.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btn-danger');
    if (btnEliminar === true) {
        const id = e.target.id;
        await fetch(link + id, {
            method: 'DELETE'
        })
    }
});

const capturarDato = () => {
    const url = document.getElementById("inputUrl").value;
    const name = document.getElementById("inputNombre").value;
    const tipo = document.getElementById("inputTipo").value;
    const año = document.getElementById("inputAño").value;
    const data = {
        url,
        name,
        tipo,
        año
    }
    return data
};
const form = document.querySelector(".form-group");

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const objeto = capturarDato();
    console.log(objeto)
    await fetch(link, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })

});
const btnnombre = document.getElementById('btnConsulta');

btnnombre.addEventListener('click', async () => {

    const input = document.getElementById('inputNombre').value;
    const resp = await fetch(link);
    const lista = await resp.json()
    const buscado = lista.find(u => u.name.toLocaleLowerCase() === input.toLocaleLowerCase())
    if (buscado !== undefined) {
        const { id, año, tipo } = buscado;
        document.getElementById('inputUrl').value = buscado.url;
        document.getElementById('inputAño').value = año;
        document.getElementById('inputTipo').value = tipo;
        document.getElementById('inputId').value = id;
    } else {
        alert('Correo no encontrado')
    }
});
const btnModificar = document.getElementById('btnModificar');

btnModificar.addEventListener('click', async () => {

    const dataMod = capturarDato();
    const {url, name, tipo, año} = dataMod;
   
    if(url === "",name === "",tipo === "",año === ""){
        alert('Llenar todos los campos')
    }
    else{
        const id = document.getElementById('inputId').value;
        console.log(dataMod)
        await fetch(link + id, {
            method: 'PUT',
            body: JSON.stringify(dataMod),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }

})