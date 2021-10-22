function registrarSalida() {
    $("#page-wrapper").load(url+"Salida/crear");
}

function consultarSalida() {
    $("#page-wrapper").load(url+"Salida/consultar");
}

function registrarS() {
    $.ajax({
        type:'post',
        url:url+"Salida/registrar",
        data:$("#registrarSalida").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Success!',
                    text: 'El registro se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Salida/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'Hubo un proble al registrar detalles.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Salida/crear");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'El registro no se ha relizado con éxito.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Salida/crear");
            }else if (respuesta == 4) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'Por favor complete los campos con el asterisco "*". '
                });
                $("#page-wrapper").load(url+"Salida/crear");
            }
        }
    })
}

function editarS(e) {
    $("#page-wrapper").load(url+"Salida/editar/"+e);
}

function modificarS() {
    $.ajax({
        type:'post',
        url:url+"Salida/modificar",
        data:$("#modificarSalida").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Success!',
                    text: 'La actualización se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Salida/consultar");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'Hubo un proble a actualizar detalles.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Salida/consultar");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'La actualización no se ha relizado con éxito.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Salida/consultar");
            }else if (respuesta == 4) {
                new PNotify({
                    title: 'Oh no!',
                    text: 'Por favor complete los campos con el asterisco "*". '
                });
            }
        }
    })
}