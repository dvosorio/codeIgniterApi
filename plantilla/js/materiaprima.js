function registrarMateriaPrima() {
    $("#page-wrapper").load(url+"Materiaprima/crear");
}

function consultarMateriaPrima() {
    $("#page-wrapper").load(url+"Materiaprima/consultar");
}

function registrarM() {
    $.ajax({
        type:'post',
        url:url+"Materiaprima/registrar",
        data:$("#registrarMateria").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'El registro se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Materiaprima/crear");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar el registro.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Materiaprima/crear");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Materiaprima/crear");
            }
        }
    })
}

function modificarM() {
    $.ajax({
        type:'post',
        url:url+"Materiaprima/modificar",
        data:$("#modificarMateria").serialize(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title: 'Felicidades!',
                    text: 'La actualización se ha realizado con éxito.',
                    type: 'success'
                });
                $("#page-wrapper").load(url+"Materiaprima/consultar");
            }else if (respuesta == 2) {
                new PNotify({
                    title: 'Oh No!',
                    text: 'Hubo un error al realizar la actualización.',
                    type: 'error'
                });
                $("#page-wrapper").load(url+"Materiaprima/consultar");
            }else if (respuesta == 3) {
                new PNotify({
                    title: 'Regular Notice',
                    text: 'Por favor complete los campos con el "*"'
                });
                $("#page-wrapper").load(url+"Materiaprima/consultar");
            }
        }
    })
}

function editarM(e) {
    $("#page-wrapper").load(url+"Materiaprima/editar/"+e);
}