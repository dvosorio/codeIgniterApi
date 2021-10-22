function registrarEntrada() {
    $("#page-wrapper").load(url+"Entrada/crear");
}

function consultarEntrada() {
    $("#page-wrapper").load(url+"Entrada/consultar");
}

function calcularEntrada() {
    var metros = document.getElementById("metro").value;
    var precioCompra= document.getElementById("valor").value;
    document.getElementById("total").value = metros*precioCompra;
  }

function registrarE() {
    $.ajax({
        type:'post',
        url:url+"Entrada/registrar",
        data:$("#registrarEntrada").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'El registro se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Entrada/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar el registro.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Entrada/crear");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Entrada/crear");
            }
        }
    })
}

function editarE(e) {
    $("#page-wrapper").load(url+"Entrada/editar/"+e);    
}

function modificarE() {
    $.ajax({
        type:'post',
        url:url+"Entrada/modificar",
        data:$("#modificarEntrada").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'La actualización se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Entrada/consultar");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar la actualización.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Entrada/consultar");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Entrada/consultar");
            }
        }
    })
}