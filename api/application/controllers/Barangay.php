<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJwt.php';
require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class Barangay extends RestController
{

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('BarangayModel');
		$this->load->model('ProductModel');
		$this->load->model('TripTicketModel');

	}

	public function index_get()
	{
		$barangayModel = new BarangayModel;
		$result = $barangayModel->getAll();
		$this->response($result, RestController::HTTP_OK);
	}

	public function get_get($id)
	{

		$barangayModel = new BarangayModel;
		$result = $barangayModel->find($id);
		$this->response($result, RestController::HTTP_OK);

	}

	public function total_submitted_get()
	{

		$barangayModel = new BarangayModel;
		$result = $barangayModel->get_total_submitted();
		$this->response($result, RestController::HTTP_OK);
	}  
	public function delete_delete($id)
	{
		$barangayModel = new BarangayModel;
		$result = $barangayModel->delete($id);
		if ($result > 0) {
			$this->response([
				'status' => true,
				'message' => 'Successfully Deleted.'
			], RestController::HTTP_OK);
		} else {

			$this->response([
				'status' => false,
				'message' => 'Failed to delete.'
			], RestController::HTTP_BAD_REQUEST);

		}
	}

}
