///EDITOR JAVASCRIPT

function Editor(){
	this.editor_type;
	this.editor_div="#layout_ui_editor";
	this.editor_on=0;
}

Editor.prototype.setType=function(type){
	this.editor_type=type;
	this.editor_on=1;
}

Editor.prototype.editor_create_object=function(e){
	if(this.editor_on==1){
		var mx=mouseX(e)-$(this.editor_div).offset().left;
		var my=mouseY(e)-$(this.editor_div).offset().top;
		var object=new EOObject(this.editor_div, this.editor_type, mx, my, 50, 50, new Array(), "", "false");
		object.goEdit();
		current_tab.addObject(object);
		this.editor_on=0;
	}
}


