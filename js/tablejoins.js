
var table_joins_arr=new Array();
var push_column=0;
var uid=0;

function tablejoins_init(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();

	if(type==="tab"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_tablejoins');
		table_joins_arr=new Array();
		push_column=0;
		uid=0;
		tablejoins_get_table_list();
		tablejoins_init_arr();
	}
}

function tablejoins_find(table, column){
	var obj;
	$('#db_structure').find("p").each(function () {
		if($(this).data("table")===table && $(this).data("column")===column){
			obj=$(this).get(0);
		}
	});
	return obj;
}

function tablejoins_init_callback(data){
	var joins = jQuery.parseJSON( data );
	for(var i=0; i<joins.length; i++){	
			obj1=tablejoins_find(joins[i].table1[0],joins[i].column1[0]);
			obj2=tablejoins_find(joins[i].table2[0],joins[i].column2[0]);
				tablejoin_create_join(joins[i].table1[0], joins[i].table2[0], joins[i].column1[0], joins[i].column2[0], "=",uid,obj1,obj2);
				ax=$(obj1).parent().position().left+$(obj1).parent().width()/2;
				ay=$(obj1).parent().position().top+$(obj1).parent().width()/2;
				bx=$(obj2).parent().position().left+$(obj2).parent().width()/2;
				by=$(obj2).parent().position().top+$(obj2).parent().height()/2;
				table_join_create_line(ax,ay,bx,by,uid, obj1,obj2);
				$(obj1).css("text-decoration", "underline");
				$(obj2).css("text-decoration", "underline");
				uid++;		
	}
}

function tablejoins_init_arr(){
	var variables=new Object();
	variables["tab_id"]=layout_manage_current_id;
	variables["type"]=20;
	ajaxMethods.ajaxPost(variables, tablejoins_init_callback);
}

//////////////

function tablejoins_create_column(name, type, table_name){
	return "<p onmouseout='tablejoin_hover_end()' onmouseover='tablejoin_hover(this)' onclick='tablejoin_push_column(this)' data-table='"+table_name+"' data-column='"+name+"' data-type='"+type+"' class='column_join'>"+name+":"+type+"</p>"
}

function tablejoins_create_table(z, name, data){
	var bump="<div class='db_structure_bump'></div>";
	var data="<div class='db_structure_child'><div class='db_structure_child_name'>"+name+"</div>"+data+"</div>";
	$("#struct"+z).html($("#struct"+z).html()+data+bump);
}

function tablejoins_get_table_list_callback(data){
	var tables = jQuery.parseJSON( data );
	$("#struct"+1).html("");
	$("#struct"+2).html("");
    for(var i=0; i<tables.length; i++){
        if(tables[i] !== undefined){
			var columns="";
			for(var j=0; j<tables[i].column_arr.length; j++){
				if(tables[i].column_arr[j].column_name!==undefined){
					columns=columns+tablejoins_create_column(tables[i].column_arr[j].column_name, tables[i].column_arr[j].column_type,tables[i].table_name);
				}
			}
			tablejoins_create_table(i%2+1, tables[i].table_name, columns);
        }
    }
}

function tablejoins_get_table_list(){
	var variables=new Object();
	variables["type"]=3;
	ajaxMethods.ajaxPost(variables, tablejoins_get_table_list_callback);
}

//////////////////////////

function tablejoin_push_column(obj){
	tablejoin_hover_end();
	if(push_column!=0){
		if(tablejoin_find_and_destroy($(push_column).data("table"), $(obj).data("table"), $(push_column).data("column"), $(obj).data("column"), "=") != 1){
			if(tablejoin_create_join($(push_column).data("table"), $(obj).data("table"), $(push_column).data("column"), $(obj).data("column"), "=",uid,push_column,obj) ==1){
				ax=$(push_column).parent().position().left+$(push_column).parent().width()/2;
				ay=$(push_column).parent().position().top+$(obj).parent().width()/2;
				bx=$(obj).parent().position().left+$(obj).parent().width()/2;
				by=$(obj).parent().position().top+$(obj).parent().height()/2;
				table_join_create_line(ax,ay,bx,by,uid, push_column,obj);
				uid++;
				$(push_column).css("text-decoration", "underline");
				$(obj).css("text-decoration", "underline");
			}else{
			
			}
		}else{
			$(push_column).css("text-decoration", "none");
			$(obj).css("text-decoration", "none");
			tablejoins_is_joined(push_column, $(push_column).data("table"), $(push_column).data("column"));
			tablejoins_is_joined(obj, $(obj).data("table"), $(obj).data("column"));
		}
		$(obj).css("color", "rgb(0,0,0)");
		push_column=0;
	}else{
		$(obj).css("color", "rgb(250,150,150)");
		push_column=obj;
	}
}

////////////////

function tablejoin_create_join(table1, table2, column1, column2, type,uid,obj1, obj2){
	if(table1!=table2){
		var join = new TblJoin(table1, table2, column1, column2, type,uid,obj1, obj2);
		table_joins_arr.push(join);
		return 1;
	}else{
		return 0;
	}
}

function tablejoins_is_joined(object_a, table, column){
	for(var i=0; i<table_joins_arr.length; i++){
			var obj=table_joins_arr[i];
			if((table==obj.table1 || table==obj.table2) && (column==obj.column1 || column==obj.column2)){
				$(object_a).css("text-decoration", "underline");
			}
	}
}

function tablejoin_find_and_destroy(table1, table2, column1, column2, type){
	for(var i=0; i<table_joins_arr.length; i++){
			var obj=table_joins_arr[i];
			if(table1==obj.table1 && table2==obj.table2 && column1==obj.column1 && column2==obj.column2){
				table_joins_arr[i]=0;
				$("#line"+obj.uid).remove();
				return 1;
			}
	}
	return 0;
}

///////////////////////////

function tablejoin_hover(obj){
	for(var i=0; i<table_joins_arr.length; i++){
			var tbl=table_joins_arr[i];
			if(obj==tbl.obj1 || obj==tbl.obj2){
				$(tbl.obj2).css("color", "rgb(150,150,250)");
				$(tbl.obj1).css("color", "rgb(100,100,100)");
			}
	}
}

function tablejoin_hover_end(){
	for(var i=0; i<table_joins_arr.length; i++){
			var tbl=table_joins_arr[i];
			if(tbl!=0){
				$(tbl.obj1).css("color", "rgb(0,0,0)");
				$(tbl.obj2).css("color", "rgb(0,0,0)");
			}
	}
}

//////////////////

function tablejoins_create_xml(){
	var xml_ret="<?xml version='1.0'?><sqljoins>";
	for(var i=0; i<table_joins_arr.length; i++){
			var tbl=table_joins_arr[i];
			if(tbl!=0){
				xml_ret=xml_ret+"<join table1='"+tbl.table1+"' table2='"+tbl.table2+"' column1='"+tbl.column1+"' column2='"+tbl.column2+"' type='"+tbl.type+"'/>";
			}
	}
	xml_ret=xml_ret+"</sqljoins>";
	return xml_ret;
}

////////////////////////

function tablejoins_refresh_callback(data){
	alert(data);
}

function tablejoins_refresh(){
	var xml=tablejoins_create_xml();
	var variables=new Object();
	variables["tab_id"]=layout_manage_current_id;
	variables["type"]=19;
	variables["sql_xml"]=xml;
	ajaxMethods.ajaxPost(variables, tablejoins_refresh_callback);
}