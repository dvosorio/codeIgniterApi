function registrar() {
    $.ajax({
        type:'post',
        url: url+"Proveedor/registrar",
        data: $("#registrarProveedor").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'El registro se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Proveedor/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar el registro.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Proveedor/crear");
            }
        }
    })
}

function modificar() {
    $.ajax({
        type:'post',
        dataType:'json',
        url: url+"Proveedor/modificar",
        data: $("#modificarProveedor").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'La actualización se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Proveedor/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar la actualización.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Proveedor/crear");
            }
        }
    })
}

function consultarProveedor() {
    $("#page-wrapper").load(url+"Proveedor/consultar"); 
}

function registrarProveedor() {
    $("#page-wrapper").load(url+"Proveedor/crear"); 
}

function editar(e) {
    $("#page-wrapper").load(url+"Proveedor/editar/"+e);
}


