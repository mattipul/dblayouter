
var ajaxMethods=new AjaxGetPost();
var db_manage_current_id;
var layout_manage_current_id;

//LOAD LAYOUTS AND TABS

function controller_load_layouts(){
	$("#layout_choose_layout").html(" ");
	$("#current_layout").html(" ");
	for(var i=0; i<current_database.layout_array.length; i++){
		$("#layout_choose_layout").html($("#layout_choose_layout").html() + "<a onclick='controller_load_tabs("+i+")' class='menubar_a' href='#'>"+current_database.layout_array[i].name+"</a><br/>");
		//$("#current_layout").html(current_database.layout_array[i].name);
	}
}

function controller_cur_tab(tab){
	$("#current_tab").html(tab.name);
	current_tab=tab;
	current_tab.draw();
}

function controller_load_tabs(id){
	$("#layout_choose_tab").html(" ");
	$("#current_tab").html("");
	$("#current_layout").html(current_database.layout_array[id].name);
	current_layout=current_database.layout_array[id];
	for(var i=0; i<current_database.layout_array[id].tab_array.length; i++){
		$("#layout_choose_tab").html($("#layout_choose_tab").html() + "<a class='menubar_a' onclick='controller_cur_tab(current_database.layout_array["+id+"].tab_array["+i+"]);' href='#'>"+current_database.layout_array[id].tab_array[i].name+"</a><br/>");
		//$("#current_tab").html(current_database.layout_array[id].tab_array[i].name);
	}
}

//////////

//GET DATABASE

function controller_get_database_callback(data){
	var db=jQuery.parseJSON( data );
	for(var i=0; i<db.layout_arr.length; i++){
		var layoutObj=new Layout(db.layout_arr[i].layout_id,db.layout_arr[i].layout_name);
		for(var j=0; j<db.layout_arr[i].layout_tab_arr.length; j++){
			var tab_id=db.layout_arr[i].layout_tab_arr[j].tab_id;
			var tab_name=db.layout_arr[i].layout_tab_arr[j].tab_name;
			var tab_type=db.layout_arr[i].layout_tab_arr[j].tab_type;
			var tabObj=new Tab(tab_name, tab_id, tab_type);
			//alert(tabObj.id + "asf ");
			layoutObj.addTab(tabObj);
		}
		current_database.databaseAddLayout(layoutObj);
	}
	
	controller_load_layouts();
}

function controller_get_database(){
	var variables=new Object();
	variables["type"]=1;
	ajaxMethods.ajaxPost(variables, controller_get_database_callback);
}

//////////

//NEW TABLE

function controller_new_table_refresh(){
        $("#db_new_table_columns").html("");
        var count = parseInt($("#db_new_table_column_count").val());
        for(var i=0; i<count; i++){
                var clr="";                
                if(i%2!=0){
                        clr="background-color:rgb(255,255,255);";
                }
                else{
                        clr="background-color:rgb(245,245,245);";
                }
                $("#db_new_table_columns").html($("#db_new_table_columns").html() + '<div style="'+clr+';padding:5px;width:100%"><span>Column name:</span><input class="column_name" style="width:25%" type="text" />        <select class="column_type"><option value="-1">Type</option><option value="TEXT">TEXT</option><option value="INT">INT</option><option value="DATE">DATE</option><option value="DOUBLE">DOUBLE</option></select></div>');
        }
}

function controller_new_table_get_column_names(arr){
	$('.column_name').each(function(){
		arr["column_names"]=arr["column_names"]+","+$(this).val();
	});
}

function controller_new_table_get_column_types(arr){
	$('.column_type').each(function(){
		arr["column_types"]=arr["column_types"]+","+$(this).val();
	});
}

function controller_new_table_callback(data){
	alert(data);
}

function controller_new_table_create(){
	var variables=new Object();
	controller_new_table_get_column_names(variables);
	controller_new_table_get_column_types(variables);
	variables["table_name"]=$("#db_new_table_name").val();
	variables["type"]=2;
	ajaxMethods.ajaxPost(variables, controller_new_table_callback);
}

//////////

//GET TABLES

function controller_get_table_list_callback(data){
	var tables = jQuery.parseJSON( data );
    for(var i=0; i<tables.length; i++){
        if(tables[i] !== undefined){
            $("#table_names_select").html( $("#table_names_select").html() + "<option data-listtype='table' value='"+tables[i].table_id+"'>"+tables[i].table_name+"</option>" );
            for(var j=0; j<tables[i].column_arr.length; j++){
                $("#table_names_select").html( $("#table_names_select").html() + "<option data-listtype='column' data-table='"+tables[i].table_id+"' style='color:rgb(100,100,150)' value='"+tables[i].column_arr[j].column_id+"'>-"+tables[i].column_arr[j].column_name+":"+tables[i].column_arr[j].column_type+"</option>" );
            }
        }
    }
}

function controller_get_table_list(){
	var variables=new Object();
	variables["type"]=3;
	$("#table_names_select").html("");
	ajaxMethods.ajaxPost(variables, controller_get_table_list_callback);
}

//////////

//CHANGE NAME (COLUMN & TABLE)

