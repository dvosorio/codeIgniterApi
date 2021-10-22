function registrarPedido() {
    $("#page-wrapper").load(url+"Pedidos/crear");
}

function consultarPedido() {
    $("#page-wrapper").load(url+"Pedidos/consultar");
}

function materiasss() {
    var cantidad = $('#mtp').val();
    var copy = $("select#materia_n").html();
        for (let i = 1; i <= cantidad; i++) {
            $("#pegar").append(`<div class="form-group col-xs-12" id="add`+i+`">
            <label for="" class="control-label">Materia Prima #`+i+`</label>
            <select name="" id="materia_n`+i+`" class="form-control" onchange="traer_valor()">
            `+copy+`
            </select>
            </div>
            <input id="valor_m`+i+`" type="text">`);


        }
}

function procesoss() {
    var cantidad = $('#mtp').val();
    for (let i = 1; i <= cantidad; i++) {                    
        let sub_1 = $("#materia_n"+i+"").val(); 
        let id_1 = sub_1.substring(0,1);
        let sub_2 = $("#materia_n"+(i+1)+"").val(); 
        let id_2 = sub_2.substring(0,1);
            $.ajax({
            dataType:'json',
            type:'get',
            url: url+"/Pedidos/procesos/"+id_1+"/"+id_2,
            success:function(respuesta) {
                $.each(respuesta.proceso, function(i,p){
                    $("#lista_proceso").append(`<tr>
                    <td value="`+p.idtipoproceso+`">`+p.nombreproceso+`</td>
                    <td value="`+p.idtipoproceso+`">`+p.valorproceso+`</td>
                    </tr>`);
                })
            }
            })
    }

}

function terminar(){
    $("#div_1").hide();
    $("#div_2").hide();
    $("#div_3").hide();
    $("#pedidos_completo").removeAttr("hidden");
    let cliente = $("#cliente").val();
    let cliente_text = $("#cliente option:selected").text();
    let cantidad = $('#mtp').val();
    let insumo = $("#cantidad").val();
    let materia = "";
        $("#paso_final").append(`<div class="form-group col-xs-6">
        <label for="1">Cliente</label>
        <input class="form-control" type="hidden" name="clienteP" readonly="readonly" value="`+cliente+`">
        <input class="form-control" id="1" type="text" name="" readonly="readonly" value="`+cliente_text+`">
        </div>`);
        $("#paso_final").append(`<div class="form-group col-xs-6">
        <label for="2">Cantidad Insumos</label>
        <input class="form-control" id="2" type="number" name="insumoP" readonly="readonly" value="`+insumo+`">
        </div>`);
        $("#paso_final").append(`<div class="form-group col-xs-12">
        <label for="5" class="control-label">Descripción Pedido <span class="req">*</span></label>
        <input class="form-control" id="5" type="text" name="productoP" required>
        <div class="help-block with-errors"></div>
        </div>`);
    for (let i = 1; i <= cantidad; i++) {
        materia = $("#materia_n"+i+"").val();
        materia_txt = $("#materia_n"+i+" option:selected").text(); 
        $("#paso_final").append(`<div class="form-group col-xs-12">
        <label for="m`+i+`">Materia Prima #`+i+`</label>
        <input class="form-control" type="hidden" name="idM[]" readonly="readonly" value="`+materia+`">
        <input class="form-control" type="text" name="" readonly="readonly" value="`+materia_txt+`">
        </div>`); 
        
    }

    for (let j = 1; j <= cantidad; j++) {                    
        let sub_1 = $("#materia_n"+j+"").val(); 
        let id_1 = sub_1.substring(0,1);
        let sub_2 = $("#materia_n"+(j+1)+"").val(); 
        let id_2 = sub_2.substring(0,1);
            $.ajax({
            dataType:'json',
            type:'get',
            url: url+"/Pedidos/procesos/"+id_1+"/"+id_2,
            success:function(respuesta) {
                $.each(respuesta.proceso, function(i,p){
                    $("#paso_final").append(`<div class="form-group col-xs-12">
                    <label for="">Proceso #`+j+`</label>
                    <input class="form-control" type="hidden" name="idPr[]" readonly="readonly" value="`+p.idtipoproceso+`">
                    <input class="form-control" type="text" name="" readonly="readonly" value="`+p.nombreproceso+`">
                    <input class="form-control" type="hidden" name="valorPr[]" readonly="readonly" value="`+p.valorproceso+`">
                    </div>`);
                })
            }
            })
    }

}

