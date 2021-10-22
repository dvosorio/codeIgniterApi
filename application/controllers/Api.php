<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Api extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('productos_model');
    }

    public function users_get()
    {
        // Users from a data store e.g. database
        $users = [
            ['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
            ['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
        ];

        $id = $this->get( 'id' );

        if ( $id === null )
        {
            // Check if the users data store contains users
            if ( $users )
            {
                // Set the response and exit
                $this->response( $users, 200 );
            }
            else
            {
                // Set the response and exit
                $this->response( [
                    'status' => false,
                    'message' => 'No users were found'
                ], 404 );
            }
        }
        else
        {
            if ( array_key_exists( $id, $users ) )
            {
                $this->response( $users[$id], 200 );
            }
            else
            {
                $this->response( [
                    'status' => false,
                    'message' => 'No such user found'
                ], 404 );
            }
        }
    }

    public function crear_post()
    {
        $nombre     = $this->post("nombre");
        $referencia = $this->post("referencia");
        $precio     = $this->post("precio");
        $peso       = $this->post("peso");
        $categoria  = $this->post("categoria");
        $stock      = $this->post("stock");
        $continuar  = true;

        // var_dump($referencia == null);
        if ($nombre == null || $referencia == null || $precio == null || $peso == null || $categoria == null || $stock == null) {
            $result = array('status' => false, 'message' => 'Todos los campos son obligatorios');
            $continuar = false;
        }

        if ($continuar && (!is_numeric($precio) || !is_numeric($peso) || !is_numeric($stock))) {
            $result = array('status' => false, 'message' => 'Los campos precio, peso y stock deben ser numericos');
            $continuar = false;
        } 

        if ($continuar) {
            $result = $this->productos_model->queryInsertProductos(array(
                "nombre" => $nombre,
                "referencia" => $referencia,
                "precio" => $precio, 
                "peso" => $peso, 
                "categoria" => $categoria,
                "stock" => $stock
            ));
        }
        

        $this->response($result, 200);
    }

    public function editar_put()
    {
        $id = $this->get('id');
        $array_key = $this->input->get();
        $array_data = array("id" => $id);
        $continuar = true;

        if (empty($array_key)) {
            $result = array('status' => false, 'message' => 'No se encontraron valores para actualizar el producto');
            $continuar = false;
        }

        if ($continuar) {
            $result = array();
            foreach ($array_key as $key => $value) {
                if ($value == '') {
                    $result = array('status' => false, 'message' => 'El campo ' . $key . ' no puede ir vacío');
                    $continuar = false;
                    break;
                } else {
                    if (empty($array_data[$key])) {
                        $array_data[$key] = $value;
                    }
                }
    
                if ($key === 'precio' || $key === 'peso' || $key === 'stock') {
                    if (!is_numeric($value)) {
                        $result = array('status' => false, 'message' => 'El campo ' . $key . ' debe ser numerico');
                        $continuar = false;
                        break;
                    }
                } else {
                    if (empty($array_data[$key])) {
                        $array_data[$key] = $value;
                    }
                }
            }
        }
        
        if ($continuar) {
            $result = $this->productos_model->queryUpdateProductos($array_data);
        }

        $this->response($result, 200);

    }

    public function list_get()
    {
        $result = $this->productos_model->querySelectInformacionProducto();
        $this->response($result, 200);
    }

    public function info_get()
    {
        $id = $this->get('id');

        if ($id === null) {
            $result = array('status' => false, 'message' => 'El id no puede ir vacío');
        } else {
            $result = $this->productos_model->querySelectInfoIdProducto(array("id" => $id));
        }

        $this->response($result, 200);
    }

    public function eliminar_delete()
    {
        $id = $this->get('id');

        if ($id === null) {
            $result = array('status' => false, 'message' => 'El id no puede ir vacío');
        } else {
            $result = $this->productos_model->queryDeleteProducto(array("id" => $id));
        }

        $this->response($result, 200);
    }

    public function comprar_post()
    {
        $id         = $this->post("id");
        $cantidad   = $this->post("cantidad");
        $total      = $this->post("total");

        if ($cantidad <= 0) {
            $result = array('status' => false, 'message' => 'La cantidad debe ser mayor a 0');
        } else {
            $result = $this->productos_model->queryInsertFactura(array(
                "id"    => $id,
                "cantidad" => $cantidad,
                "total" => $total
            ));
        }

        $this->response($result, 200);
    }
}
?>