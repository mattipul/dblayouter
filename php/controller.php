<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

require_once("database.php");
require_once("layout.php");
require_once("tab.php");
require_once("login.php");
require_once("searchresults.php");
require_once("row.php");
require_once("column.php");
require_once("table.php");
require_once("user.php");
require_once("file.php");
require_once("settings.php");
require_once("eobject.php");
require_once("permissions.php");
require_once("searchterm.php");
require_once("db.php");
require_once("hash.php");
require_once("xml.php");


class Controller{

	public $DB;
	public $hash;
	public $xml;
	
	function controller_init(){
		$databaseObj=new Database;
		$databaseObj->file="dblayouter";
		
		$this->DB=new DB;
		$this->DB->db_set_database($databaseObj);
		$this->DB->db_create_connection();
		
		$this->hash=new Hash;
		
		$this->xml=new Xml;
	}

	//UTILITIES
	
	function clean_string($str){
		return $str;
	}

	//////

	//GET DATABASE(TABLES, LAYOUTS, TABS)
	
	function controller_get_database(){
			$databaseObj=new Database;
			$tableObj=new Table;
			$columnObj=new Column;
			$tabObj=new Tab;
			$layoutObj=new Layout;
			
			$databaseObj->table_arr=$this->DB->db_table_get_all();
			$databaseObj->layout_arr=$this->DB->db_layout_get_all();
			
			/*for($i=0; $i<count($databaseObj->table_arr); $i++){
				$tableObj=$databaseObj->table_arr[$i];
				$columnObj=$this->DB->db_column_get_by_table($tableObj);
				$tableObj->column_arr[]=$columnObj;
				$databaseObj->table_arr[$i]=$tableObj;
			}*/
			
			/*for($i=0; $i<count($databaseObj->layout_arr); $i++){
				$layoutObj=$databaseObj->layout_arr[$i];
				$tabObj=$this->DB->db_tab_get_by_layout($layoutObj);
				$layoutObj->layout_tab_arr[]=$tabObj;
				$databaseObj->layout_arr[$i]=$layoutObj;
			}*/
			
			echo json_encode($databaseObj);
			
	}
	
	/////////

	//CREATE NEW TABLE

	function new_table_return_column($column_name, $column_type){
		$columnObj=new Column;
		$columnObj->column_name=$this->clean_string($column_name);
		$columnObj->column_type=$column_type;
		return $columnObj;
	}

