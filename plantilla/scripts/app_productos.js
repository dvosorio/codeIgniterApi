var initProductos = {
    initP: function(base_url){
        this.listarProductos(base_url)
        this.productosCrear(base_url);
    },
    listarProductos: function(base_url){
        var self = this
        $.ajax({
            type: "GET",
            url: `${base_url}api/list/`,
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    var htmlString = '';
                    $.each(response.data, function (index, val) {
                        htmlString += '<tr>'
                        htmlString += '<td>'+val.nombre_producto+'</td>'
                        htmlString += '<td>'+val.referencia+'</td>'
                        htmlString += '<td>'+val.precio+'</td>'
                        htmlString += '<td>'+val.peso+'</td>'
                        htmlString += '<td>'+val.categoria+'</td>'
                        htmlString += '<td>'+val.stock+'</td>'
                        htmlString += '<td>'+val.fecha_registro+'</td>'
                        htmlString += '<td><div class="btn-group"><button type="button" data-control="'+val.id+'" class="editarInfo btn btn-primary">Editar</button><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="eliminarInfo" data-control="'+val.id+'" style="cursor:pointer"><i class="fa fa-trash"></i> Eliminar</a></li><li><a class="comprar" data-control="'+val.id+'" style="cursor:pointer" data-toggle="modal" data-target="#myModal"><i class="fa fa-credit-card"></i> Comprar</a></li></ul></div></td>'
                        htmlString += '</tr>'
                    });
                } else {
                    var htmlString = '<tr><td class="text-center" colspan="7">Sin resultados</td></tr>';
                }

                $("#productos").html(htmlString);
                self.traerProducto(base_url);
                self.eliminarProducto(base_url);
                self.comprarProducto(base_url);
            },
            error: function(){
                console.error("Hubo un problema");
            }
        });
    },
    productosCrear: function(base_url) {
        var self = this
        $("form[name=formProductos]").submit(function (e) { 
            e.preventDefault();
            
            $("button[name=guardarProducto]").text('Enviando...').attr('disabled', 'disabled')

            var case_ = $("#case").val();
            var form = {
                method: ((case_=='crear')?'POST':'PUT'),
                data: ((case_=='crear')?$("form[name=formProductos]").serialize():{}),
                url: ((case_=='crear')?`${base_url}api/${case_}`:base_url+'api/'+case_+'/id/'+$("input[name=id]").val()+'/?'+$("form[name=formProductos]").serialize()),
            }
            $.ajax({
                type: form.method,
                dataType: "json",
                url: form.url,
                data: form.data,
                success: function (response) {
                    alert(response.message)
                    $("button[name=guardarProducto]").text('Guardar').removeAttr('disabled')
                    if (response.status) {
                        self.listarProductos(base_url)
                        $("form[name=formProductos]")[0].reset()
                    }

                    if (case_=='editar') {
                        $("#case").val('crear');
                    }
                },
                error: function(){
                    console.error("Hubo un problema");
                }
            });
        });
    },
    traerProducto: function(base_url){
        $(".editarInfo").click(function (e) { 
            e.preventDefault();
            
            var id = $(this).attr("data-control");
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `${base_url}api/info/id/${id}`,
                success: function (response) {
                    if (response.status) {
                        // $("form[name=formProductoC]").removeAttr("name").attr("name", "formProductoE")

                        $("#case").val('editar');
                        $("#id").val(response.data.id);
                        $("#nombre").val(response.data.nombre_producto);
                        $("#referencia").val(response.data.referencia);
                        $("#precio").val(response.data.precio);
                        $("#peso").val(response.data.peso);
                        $("#categoria").val(response.data.categoria);
                        $("#stock").val(response.data.stock);
                    } else {
                        alert('No se puedo traer la información')
                    }
                },
                error: function(){
                    console.error("Hubo un problema");
                }
            });
        });
    },
    eliminarProducto: function(base_url) {
        var self = this
        $(".eliminarInfo").click(function (e) { 
            e.preventDefault();
            
            var id = $(this).attr("data-control");
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: `${base_url}api/eliminar/id/${id}`,
                success: function (response) {
                    alert(response.message)
                    if (response.status) {
                        self.listarProductos(base_url)
                    }
                },
                error: function(){
                    console.error("Hubo un problema");
                }
            });
        });
    },
    comprarProducto: function(base_url){
        var self = this
        $(".comprar").click(function (e) { 
            e.preventDefault();
            e.preventDefault();
            
            var id = $(this).attr("data-control");
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `${base_url}api/info/id/${id}`,
                success: function (response) {
                    if (response.status) {
                        $("#id_p").val(response.data.id);
                        $("#factura_producto").text(response.data.nombre_producto);
                        $("#cantidad").val(1)
                        $("#factura_precio").text(response.data.precio);
                        $("#factura_total").text((response.data.precio*1));
                    }
                },
                error: function(){
                    console.error("Hubo un problema");
                }
            });
        });

        $("#cantidad").change(function (e) { 
            e.preventDefault();
            var cantidad = $(this).val()
            var precio = $("#factura_precio").text()
            $("#factura_total").text((precio*cantidad));
        });

        $("#enviarCompra").click(function (e) { 
            e.preventDefault();
            
            var id = $("#id_p").val();
            var cantidad = $("#cantidad").val()
            var total = $("#factura_total").text();

            $.ajax({
                type: "POST",
                dataType: "json",
                url: `${base_url}api/comprar/`,
                data: {"id":id, "cantidad":cantidad, "total":total},
                success: function (response) {
                    alert(response.mensaje)
                    if (response.result==true) {
                        self.listarProductos(base_url)
                        $("#myModal").modal('hide')
                    }
                },
                error: function(){
                    console.error("Hubo un problema");
                }
            });
        });
    }
}