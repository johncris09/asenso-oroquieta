<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJwt.php';
require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class Transmittal extends RestController
{

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('TransmittalModel');

	}

	public function index_get()
	{
		$transmittalModel = new TransmittalModel;
		$result = $transmittalModel->get();
		$this->response($result, RestController::HTTP_OK);
	}


	public function get_get($id)
	{
		$transmittalModel = new TransmittalModel;
		$result = $transmittalModel->find($id);
		if ($result) {
			$this->response($result, RestController::HTTP_OK);
		} else {

			$this->response([], RestController::HTTP_OK);
		}
		// $this->response($result, RestController::HTTP_OK);

	}


	public function filter_get()
	{

		$transmittalModel = new TransmittalModel;

		$requestData = $this->input->get();
		$filer_data = [];


		if (isset($requestData['status']) && !empty($requestData['status'])) {
			$filer_data['claim_status'] = $requestData['status'];
		}

		if (isset($requestData['barangay']) && !empty($requestData['barangay'])) {
			$filer_data['barangay'] = $requestData['barangay'];
		}


		$result = $transmittalModel->filter($filer_data);

		$this->response($result, RestController::HTTP_OK);


	}

	public function is_exist_post()
	{
		$transmittalModel = new TransmittalModel;
		$requestData = json_decode($this->input->raw_input_stream, true);

		$filer_data = []; 
		foreach ($requestData as $row) {
			$filter_data = array(
				'name' => trim( str_replace(['"', "'"], '', $row['name']))
			);

			$result = $transmittalModel->validation($filter_data);
			if (!$result) {
				$filer_data[] = array(
					'name' =>  str_replace(['"', "'"], '', $row['name']),
					'claim_status' => 'Not Found'
				);
			}
			else {
				$filer_data[] = array(
					'name' =>  str_replace(['"', "'"], '', $row['name']),
					'claim_status' => 'Found'
				);
			} 
		}
		$this->response($filer_data, RestController::HTTP_OK);
	}


	public function update_put($id)
	{


		$transmittalModel = new TransmittalModel;
		$requestData = json_decode($this->input->raw_input_stream, true);

		if (isset($requestData['name'])) {
			$data['name'] = trim($requestData['name']);
		}
		if (isset($requestData['birthdate'])) {
			$data['birthday'] = $requestData['birthdate'];
		}
		if (isset($requestData['purok'])) {
			$data['purok'] = $requestData['purok'];
		}
		if (isset($requestData['precinct'])) {
			$data['precinct'] = $requestData['precinct'];
		}
		if (isset($requestData['occupation'])) {
			$data['occupation'] = $requestData['occupation'];
		}
		if (isset($requestData['remarks'])) {
			$data['remarks'] = $requestData['remarks'];
		}

		if (isset($requestData['barangay'])) {
			$data['barangay'] = $requestData['barangay'];
		}

		if (isset($requestData['status'])) {
			$data['claim_status'] = $requestData['status'];
		}


		$update_result = $transmittalModel->update($id, $data);

		if ($update_result > 0) {
			$this->response([
				'status' => true,
				'message' => 'Successfully Updated.'
			], RestController::HTTP_OK);
		} else {

			$this->response([
				'status' => false,
				'message' => 'Failed to update.'
			], RestController::HTTP_BAD_REQUEST);

		}
	}



}
