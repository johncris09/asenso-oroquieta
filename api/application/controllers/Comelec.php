<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJwt.php';
require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class Comelec extends RestController
{

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('ComelecModel'); 

	}

	public function index_get()
	{
		$comelecModel = new ComelecModel;
		$result = $comelecModel->get();
		$this->response($result, RestController::HTTP_OK);
	}



}
