<?php

defined('BASEPATH') or exit('No direct script access allowed');

class AsensoListModel extends CI_Model
{

	public $table = 'list';

	public function getAll()
	{
		$query = $this->db
			->order_by('barangay asc, name asc')
			->get($this->table);
		return $query->result();
	} 
	public function find($id)
	{
		$this->db->where('id', $id);
		$query = $this->db->get($this->table);
		return $query->row();
	}
	public function total()
	{

		$query_string =  $this->db->query("SELECT count(*) total FROM `list`");
		return $query_string->row();
	} 

	public function get_total_list_by_barangay($data)
	{
		$this->db->where($data);
        $query = $this->db->get($this->table);
        return $query->num_rows();
	}

}