function controller_change_name_column_callback(data){
	alert(data);
}

function controller_change_name_column(){
	var variables=new Object();
	variables["type"]=5;
	variables["column_id"]=db_manage_current_id;
	variables['column_name']=$("#db_manage_new_column_name").val();
	ajaxMethods.ajaxPost(variables, controller_change_name_column_callback);
}

function controller_change_name_table_callback(data){
	alert(data);
}

function controller_change_name_table(){
	var variables=new Object();
	variables["type"]=4;
	variables["table_id"]=db_manage_current_id;
	variables['table_name']=$("#db_manage_new_table_name").val();
	ajaxMethods.ajaxPost(variables, controller_change_name_table_callback);
}

function controller_change_name_database_structure(){
	var type=$("#table_names_select option:selected").data("listtype");
	db_manage_current_id=$("#table_names_select option:selected").val();
	
	if(type==="table"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_manage_name_table');
	}
	
	if(type==="column"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_manage_name_column');
	}
}

/////////

//CHANGE COLUMN TYPE

function controller_change_type_callback(data){
	alert(data);
}

function controller_change_column_type(){
	var variables=new Object();
	variables["type"]=6;
	variables["column_id"]=db_manage_current_id;
	variables['column_type']=$("#manage_type_column_type").val();
	ajaxMethods.ajaxPost(variables, controller_change_type_callback);	
}

function controller_change_column_type_sturcture(){
	var type=$("#table_names_select option:selected").data("listtype");
	db_manage_current_id=$("#table_names_select option:selected").val();
	if(type==="column"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_manage_type');
	}
}

/////////

//DESTROY TABLES & COLUMNS

function controller_destroy_column_callback(data){
	alert(data);
}

function controller_destroy_column(){
	var variables=new Object();
	variables["type"]=8;
	variables["column_id"]=db_manage_current_id;
	ajaxMethods.ajaxPost(variables, controller_destroy_column_callback);
}

function controller_destroy_table_callback(data){
	alert(data);
}

function controller_destroy_table(){
	var variables=new Object();
	variables["type"]=7;
	variables["table_id"]=db_manage_current_id;
	ajaxMethods.ajaxPost(variables, controller_destroy_table_callback);
}

function controller_destroy_database_structure(){
	var type=$("#table_names_select option:selected").data("listtype");
	db_manage_current_id=$("#table_names_select option:selected").val();
	
	if(type==="table"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_destroy_table');
	}
	
	if(type==="column"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_destroy_column');
	}
}

/////////

//ADD COLUMN

function controller_add_column_callback(data){
	alert(data);
}

function controller_add_column(){
	var variables=new Object();
	variables["type"]=9;
	variables["column_name"]=$("#add_column_column_name").val();
	variables['column_type']=$("#add_column_column_type").val();
	variables['table_id']=db_manage_current_id;
	ajaxMethods.ajaxPost(variables, controller_add_column_callback);	
}

function controller_add_column_structure(){
	var type=$("#table_names_select option:selected").data("listtype");
	db_manage_current_id=$("#table_names_select option:selected").val();
	
	if(type==="table"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_db_add_column');
	}
}

/////////

//NEW LAYOUT

function controller_new_layout_callback(data){
	alert(data);
}

function controller_new_layout(){
	var variables=new Object();
	variables["type"]=10;
	variables["layout_name"]=$("#layout_new_layout_name").val();
	ajaxMethods.ajaxPost(variables, controller_add_column_callback);	
}

/////////

//NEW TAB


function controller_new_tab_callback(data){
	alert(data);
}

function controller_new_tab(){
	var variables=new Object();
	variables["type"]=11;
	variables["layout_id"]=layout_manage_current_id;
	variables["tab_name"]=$("#layout_new_tab_name").val();
	variables["tab_type"]=$("#layout_new_tab_type").val();
	ajaxMethods.ajaxPost(variables, controller_new_tab_callback);	
}

function controller_new_tab_structure(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();
	
	if(type==="layout"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_newtab');
	}

}

/////////

//NEW USER

function controller_new_user_callback(data){
	alert(data);
}

function controller_new_user(){
	var variables=new Object();
	variables["type"]=12;
	variables["username"]=$("#new_username").val();
	variables["password1"]=$("#new_password1").val();
	variables["password2"]=$("#new_password2").val();
	ajaxMethods.ajaxPost(variables, controller_new_user_callback);	
}

/////////

//GET LAYOUT LIST

function controller_get_layout_list_callback(data){
	var layouts = jQuery.parseJSON( data );
    for(var i=0; i<layouts.length; i++){
        if(layouts[i] !== undefined){
            $("#layout_names_select").html( $("#layout_names_select").html() + "<option data-listtype='layout' value='"+layouts[i].layout_id+"'>"+layouts[i].layout_name+"</option>" );
            for(var j=0; j<layouts[i].layout_tab_arr.length; j++){
                $("#layout_names_select").html( $("#layout_names_select").html() + "<option data-listtype='tab' data-layout='"+layouts[i].layout_id+"' style='color:rgb(100,100,150)' value='"+layouts[i].layout_tab_arr[j].tab_id+"'>-"+layouts[i].layout_tab_arr[j].tab_name+":"+layouts[i].layout_tab_arr[j].tab_type+"</option>" );
            }
        }
    }
}

