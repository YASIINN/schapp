<?php
class AllGet
{
    public $result;
    public function get($tablename,$where)
    {
        $this->result = "SELECT * FROM $tablename WHERE $where";
        return $this->result;
    }
    public function set($tablename,$setfield,$where){
        $this->result = "UPDATE $tablename SET $setfield WHERE $where";
        return $this->result;
    }
}
?>