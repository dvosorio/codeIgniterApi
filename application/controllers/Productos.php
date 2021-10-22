<?php 
class Productos extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('Productos_model');
    }

    public function index()
    {
        $this->load->view("productos");
    }

    function compraProducto(){
        $id         = $_POST["id"];
        $cantidad   = $_POST["cantidad"];
        $total      = $_POST["total"];

        if ($this->Productos_model->insertFactura($id, $cantidad, $total)) {
            $this->Productos_model->actualizarStock($id, $cantidad);
            $acciones = array("result" => true, "mensaje" => 'La compra se ha hecho con éxito', "respuesta" => '');
        } else {
            $acciones = array("result" => false, "mensaje" => 'Error a finalizar la compra', "respuesta" => '');
        }
        echo json_encode($acciones);
    }
}


?>