function controller_get_layout_list(){
	var variables=new Object();
	variables["type"]=13;
	ajaxMethods.ajaxPost(variables, controller_get_layout_list_callback);	
	$("#layout_names_select").html("");
}

//////////

//CHANGE LAYOUT & TAB NAME


function controller_change_name_tab_callback(data){
	alert(data);
}

function controller_change_name_tab(){
	var variables=new Object();
	variables["type"]=15;
	variables["tab_id"]=layout_manage_current_id;
	variables["new_tab_name"]=$("#layout_manage_new_tab_name").val();
	ajaxMethods.ajaxPost(variables, controller_change_name_tab_callback);	
}


function controller_change_name_layout_callback(data){
	alert(data);
}

function controller_change_name_layout(){
	var variables=new Object();
	variables["type"]=14;
	variables["layout_id"]=layout_manage_current_id;
	variables["new_layout_name"]=$("#layout_manage_new_layout_name").val();
	ajaxMethods.ajaxPost(variables, controller_change_name_layout_callback);	
}

function controller_change_name_tablayout_structure(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();
	
	if(type==="layout"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_manage_name_layout');
	}
	if(type==="tab"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_manage_name_tab');
	}
}

//////////

//CHANGE TAB TYPE

function controller_change_tab_type_callback(data){
	alert(data);
}

function controller_change_tab_type(){
	var variables=new Object();
	variables["type"]=16;
	variables["tab_id"]=layout_manage_current_id;
	variables["new_tab_type"]=$("#layout_update_tab_type").val();
	ajaxMethods.ajaxPost(variables, controller_change_tab_type_callback);	
}

function controller_change_tab_type_structure(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();

	if(type==="tab"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_manage_change_type');
	}
}

///////////

//DESTROY LAYOUTS & TABS

function controller_destroy_tab_callback(data){
	alert(data);
}

function controller_destroy_tab(){
	var variables=new Object();
	variables["type"]=18;
	variables["tab_id"]=layout_manage_current_id;
	ajaxMethods.ajaxPost(variables, controller_destroy_tab_callback);	
}


function controller_destroy_layout_callback(data){
	alert(data);
}

function controller_destroy_layout(){
	var variables=new Object();
	variables["type"]=17;
	variables["layout_id"]=layout_manage_current_id;
	ajaxMethods.ajaxPost(variables, controller_destroy_layout_callback);	
}

function controller_destroy_tablayout_structure(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();
	
	if(type==="layout"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_destroy_layout');
	}
	if(type==="tab"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_destroy_tab');
	}
}

///////////

//SYNC

function controller_sync_callback(data){
	current_tab.refresh();
}

function controller_sync(){
	var variables=new Object();
	variables["type"]=21;
	variables["tab_id"]=current_tab.id;
	variables["xml"]=current_tab.genXML();
	ajaxMethods.ajaxPost(variables, controller_sync_callback);	
}

///////////

//CHANGE TAB STYLE

function controller_change_tab_style(){
	var width=$("#tab_properties_width").val();
	var height=$("#tab_properties_height").val();
	var background=$("#tab_properties_background").val();
	var fontfamily=$("#tab_properties_fontfamily").val();

	current_tab.setStyle("width", width);
	current_tab.setStyle("height", height);
	current_tab.setStyle("background-color", background);
	current_tab.setStyle("font-family", fontfamily);
}

///////////

//CHANGE OBJECT STYLE

function controller_change_object_style(){
	
}

///////////

//CHANGE OBJECT DATA

function controller_change_object_data_text(){
	$("#object_data_header").html("Change text");
	$("#object_data_div").html("<span>Text: </span><input id='object_data_changed' type='text' class='kentta' />");
	$( "#button_change_object_data" ).click(function() {
		ui_close_dialog();
		editor_size_obj.setData($("#object_data_changed").val());
	});
}

function controller_change_object_data_img(){
	$("#object_data_header").html("Change image source");
	$("#object_data_div").html("<span>Image: </span><input id='object_data_changed' type='text' class='kentta' />");
	$( "#button_change_object_data" ).click(function() {
		ui_close_dialog();
		editor_size_obj.setData($("#object_data_changed").val());
	});
}

function controller_change_object_data_type(){
	if(editor_size_obj.type === "text"){
		controller_change_object_data_text();
	}
	if(editor_size_obj.type === "image"){
		controller_change_object_data_img();
	}
}

function controller_change_object_data_structure(){
	ui_close_dialog();
	ui_open_dialog('#pimennys_data');
	controller_change_object_data_type();
}

///////////

//DELETE OBJECT

function controller_delete_object(){
	editor_size_obj.destroy();
	ui_menubar_close();
	for(var i=0; i<current_tab.obj_arr.length; i++){
		if(objectEquals(editor_size_obj, current_tab.obj_arr[i])){
			current_tab.obj_arr.remove(i,i);
		}
	}
}

///////////

//REFRESH


//////////



