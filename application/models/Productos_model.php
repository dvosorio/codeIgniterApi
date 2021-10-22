<?php 
class Productos_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function querySelectInformacionProducto(){
        try {
            $sentencia = $this->db->conn_id->prepare('SELECT id, nombre_producto, referencia, precio, peso, categoria, stock, fecha_registro, fecha_ultima_venta FROM productos');
            if ($sentencia->execute()) {
                $data = array();
                $sentencia->bind_result($id, $nombre_producto, $referencia, $precio, $peso, $categoria, $stock, $fecha_registro, $fecha_ultima_venta);
                $sentencia->store_result();

                if ($sentencia->num_rows>0) {
                    while ($filas = $sentencia->fetch()) {
                        array_push($data, array(
                            "id"                => $id,
                            "nombre_producto"   => $nombre_producto,
                            "referencia"        => $referencia,
                            "precio"            => $precio,
                            "peso"              => $peso,
                            "categoria"         => $categoria,
                            "stock"             => $stock,
                            "fecha_registro"    => $fecha_registro,
                            "fecha_ultima_venta"=> $fecha_ultima_venta
                        ));
                    }
                }
                
                $result = array("status" => true, "message" => "Listado de productos", "data" => $data);
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }
            
            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
    }

    public function querySelectInfoIdProducto($datos){
        try {
            $sentencia = $this->db->conn_id->prepare('SELECT id, nombre_producto, referencia, precio, peso, categoria, stock, fecha_registro, fecha_ultima_venta FROM productos WHERE id = ?');
            $sentencia->bind_param('i', $datos["id"]);

            if ($sentencia->execute()) {
                $sentencia->bind_result($id, $nombre_producto, $referencia, $precio, $peso, $categoria, $stock, $fecha_registro, $fecha_ultima_venta);
                $sentencia->store_result();

                if ($sentencia->num_rows>0) {
                    $sentencia->fetch();
                    $data = array(
                        "id"                => $id,
                        "nombre_producto"   => $nombre_producto,
                        "referencia"        => $referencia,
                        "precio"            => $precio,
                        "peso"              => $peso,
                        "categoria"         => $categoria,
                        "stock"             => $stock,
                        "fecha_registro"    => $fecha_registro,
                        "fecha_ultima_venta"=> $fecha_ultima_venta
                    );
                    $result = array("status" => true, "message" => "Información producto", "data" => $data);
                } else {
                    $result = array("status" => false, "message" => "El id ingresado no existe en el sistema");
                }
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }
            
            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
    }

    public function queryDeleteProducto($datos){
        try {
            $sentencia = $this->db->conn_id->prepare('DELETE FROM productos WHERE id = ?');
            $sentencia->bind_param('i', $datos["id"]);

            if ($sentencia->execute()) {
                $result = array("status" => true, "message" => 'La información se ha eliminado');
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }
            
            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
    }

    public function queryInsertProductos($datos){
        
        try {
            $nombre = $datos["nombre"];
            $referencia = $datos["referencia"];
            $precio = $datos["precio"];
            $peso = $datos["peso"];
            $categoria = $datos["categoria"];
            $stock = $datos["stock"];
            $fecha_registro = date("Y-m-d H:i:s");

            $sentencia = $this->db->conn_id->prepare("INSERT INTO productos(nombre_producto, referencia, precio, peso, categoria, stock, fecha_registro) VALUES(?,?,?,?,?,?,?)");
            $sentencia->bind_param('sssisis', $nombre, $referencia, $precio, $peso, $categoria, $stock, $fecha_registro);
            
            if ($sentencia->execute()) {
                $result = array("status" => true, "message" => 'El producto se ha registrado con éxito');
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }

            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }

        // $query = $this->db->conn_id->prepare('SELECT id, nombre_producto, precio FROM productos WHERE stock >= ?');
        // $query->bind_param('i', $param1);
        // $query->execute();
        // $query->bind_result($id, $nombre_producto, $precio);
        // $query->fetch();
        // while ($filas = $query->fetch()) {
        //     var_dump(array($id, $nombre_producto, $precio));
        // }
    }

    public function queryUpdateProductos($datos){

        try {
            $stringUpdate = array();

            foreach ($datos as $key => $value) {
                if ($key == 'nombre') {
                    $stringUpdate[$key] = "nombre_producto = '$value'";
                } elseif ($key == 'referencia') {
                    $stringUpdate[$key] = "referencia = '$value'";
                } elseif ($key == 'precio') {
                    $stringUpdate[$key] = "precio = '$value'";
                } elseif ($key == 'peso') {
                    $stringUpdate[$key] = "peso = '$value'";
                } elseif ($key == 'categoria') {
                    $stringUpdate[$key] = "categoria = '$value'";
                } elseif ($key == 'stock') {
                    $stringUpdate[$key] = "stock = '$value'";
                }
            }

            $stringUpdate = implode(", ", $stringUpdate);

            $sentencia = $this->db->conn_id->prepare("UPDATE productos SET $stringUpdate WHERE id = ?");
            $sentencia->bind_param('i', $datos["id"]);
            
            if ($sentencia->execute()) {
                $result = array("status" => true, "message" => 'El producto se ha actualizado con éxito');
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }

            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
    }

    private function queryUpdateStock($datos){
        try {
            $id         = $datos["id"];
            $cantidad   = $datos["cantidad"];
            $fecha      = date("Y-m-d H:i:s");

            $sentencia = $this->db->conn_id->prepare("UPDATE productos SET stock = stock - $cantidad, fecha_ultima_venta = '$fecha'  WHERE id = ?");
            $sentencia->bind_param('i', $id);

            if ($sentencia->execute()) {
                $result = array("status" => true, "message" => 'Stock actualizado');
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }

            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
        
    }

    public function queryInsertFactura($datos){

        try {
            $id         = $datos["id"];
            $cantidad   = $datos["cantidad"];
            $total      = $datos["total"];
            $fecha      = date("Y-m-d H:i:s");

            $sentencia = $this->db->conn_id->prepare("INSERT INTO facturas(id_producto, cantidad, total, fecha_compra)  VALUES(?,?,?,?)");
            $sentencia->bind_param('iiss', $id, $cantidad, $total, $fecha);
            
            if ($sentencia->execute()) {
                $result = array("status" => true, "message" => 'La compra se ha hecho con éxito');
                $this->queryUpdateStock(array("id" => $id, "cantidad" => $cantidad));
            } else {
                $result = array("status" => false, "message" => "Falló la ejecución: (" . $sentencia->errno . ") " . $sentencia->error);
            }

            return $result;
        } catch (\Throwable $th) {
            $result = array("status" => false, "message" => "Hubo un problema, COD. M0002");
            return $result;
        }
    }
}
?>