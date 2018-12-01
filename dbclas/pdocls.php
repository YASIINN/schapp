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