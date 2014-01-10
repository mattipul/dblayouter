<?php

require_once("tablejoin.php");
require_once("eobject.php");
require_once("tabstyle.php");
require_once("topological_sort.php");
require_once("graph_node.php");

class Xml{

	private $xmlsqljoins;
	private $xmltab;

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
	
	function xml_init_tab($xmlstr){
		$this->xmltab = new SimpleXMLElement($xmlstr);
	}

	function xml_parse_tab_properties(){
		$style_list=array();
		foreach ($this->xmltab->properties->style as $style) {
			$styleObj=new TabStyle;
			$styleObj->attr=$style["attr"];
			$styleObj->data=$style["data"];
			$style_list[]=$styleObj;
		}
		return json_encode($style_list);
	}
	
	function xml_parse_tab_objects(){
		$obj_list=array();
		foreach ($this->xmltab->objects->object as $object) {
			$objObj=new EObject;
			$objObj->x=$object["x"];
			$objObj->y=$object["y"];
			$objObj->w=$object["w"];
			$objObj->h=$object["h"];
			$objObj->type=$object["type"];
			$objObj->style=$this->xml_parse_tab_objects_object($object);
			$objObj->data=$object["data"];
			$obj_list[]=$objObj;
		}
		return json_encode($obj_list);
	}
	
	function xml_parse_tab_objects_object($object){
		$obj_list=array();
		foreach ($object->style as $style) {
			$objObj=new TabStyle;
			$objObj->attr=$style["attr"];
			$objObj->data=$style["data"];
			$obj_list[]=$objObj;
		}
		return $obj_list;
	}

}

?>
