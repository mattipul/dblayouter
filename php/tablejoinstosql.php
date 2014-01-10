<?php

require_once("tablejoin.php");
require_once("graph_node.php");

class TableJoinsToSQL{

	public $node_sql=array();
	public $sorted_list;
	public $graph;
	
	function sorted_to_graph($node){
		for($i=0; $i<count($this->graph); $i++){
			if(strcmp($node->name, $this->graph[$i]->name)==0){
				return $this->graph[$i];
			}
		}
	}
	
	function create_sql($node){
		$gNode=$this->sorted_to_graph($node);
		echo count($gNode->neighbours);
		if( count($gNode->neighbours) >0 ){
			$sqlstatement="(SELECT * FROM ".$node->name;
			for($i=0; $i<count($gNode->neighbours); $i++){
					$sqlstatement=$sqlstatement." JOIN ".$this->node_sql[$gNode->neighbours[$i]->name];
					$sqlstatement=$sqlstatement." ON s=s";
			}
			$this->node_sql[$gNode->name]=$sqlstatement.")";
		}else{
			$this->node_sql[$gNode->name]=$gNode->name;
		}
		
	}
	
	function iterate(){
		$whole_sql="";
		//var_dump($this->graph);
		for($i=count($this->sorted_list)-1; $i>=0; $i--){
			$this->create_sql($this->sorted_list[$i]);
		}
		echo $this->node_sql[$this->sorted_list[0]->name];
	}
	
}

?>