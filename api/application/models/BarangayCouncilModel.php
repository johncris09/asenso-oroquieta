<?php

defined('BASEPATH') or exit('No direct script access allowed');

class BarangayCouncilModel extends CI_Model
{

	public $table = 'barangay_council';

	public function __construct()
	{
		parent::__construct();
	}

	public function get()
	{
		$query = $this->db
			->order_by('barangay asc, lastname asc')
			->get($this->table);
		return $query->result();

	}


	public function find($id)
	{
		$this->db->where('id', $id);
		$query = $this->db->get($this->table);
		return $query->row();
	}


	public function filter($data)
	{
		$query = $this->db
			->where($data)
			->order_by('name asc')
			->get($this->table);
		return $query->result();
	}


	public function update($id, $data)
	{
		$this->db->where('id', $id);
		return $this->db->update($this->table, $data);
	}


	public function validation($data)
	{
		$this->db->select('*');
		$this->db->from($this->table);
		$this->db->like($data);
		$query = $this->db->get();
		
		return $query->result();

	}

}
