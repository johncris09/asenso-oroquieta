<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . '/libraries/CreatorJwt.php';
require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class AsensoList extends RestController
{

	function __construct()
	{
		// Construct the parent class
		parent::__construct();
		$this->load->model('AsensoListModel');
		$this->load->model('BarangayModel');
		$this->load->model('ProductModel');
		$this->load->model('TripTicketModel');

	}

	public function index_get()
	{
		$asensoListModel = new AsensoListModel;
		$result = $asensoListModel->getAll();
		$this->response($result, RestController::HTTP_OK);
	}

	public function get_get($id)
	{

		$asensoListModel = new AsensoListModel;
		$result = $asensoListModel->find($id);
		$this->response($result, RestController::HTTP_OK);

	}
	public function total_get()
	{

		$asensoListModel = new AsensoListModel;
		$result = $asensoListModel->total();
		$this->response($result, RestController::HTTP_OK);

	}  

	public function get_list_by_barangay_get()
	{



		$barangayModel = new BarangayModel;
		$asensoListModel = new AsensoListModel;


		$barangays = $barangayModel->getAll();

		$categories = $series= [];
		foreach($barangays as $barangay){
			$categories[] = $barangay->barangay; 
		
		}
		
		foreach($barangays as $barangay){
			$series[] =  $asensoListModel->get_total_list_by_barangay(['barangay' => $barangay->barangay]);
 
			
			// $this->response($list, RestController::HTTP_OK);
		
		}

		$data = array(
			'categories' => $categories, 
			'series' => $series, 
		);


		$this->response($data, RestController::HTTP_OK);
		

		$resellerModel = new ResellerModel;


		$request = $this->input->get();

		$filterData = [];
		if (isset($request['start_date']) && !empty($request['start_date'])) {
			$filterData['start_date'] = date('Y-m-d', strtotime($request['start_date']));
		}
		if (isset($request['end_date']) && !empty($request['end_date'])) {
			$filterData['end_date'] = date('Y-m-d', strtotime($request['end_date']));
		}

		if (isset($request['status']) && !empty($request['status'])) {
			$filterData['status'] = $request['status'];
		}


		// Fetch data
		$data = $resellerModel->getSalesByAddress($filterData);


		// // Initialize arrays for categories and series
		$categories = [];
		$series = [];

		// Extract all unique voucher types
		$voucherTypes = array_keys(array_filter($data[0], function ($key) {
			return strpos($key, 'voucher_') === 0;
		}, ARRAY_FILTER_USE_KEY));

		// Populate categories with addresses
		foreach ($data as $item) {
			$categories[] = $item['address'];
		}




		// Populate series data
		$i = 0;
		foreach ($voucherTypes as $voucherType) {
			// Convert voucher key to desired label format
			$label = ucfirst(str_replace('_', ' ', $voucherType));

			$seriesData = [
				'name' => $label,
				'data' => [],

			];
			foreach ($data as $item) {
				$seriesData['data'][] = (int) $item[$voucherType];
			}

			$series[] = $seriesData;
			$i++;
		}

		$output = array(
			'categories' => $categories,
			'series' => $series,
			'total_each_voucher' => $this->total_each_voucher($data),
		);

		$this->response($output, RestController::HTTP_OK);
	}



}
