<?php

defined('BASEPATH') or exit('No direct script access allowed');

class BarangayModel extends CI_Model
{

	public $table = 'barangay';

	public function getAll()
	{
		$query = $this->db
			->order_by('barangay', 'asc')
			->get($this->table);
		return $query->result();
	}
	public function findByBarangayName($barangay)
	{
		$query = $this->db
			->where('barangay', $barangay)
			->get($this->table);
		return $query->row();
	}

	public function insert($data)
	{

		return $this->db->insert($this->table, $data);
	}

	public function find($id)
	{
		$this->db->where('id', $id);
		$query = $this->db->get($this->table);
		return $query->row();
	}
	public function get_total_submitted()
	{

		$query_string =  $this->db->query("SELECT count( DISTINCT barangay) total FROM `list`");
		return $query_string->row();
	}

	public function update($id, $data)
	{
		$this->db->where('id', $id);
		return $this->db->update($this->table, $data);
	}

	public function delete($id)
	{
		return $this->db->delete($this->table, ['id' => $id]);
	} 

}
