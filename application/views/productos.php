<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <link rel="stylesheet" href="<?php echo base_url() ?>plantilla/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo base_url() ?>plantilla/vendor/font-awesome/css/font-awesome.min.css">
</head>
<body>
    
    <div class="container" style="margin-top: 75px;">
        <div class="row">
            <div class="col-lg-5">
                <form name="formProductos" method="POST" class="form-horizontal" role="form">
                    <legend>Productos</legend>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Producto</label>
                            <input type="text" name="nombre" id="nombre" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Refrencia</label>
                            <input type="text" name="referencia" id="referencia" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Precio($)</label>
                            <input type="number" name="precio" id="precio" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Peso(Kg)</label>
                            <input type="number" name="peso" id="peso" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Categoria</label>
                            <input type="text" name="categoria" id="categoria" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-md-10">
                            <label>Stock</label>
                            <input type="number" name="stock" id="stock" class="form-control" required="required">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                            <button name="guardarProducto" type="submit" class="btn btn-primary">Guardar</button>
                            <input type="hidden" name="id" id="id">
                            <input type="hidden" name="case" id="case" value="crear">
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-lg-7">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Referencia</th>
                                <th>Precio($)</th>
                                <th>Peso(Kg)</th>
                                <th>Categoria</th>
                                <th>Stock</th>
                                <th>Registro</th>
                                <th>Deatlle</th>
                            </tr>
                        </thead>
                        <tbody id="productos"></tbody>
                    </table>
                </div>
            </div>
        </div>
        
        
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Producto</h4>
        </div>
        <div class="modal-body">
            <div class="row"> 
                <input type="hidden" name="id_p" id="id_p" value="">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="factura_producto"></td>
                            <td id="factura_precio"></td>
                            <td id=""><input type="number" id="cantidad"></td>
                            <td id="factura_total"></td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" id="enviarCompra" class="btn btn-primary">Comprar</button>
        </div>
        </div>
    </div>
    </div>

    <script src="<?php echo base_url() ?>plantilla/vendor/jquery/jquery.min.js"></script>
    <script src="<?php echo base_url() ?>plantilla/vendor/bootstrap/js/bootstrap.min.js"></script>
    <script src="<?php echo base_url() ?>plantilla/scripts/app_productos.js"></script>
    <script>
        $(document).ready(function(params) {
            initProductos.initP('<?php echo base_url() ?>')
        })
    </script>
</body>
</html>