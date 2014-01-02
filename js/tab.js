
function Tab(name, id, type){
	this.name=name;
	this.id=id;
	this.type=type;
	this.editor=new Editor();
	this.editor.editor_set_maindiv("#layout_ui_edit");
	$( this.editor.editor_div ).bind( "click", function(e) {
		//alert("");
		current_tab.editor.editor_create_object(e);
	});
	this.obj_arr=new Array();
}

Tab.prototype.addObject = function(obj){
	this.obj_arr.push(obj);
}

