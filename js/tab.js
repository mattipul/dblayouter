
function Tab(name, id, type){
	this.name=name;
	this.id=id;
	this.type=type;
	this.styles=new Array();
	this.editor=new Editor();
	this.editor.editor_set_maindiv("#layout_ui_edit");
	$( this.editor.editor_div ).bind( "click", function(e) {
		//alert("");
		current_tab.editor.editor_create_object(e);
	});
	this.obj_arr=new Array();
	this.genArrObj();
	this.genArrProp();
}

Tab.prototype.addObject = function(obj){
	this.obj_arr.push(obj);
}

Tab.prototype.draw=function(){

	//this.refresh();
	$("#layout_ui_records").html("");
	$("#layout_ui_records").removeAttr('style');
	$("#layout_ui_maintenance").html("");
	$("#layout_ui_maintenance").removeAttr('style');
	$("#layout_ui_search").html("");
	$("#layout_ui_search").removeAttr('style');
	$(this.editor.editor_div).html("");

//EDIT
	for(var i=0; i<this.styles.length; i++){
		$(this.editor.editor_div).css(this.styles[i].attr, this.styles[i].data);
	}
	for(var i=0; i<this.obj_arr.length; i++){
		this.obj_arr[i].goEdit();
	}

/////

//RECORDS
	if(this.type==1){
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_records").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.obj_arr.length; i++){
			this.obj_arr[i].goRecords();
		}
	}
/////

//MAINTENANCE
	if(this.type==2){
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_maintenance").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.obj_arr.length; i++){
			this.obj_arr[i].goMaintenance();
		}
	}
/////

//SEARCH
	if(this.type==0){
		alert("dg");
		for(var i=0; i<this.styles.length; i++){
			$("#layout_ui_search").css(this.styles[i].attr, this.styles[i].data);
		}
		for(var i=0; i<this.obj_arr.length; i++){
			this.obj_arr[i].goSearch();
		}
	}
/////
}

Tab.prototype.genXML=function(){
	var xml="<?xml version='1.0'?><tab>";

	xml=xml+"<properties>";
	for(var i=0; i<this.styles.length; i++){
		
		xml=xml+"<style attr='"+this.styles[i]["attr"]+"' data='"+this.styles[i]["data"]+"' />";
	}
	xml=xml+"</properties>";	
	
	xml=xml+"<objects>";
	for(var i=0; i<this.obj_arr.length; i++){
		var aobj=this.obj_arr[i].object.obj;
		var x=$(aobj).position().left;
		var y=$(aobj).position().top;
		var w=$(aobj).width();
		var h=$(aobj).height();
		var style=this.obj_arr[i].genXML();
		var data=this.obj_arr[i].data;
		var type=this.obj_arr[i].type;
		xml=xml+"<object x='"+x+"' y='"+y+"' w='"+w+"' h='"+h+"' type='"+type+"' column='' data='"+data+"'>"+style+"</object>";
	}
	xml=xml+"</objects>";	
	
	xml=xml+"</tab>";
	
	return xml;
}

Tab.prototype.genArrObj=function(){
	this.obj_arr=new Array();
	var variables=new Object();
	variables["type"]=22;
	variables["tab_id"]=this.id;
	var this_s=this;
	ajaxMethods.ajaxPost(variables, function(data){
		var objects=jQuery.parseJSON( data );	
		for(var i=0; i<objects.length; i++){
			var object=new EOObject(this_s.editor.editor_div, objects[i].type[0], objects[i].x[0], objects[i].y[0], objects[i].w[0], objects[i].h[0], objects[i].style, objects[i].data[0], objects[i].column[0]);
			this_s.addObject(object);
		}
	});
}

Tab.prototype.genArrProp=function(){
	this.styles=new Array();
	var variables=new Object();
	variables["type"]=23;
	variables["tab_id"]=this.id;
	var this_s=this;
	ajaxMethods.ajaxPost(variables, function(data){
		var styles=jQuery.parseJSON( data );	
		for(var i=0; i<styles.length; i++){
			this_s.setStyle(styles[i].attr[0], styles[i].data[0]);
		}
	});
}

Tab.prototype.setStyle=function(attr, data){
	var styleObj=new Object();
	styleObj["attr"]=attr;
	styleObj["data"]=data;
	this.styles.push(styleObj);
	$(this.editor.editor_div).css(attr, data);
}

Tab.prototype.refresh=function(){
	this.obj_arr=new Array();
	var variables=new Object();
	variables["type"]=22;
	variables["tab_id"]=this.id;
	var this_s=this;
	ajaxMethods.ajaxPost(variables, function(data){
		var objects=jQuery.parseJSON( data );	
		for(var i=0; i<objects.length; i++){
			var object=new EOObject(this_s.editor.editor_div, objects[i].type[0], objects[i].x[0], objects[i].y[0], objects[i].w[0], objects[i].h[0], objects[i].style, objects[i].data[0], objects[i].column[0]);
			this_s.addObject(object);
		}

		this_s.styles=new Array();
		var variables=new Object();
		variables["type"]=23;
		variables["tab_id"]=this_s.id;
		ajaxMethods.ajaxPost(variables, function(data){
			var styles=jQuery.parseJSON( data );	
			for(var i=0; i<styles.length; i++){
				this_s.setStyle(styles[i].attr[0], styles[i].data[0]);
			}
			this_s.draw();
		});
		
	});


}







