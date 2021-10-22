function registrarCliente() {
    $("#page-wrapper").load(url+"Cliente/crear");
    
}

function consultarCliente() {
    $("#page-wrapper").load(url+"Cliente/consultar");
}

function editarC(e) {
    $("#page-wrapper").load(url+"Cliente/editar/"+e);
}

function registrarC() {
    $.ajax({
        type:'post',
        url:url+"Cliente/registrar",
        data:$("#resgistrarCliente").serialize(),
        succcess:function(respuesta) {
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'El registro se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Cliente/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar el registro.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Cliente/crear");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Cliente/crear");
            }
        }
    })
}

function modificarC() {
    $.ajax({
        type:'post',
        url:url+"Cliente/modificar",
        data:$("#modificarCliente").serialize(),
        succcess:function(respuesta) {
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'La actualización se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Cliente/consultar");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar la actualización.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Cliente/consultar");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Cliente/consultar");
            }
        }
    })
}