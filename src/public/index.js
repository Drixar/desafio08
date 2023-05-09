const socketClient = io();
let user;

Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, ingresa tu usario",
    input:"text",
    allowOutsideClick:false,
    inputValidator: (respuesta) => {
        if (!respuesta) {
          return 'You need to write something!'
        } 
      }
}).then(respuesta=>{
    user = respuesta.value;
});

// const productForm = document.getElementById("productForm");
// productForm.addEventListener("submit",(evt)=>{
//     evt.preventDefault();
//     const product ={
//         title: document.getElementById("title").value,
//         price: document.getElementById("price").value,
//         thumbnail: document.getElementById("thumbnail").value
//     }
//     socketClient.emit("newProduct",product);
//     document.getElementById("title").value = "";
//     document.getElementById("price").value = "";
//     document.getElementById("thumbnail").value = "";
// })

const createTable = async(data)=>{
    const response = await fetch("./templates/table.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const html = template({products:data});
    return html;
}

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products",async([status, message, data])=>{
    console.log(data)
    //generar el html basado en la plantilla de hbs con todos los productos
    const htmlProducts = await createTable(data);
    productsContainer.innerHTML = htmlProducts;
})

socketClient.on("connection",async([status, message, data])=>{
    console.log(data)
    //generar el html basado en la plantilla de hbs con todos los productos
    const htmlProducts = await createTable(data);
    productsContainer.innerHTML = htmlProducts;
})

//logica del chat
//enviar el mensaje desde el cliente
const campo = document.getElementById("messageField");
const boton = document.getElementById("sendBoton");
boton.addEventListener("click",(evt)=>{

    const date = new Date();
        socketClient.emit("message",{
            username:user,
            timestamp: date.toLocaleString(),
            message:campo.value
        })
        campo.value ="";
    }
)

//mostrar los mensajes cuando el usuario carga la página
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico",async ([status, message, data])=>{
    let elementos="";
    await data.forEach(item=>{
        elementos = elementos + `<p class="text-start"><strong>${item.username}</strong>: ${item.message}</p>`;
    });
    messageContainer.innerHTML = elementos;
})

