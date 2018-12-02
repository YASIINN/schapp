<?php
class database
{
    public $iscon;
    protected $datab;
    public function __construct($username = "root", $password = "", $host = "localhost", $dbname = "bitirmeproje")
    {
        $this->iscon = true;
        try {
            $this->datab = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
            $this->datab->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->datab->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Hata : " . $e->getMessage();
        }
    }
    public function disconnect()
    {
        $this->datab = null;
        $this->iscon = false;
    }
    public function getrow($query, $params = array())
    {
        try {
            $stmt = $this->datab->prepare($query);
            $stmt->execute($params);
            return $stmt->fetch();
        } catch (PDOException $e) {
            echo "Hata :" . $e->getMessage();
        }
    }
    public function select($table, $where = "1", array $params)
    {
        try {
            $sql = "SELECT * FROM `$table` WHERE $where ";
            $stmt = $this->datab->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Hata :" . $e->getMessage();
        }
    }
    public function selecttojoin($table, $tablerelation, array $params,$where="1")
    {
        try {
            $query=$this->jtable($table,$tablerelation);
            $sql="SELECT * FROM".$query."WHERE"." ".$where;
            // $sql = "SELECT * FROM `$table` WHERE $where ";
            $stmt = $this->datab->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Hata :" . $e->getMessage();
        }
    }
    public function jtable($table, $tablerelation)
    {
        $res = "";
        for ($i = 0; $i < count($table); $i++) {
            $t = "t" . $i;
            if ($i == 0) {
                $res .= " " . $table[$i] . " " . $t . "  " . "INNER JOIN";
            } else if ($i == count($table) - 1) {
                $prev = explode("t", $t);
                $prev = $prev[1] - 1;
                $res .= " " . $table[$i] . " " . $t . " ON" . " " . $t . '.' . $tablerelation[$i] . '=' . "t" . $prev . '.' . $tablerelation[$i-1] . "  ";
            } else {
                $prev = explode("t", $t);
                $prev = $prev[1] - 1;
                $res .= " " . $table[$i] . " " . $t . " ON" . " " . $t . '.' . $tablerelation[$i] . '=' . "t" . $prev . '.' . $tablerelation[$i-1] . "  " . "INNER JOIN";
            }

        }
        return $res;
    }
    public function getrows($query, $params = array())
    {
        try {
            $stmt = $this->datab->prepare($query);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            echo "Hata :" . $e->getMessage();
        }
    }
    public function insert($table, array $data)
    {
        try {
            $columns_delimited = implode(', ', array_map(function ($x) {
                return "`$x`";
            }, array_keys($data)));
            $placeholders = implode(', ', array_fill(1, count($data), '?'));
            $sql = "INSERT INTO `$table` ($columns_delimited) VALUES ($placeholders)";
            $stmt = $this->datab->prepare($sql);
            return $stmt->execute(array_values($data));
        } catch (PDOException $e) {
            echo "Kayıt Eklenemedi Hata  :" . $e->getMessage();
        }
    }
    public function update($table, $data, $where, array $params)
    {
        foreach ($data as $key => $val) {
            $cols[] = "$key = '$val'";
        }
        $sql = "UPDATE `$table` SET " . implode(', ', $cols) . " WHERE $where";
        $stmt = $this->datab->prepare($sql);
        $result = (count($params) == array() ? "" : $params);
        return $stmt->execute($result);
    }
    public function delete($table, $where, array $params)
    {
        try {
            $sql = "DELETE FROM `$table` WHERE $where ";
            $stmt = $this->datab->prepare($sql);
            $result = (count($params) == array() ? "" : $params);
            return $stmt->execute($result);
        } catch (PDOException $e) {
            echo "Kayıt Silinemedi Hata :" . $e->getMessage();
        }
    }
} ?>