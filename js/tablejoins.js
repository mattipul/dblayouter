
var table_joins_arr=new Array();
var push_column=0;
var uid=0;

function TblJoin(table1, table2, column1, column2, type, uid, obj1, obj2){
	this.table1=table1;
	this.table2=table2;
	this.column1=column1;
	this.column2=column2;
	this.type=type;
	this.uid=uid;
	this.obj1=obj1;
	this.obj2=obj2;
}

//////////////////////

function tablejoins_init(){
	var type=$("#layout_names_select option:selected").data("listtype");
	layout_manage_current_id=$("#layout_names_select option:selected").val();

	if(type==="tab"){
		ui_close_dialog();
		ui_open_dialog('#pimennys_layout_tablejoins');
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
				ay=$(obj1).parent().position().top;
				bx=$(obj2).parent().position().left+$(obj2).parent().width()/2;
				by=$(obj2).parent().position().top+$(obj2).parent().height()/2;
				table_join_create_line(ax,ay,bx,by,uid);
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
	$("#struct"+3).html("");
	$("#struct"+4).html("");
    for(var i=0; i<tables.length; i++){
        if(tables[i] !== undefined){
			var columns="";
			for(var j=0; j<tables[i].column_arr.length; j++){
				if(tables[i].column_arr[j].column_name!==undefined){
					columns=columns+tablejoins_create_column(tables[i].column_arr[j].column_name, tables[i].column_arr[j].column_type,tables[i].table_name);
				}
			}
			tablejoins_create_table(i%4+1, tables[i].table_name, columns);
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
			tablejoin_create_join($(push_column).data("table"), $(obj).data("table"), $(push_column).data("column"), $(obj).data("column"), "=",uid,push_column,obj);
			ax=$(push_column).parent().position().left+$(push_column).parent().width()/2;
			ay=$(push_column).parent().position().top;
			bx=$(obj).parent().position().left+$(obj).parent().width()/2;
			by=$(obj).parent().position().top+$(obj).parent().height()/2;
			table_join_create_line(ax,ay,bx,by,uid);
			uid++;
		}
		push_column=0;
	}else{
		push_column=obj;
	}
}

function table_join_create_line(ax,ay,bx,by,uid){
    console.log('ax: ' + ax);
    console.log('ay: ' + ay);
    console.log('bx: ' + bx);
    console.log('by: ' + by);
    
    
    if (ax > bx) {
        bx = ax + bx;
        ax = bx - ax;
        bx = bx - ax;
        by = ay + by;
        ay = by - ay;
        by = by - ay;
    }
    
    
    console.log('ax: ' + ax);
    console.log('ay: ' + ay);
    console.log('bx: ' + bx);
    console.log('by: ' + by);

    var angle = Math.atan((ay - by) / (bx - ax));
    console.log('angle: ' + angle);
    
    angle = (angle * 180 / Math.PI);
    console.log('angle: ' + angle);
    angle = -angle;
    console.log('angle: ' + angle);

    var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    console.log('length: ' + length);

    var style = ""
    style += "z-index:-1;left:" + (ax) + "px;"
    style += "top:" + (ay) + "px;"
    style += "width:" + length + "px;"
    style += "height:1px;"
    style += "background-color:rgb(200,200,200);"
    style += "position:absolute;"
    style += "transform:rotate(" + angle + "deg);"
    style += "-ms-transform:rotate(" + angle + "deg);"
    style += "transform-origin:0% 0%;"
    style += "-moz-transform:rotate(" + angle + "deg);"
    style += "-moz-transform-origin:0% 0%;"
    style += "-webkit-transform:rotate(" + angle + "deg);"
    style += "-webkit-transform-origin:0% 0%;"
    style += "-o-transform:rotate(" + angle + "deg);"
    style += "-o-transform-origin:0% 0%;"
    style += "-webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);"
    style += "box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .1);"
    style += "z-index:99;"
    $("<div id='line"+uid+"' style='" + style + "'></div>").appendTo('#db_structure');
}

function tablejoin_create_join(table1, table2, column1, column2, type,uid,obj1, obj2){
	var join = new TblJoin(table1, table2, column1, column2, type,uid,obj1, obj2);
	table_joins_arr.push(join);
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

function tablejoin_hover(obj){
	for(var i=0; i<table_joins_arr.length; i++){
			var tbl=table_joins_arr[i];
			if(obj==tbl.obj1 || obj==tbl.obj2 ){
				$(tbl.obj1).css("color", "rgb(255,100,100)");
				$(tbl.obj2).css("color", "rgb(255,100,100)");
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