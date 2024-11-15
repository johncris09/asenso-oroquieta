<?php

defined('BASEPATH') or exit('No direct script access allowed');

class ComelecModel extends CI_Model
{

	public $table = 'comelec_2023';

	public function __construct()
	{
		parent::__construct();
	}

	public function get()
	{
		$query = $this->db
			->order_by('name asc')
			->get($this->table);
		return $query->result();

	}




}