	function controller_create_new_table($table_name, $column_names, $column_types){
		if( $table_name!=NULL && $column_names!=NULL && $column_types!=NULL ){
			$tableObj=new Table;
			$tableObj->table_name=$this->clean_string($table_name);
			$column_names_exp=explode(",", $column_names);
			$column_types_exp=explode(",", $column_types);

			for( $i=1; $i<count($column_names_exp); $i++ ){
				if($column_names_exp[$i]!=NULL && $column_types_exp[$i]!=NULL){
					$tableObj->column_arr[]=$this->new_table_return_column($column_names_exp[$i], $column_types_exp[$i]);
				}
			}

			if(count($tableObj->column_arr)>0){
				$this->DB->db_table_create_table($tableObj);
			}else{
				echo 'Error!';
			}

			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}

	/////////
	
	//GET TABLE LIST
	
	function controller_get_table_list(){
		$table_list=$this->DB->db_table_get_all();
		echo json_encode($table_list);
	}
	
	/////////
	
	//CHANGE TABLE NAME
	
	function controller_change_table_name($table_id, $new_table_name){
		if($table_id!=NULL && $new_table_name!=NULL){
			$tableObj=new Table;
			$tableObj->table_id=$table_id;
			$new_table_name=$this->clean_string($new_table_name);
			$this->DB->db_table_change_name($tableObj, $new_table_name);
			echo 'Success!';
		}else{
			echo "Error!";
		}
	}
	
	/////////

	//CHANGE COLUMN NAME
	
	function controller_change_column_name($column_id, $new_column_name){
		if($column_id!=NULL && $new_column_name!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$new_column_name=$this->clean_string($new_column_name);
			$this->DB->db_column_change_name($columnObj, $new_column_name);
			echo 'Success!';
		}else{
			echo "Error!";
		}
	}
	
	////////
	
	//CHANGE COLUMN TYPE
	
	function controller_change_column_type($column_id, $column_type){
		if($column_id!=NULL && $column_type!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$columnObj->column_type=$column_type;
			$this->DB->db_column_set_type($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	////////
	
	//DESTROY TABLE
	
	function controller_destroy_table($table_id){
		if($table_id!=NULL){
			$tableObj=new Table;
			$tableObj->table_id=$table_id;
			$this->DB->db_table_destroy_table($tableObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	////////
	
	//DESTROY COLUMN
	
	function controller_destory_column($column_id){
		if($column_id!=NULL){
			$columnObj=new Column;
			$columnObj->column_id=$column_id;
			$this->DB->db_column_destroy_column($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	////////
	
	//ADD COLUMN
	
	function controller_add_column($column_name, $column_type, $table_id){
		if($column_name!=NULL && $column_type!=NULL && $table_id!=NULL){
			$columnObj=new Column;
			$columnObj->column_name=$this->clean_string($column_name);
			$columnObj->column_type=$column_type;
			$columnObj->table_id=$table_id;
			$this->DB->db_column_add_column($columnObj);
			echo "Success!";
		}else{
			echo "Error!";
		}
	}
	
	///////
	
	//CREATE LAYOUT
	
	function controller_new_layout($layout_name){
		if($layout_name!=NULL){
			$layoutObj=new Layout;
			$layoutObj->layout_name=$this->clean_string($layout_name);
			$this->DB->db_layout_create_layout($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	///////

	//CREATE TAB
	
	function controller_new_tab($tab_name, $tab_type, $layout_id){
		if($tab_name!=NULL && $tab_type!=NULL && $layout_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_name=$this->clean_string($tab_name);
			$tabObj->tab_type=$tab_type;
			$tabObj->layout_id=$layout_id=$layout_id;
			$this->DB->db_tab_create_tab($tabObj);
			echo "Success!";
		}else{
			echo 'Error!';
		}
	}
	
	///////
	
	//NEW USER
	
	function controller_new_user($username, $password1, $password2){
		if($username!=NULL && $password1!=NULL && $password2!=NULL){
			if(strcmp($password1, $password2) == 0){
				$userObj=new User;
				$userObj->username=$this->clean_string($username);
				$userObj->password=$this->clean_string($password1);
				$userObj=$this->hash->crypt_password($userObj);
				$this->DB->db_user_create_user($userObj);
				echo 'Success!';
			}else{
				echo 'Error!';
			}
		}else{
			echo 'Error!';
		}
	}
	
	///////
	
	//GET LAYOUT LIST
	
	function controller_get_layout_list(){
		$layout_list=$this->DB->db_layout_get_all();
		echo json_encode($layout_list);
	}
	
	///////
	
	//CHANGE LAYOUT NAME
	
	function controller_change_layout_name($layout_id, $new_layout_name){
		if($layout_id!=NULL && $new_layout_name!=NULL){
			$layoutObj=new Layout;
			$layoutObj->layout_name=$this->clean_string($new_layout_name);
			$layoutObj->layout_id=$layout_id;
			$this->DB->db_layout_change_name($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//CHANGE TAB NAME
	
	function controller_change_tab_name($tab_id, $new_tab_name){
		if($tab_id!=NULL && $new_tab_name!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_name=$new_tab_name;
			$tabObj->tab_id=$tab_id;
			$this->DB->db_tab_change_name($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//CHANGE TAB TYPE
	
	function controller_change_tab_type($tab_id, $new_tab_type){
		if($tab_id!=NULL && $new_tab_type!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->tab_type=$new_tab_type;
			$this->DB->db_tab_change_type($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//DESTROY LAYOUT
	
	function controller_destory_layout($layout_id){
		if($layout_id!=NULL){
			$layoutOb=new Layout;
			$layoutObj->layout_id=$layout_id;
			$this->DB->db_layout_destroy_layout($layoutObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//DESTROY TAB
	
	function controller_destroy_tab($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$this->DB->db_tab_destroy_tab($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//UPDATE TAB SQL
	
	function controller_update_tab_sql($tab_id, $tab_sql){
		if($tab_id!=NULL && $tab_sql!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->sql=$tab_sql;
			$this->DB->db_tab_destroy_tab($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//GET SQJOINS TAB
	
	function controller_get_sqljoins($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabObjRet=$this->DB->db_tab_get($tabObj);
			$this->xml->xml_init_sqljoins($tabObjRet->sql);
			echo $this->xml->xml_parse_join();
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//SYNC
	
	function controller_sync($tab_id, $xml){
		if($tab_id!=NULL && $xml!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			$tabObj->xml=$xml;
			$this->DB->db_tab_change_xml($tabObj);
			echo 'Success!';
		}else{
			echo 'Error!';
		}
	}
	
	//////
	
	//GET TAB OBJECTS
	
	function controller_get_tab_objects($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			if($tabRet->xml!=NULL){
				$this->xml->xml_init_tab($tabRet->xml);
				$object_json=$this->xml->xml_parse_tab_objects();
				echo $object_json;
			}
		}else{
			echo 'Error!';
		}
	}
	
	//////

	//GET TAB PROPERTIES

	function controller_get_tab_properties($tab_id){
		if($tab_id!=NULL){
			$tabObj=new Tab;
			$tabObj->tab_id=$tab_id;
			
			$tabRet=$this->DB->db_tab_get($tabObj);
			if($tabRet->xml!=NULL){
				$this->xml->xml_init_tab($tabRet->xml);
				$properties_json=$this->xml->xml_parse_tab_properties();
				echo $properties_json;
			}
		}else{
			echo 'Error!';
		}
	}

	//////
	
}

?>
