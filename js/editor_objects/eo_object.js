
function EOObject(maindiv, type, x, y, w, h, style, data, column){
	this.maindiv=maindiv;
	this.recorddiv="#layout_ui_records";
	this.maintenancediv="#layout_ui_maintenance";
	this.searchdiv="#layout_ui_search";
	this.type=type;
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.object;
	this.column=column;
	this.styles=new Array();
	this.styles=this.styles.concat(style);
	this.data=data;
	this.createTypeObject(this.type, this.data);
}

EOObject.prototype.goEdit=function(){
	this.drawEdit();
}

EOObject.prototype.goRecords=function(){
	this.drawRecords();
}

EOObject.prototype.goSearch=function(){
	this.drawSearch();
}

EOObject.prototype.goMaintenance=function(){
	this.drawMaintenance();
}

EOObject.prototype.createTypeObject=function(type, data){
	//IMG 1
	//TEXT 2
	//DIV 3
	
	if(type==="image"){
		this.object=new EOImage(this.x, this.y, this.w, this.h, data);
	}
	if(type==="text"){
		this.object=new EOText(this.x, this.y, this.w, this.h, data);
	}
	if(type==="div"){
		this.object=new EODiv(this.x, this.y, this.w, this.h);
	}
}

EOObject.prototype.setData=function(data){
	if(this.type==="image"){
		this.data=data;
		$(this.object.obj).attr("src", data);
		this.drawSizeDiv();
	}
	if(this.type==="text"){
		this.data=data;
		$(this.object.obj).html(data);
		this.drawSizeDiv();
	}
	if(this.type==="div"){
		
	}
}

EOObject.prototype.setStyle=function(attr, data){
	var styleObj=new Object();
	styleObj.attr=new Array();
	styleObj.data=new Array();
	styleObj.attr[0]=attr;
	styleObj.data[0]=data;
	this.styles.push(styleObj);
	$(this.object.obj).css(attr, data);
}

EOObject.prototype.drawEdit=function(){
	this.object.createEdit();
	$(this.maindiv).append(this.object.obj); 
	this.object.prevHTML=$(this.object.obj).html();
	this.makeDraggable();
	this.drawSizeDiv();
	for(var i=0; i<this.styles.length; i++){
		 try {
			if(this.styles[i].attr[0]!==undefined) {
				$(this.object.obj).css(this.styles[i].attr[0], this.styles[i].data[0]);
			}
		 }catch(e){
			 
		 }	
	}
}

EOObject.prototype.drawRecords=function(){
	this.object.createRecord(this.data);
	$(this.recorddiv).append(this.object.objRecord); 
	for(var i=0; i<this.styles.length; i++){
		 try {
			if(this.styles[i].attr[0]!==undefined) {
				$(this.object.objRecord).css(this.styles[i].attr[0], this.styles[i].data[0]);
			}
		 }catch(e){
			 
		 }
	}
}

EOObject.prototype.drawMaintenance=function(){
	this.object.createMaintenance(this.data);
	$(this.maintenancediv).append(this.object.objMaintenance); 
	for(var i=0; i<this.styles.length; i++){
		 try {
			if(this.styles[i].attr[0]!==undefined) {
				$(this.object.objMaintenance).css(this.styles[i].attr[0], this.styles[i].data[0]);
			}
		 }catch(e){
			 
		 }
	}
}

EOObject.prototype.drawSearch=function(){
	this.object.createSearch(this.data);
	$(this.searchdiv).append(this.object.objSearch); 
	for(var i=0; i<this.styles.length; i++){
		 try {
			if(this.styles[i].attr[0]!==undefined) {
				$(this.object.objSearch).css(this.styles[i].attr[0], this.styles[i].data[0]);
			}
		 }catch(e){
			 
		 }
	}
}

EOObject.prototype.makeDraggable=function(){
	var this_s=this;
	$(function() {
		$(this_s.object.obj).draggable();
	});
    $(this_s.object.obj).bind("contextmenu",function(e){
		editor_size_obj=this_s;
		current_obj=this_s;
        ui_menubar_rel(this_s.object.obj, '#'+this_s.type+'_prop', this_s.maindiv);
		return false;
        $('.alert').fadeToggle(); 
    });

}

EOObject.prototype.drawSizeDiv=function(){
	var divObj=document.createElement("div");
	divObj.style.backgroundColor="rgb(0,0,0)";
	divObj.style.top=(this.object.obj.offsetHeight-5)+"px";
	divObj.style.left=(this.object.obj.offsetWidth-5)+"px";
	divObj.style.width="5px";
	divObj.style.cursor="pointer";
	divObj.style.height="5px";
	divObj.style.position="absolute";
	$(this.object.obj).append(divObj); 
	
	var this_s=this;
	
	$( divObj ).bind( "mousedown", function(e) {
		editor_size_on=1;
		editor_size_obj=this_s;
		editor_size_obj_siz=divObj;
	});
	$( this.maindiv).mousemove(function( e ) {
		editSize(e,editor_size_obj.object.obj,editor_size_obj_siz);
	});
	$( divObj ).bind( "mouseup", function(e) {
		editor_size_on=0;
	});
}

EOObject.prototype.genXML=function(){
	var xml="";

	for(var i=0; i<this.styles.length; i++){
		if(this.styles[i]!==undefined){
			try {
				if(this.styles[i].attr[0]!==undefined){
					xml=xml+"<style attr='"+this.styles[i].attr[0]+"' data='"+this.styles[i].data[0]+"' />";
				}
			}catch(e){
			 
			}
		}
	}

	return xml;
}

EOObject.prototype.destroy=function(){
	var destroy_object=this.object.obj;
	$(destroy_object).remove();
}
