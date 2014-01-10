<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

require_once("tablejoin.php");
require_once("eobject.php");
require_once("tabstyle.php");
require_once("topological_sort.php");
require_once("graph_node.php");
require_once("tablejoinstosql.php");

	$xmlsqljoins = new SimpleXMLElement("<?xml version='1.0'?><joins><join table1='taulu2' table2='taulu4'/><join table1='taulu3' table2='taulu4'/><join table1='taulu1' table2='taulu2'/><join table1='taulu1' table2='taulu3'/><join table1='taulu4' table2='taulu5'/><join table1='taulu5' table2='taulu6'/></joins>");
	$join_list=array();
	foreach ($xmlsqljoins->join as $joina) {
			$joinObj=new TableJoin;
			$joinObj->table1=(string)$joina["table1"];
			$joinObj->table2=(string)$joina["table2"];
			$join_list[]=$joinObj;
	}
	
	$top=new TopologicalSort();
	$top->graph_init($join_list);
	$lista=$top->topological_sort();
	$graph=$top->graph_init($join_list);
	//var_dump($lista);
	//var_dump($graph);
	
	$s=new TableJoinsToSQL;
	$s->sorted_list=$lista;
	$s->graph=$graph;
	$s->iterate();
	
	


?>