function traer_valor() {
    let cantidad = $('#mtp').val();
    let sub = "";
    let id = "";
    for (let i = 1; i <= cantidad; i++) {
        sub = $("#materia_n"+i+"").val();
        id = sub.substring(0,1);
        $.ajax({
            type:'get',
            dataType:'json',
            url:url+"Pedidos/traer_valor/"+id,
            success:function(respuesta){
                $("#valor_m"+i+"").val(respuesta.precio.valor);
            }
        })
    } 
}

function registrarP() {
    $.ajax({
        type:'post',
        url:url+"Pedidos/registrar",
        data:$("#registrarPedido").serializeArray(),
        success:function(respuesta){
            if (respuesta == 1) {
                new PNotify({
                    title:'Success!',
                    text:'El registro se ha realizado con éxito.',
                    type:'success'
                });
            }else if (respuesta == 2) {
                new PNotify({
                    title:'Oh no!',
                    text:'No se pudo registrar los procesos.',
                    type:'error'
                });
            }else if (respuesta == 3) {
                new PNotify({
                    title:'Oh no!',
                    text:'No se pudo registrar las materias prima.',
                    type:'error'
                });
            }else if (respuesta == 4) {
                new PNotify({
                    title:'Oh no!',
                    text:'No se pudo actualizar el total',
                    type:'error'
                });
            }else if (respuesta == 5) {
                new PNotify({
                    title:'Oh no!',
                    text:'Sólo se registro la tabla pedidos.',
                    type:'error'
                });
            }else if (respuesta == 6) {
                new PNotify({
                    title:'Oh no!',
                    text:'El registro no se ha realizado con éxito.',
                    type:'error'
                });
            }
        }
    })
}

function traerMateria(e) {
    $.ajax({
        type:'get',
        dataType:'json',
        url:url+"Pedidos/traerInsumo/"+e,
        success:function(respuesta){
            $("#insumo").empty();
            $.each(respuesta.insumos, function(i,p){
                $("#insumo").append(`<tr>
                <td value="`+p.codigo_materia+`">`+p.nombre+`</td>
                <td value="`+p.codigo_materia+`">`+p.valormateria+`</td>
                <td value="`+p.codigo_materia+`">`+p.totalmateria+`</td>
                </tr>`);
            })
            $("#insumos").modal();
        }
    })
}

function traerProceso(e) {
    $.ajax({
        type:'get',
        dataType:'json',
        url:url+"Pedidos/traerProceso/"+e,
        success:function(respuesta){
            $("#proceso").empty();
            $.each(respuesta.tipo, function(i,p){
                $("#proceso").append(`<tr>
                <td value="`+p.codigo_proceso+`">`+p.nombreproceso+`</td>
                <td value="`+p.codigo_proceso+`">`+p.valorproceso+`</td>
                <td value="`+p.codigo_proceso+`">`+p.totalproceso+`</td>
                </tr>`);
            })
            $("#procesos").modal();
        }
    })
}

function editarP(e){
    $.ajax({
        type:'get',
        dataType:'json',
        url:url+"Pedidos/traerPedido/"+e,
        success:function(respuesta){
            $("#idPe").val(respuesta.pedido.codigo);
            $("#idC").val(respuesta.pedido.codigo_cliente);
            $("#clienteC").val(respuesta.pedido.cliente);
            $("#cantidadC").val(respuesta.pedido.cantidad);
            $("#pedidoC").val(respuesta.pedido.producto);
            $("#editarPe").modal();
        }
    })
}