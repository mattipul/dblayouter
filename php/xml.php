<?php

require_once("tablejoin.php");

class Xml{

	private $xmlsqljoins;

	function xml_init_sqljoins($xmlstr){
		$this->xmlsqljoins = new SimpleXMLElement($xmlstr);
	}
	
	function xml_parse_join(){
		$join_list=array();
		foreach ($this->xmlsqljoins->join as $join) {
			$joinObj=new TableJoin;
			$joinObj->table1=$join["table1"];
			$joinObj->table2=$join["table2"];
			$joinObj->column1=$join["column1"];
			$joinObj->column2=$join["column2"];
			$joinObj->type=$join["type"];
			$join_list[]=$joinObj;
		}
		return json_encode($join_list);
	}

}

?>