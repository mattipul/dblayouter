
function EditorObject(maindiv, type, x, y){
	this.maindiv=maindiv;
	this.x=x;
	this.y=y;
	this.width=0;
	this.height=0;
	this.type=type;
	this.objelement;
	this.sizdiv;
	this.css_style;
	this.zIndex=0;
	if(type==="text"){
			this.createTextObject("Testiä");
	}
	if(type==="image"){
			this.createImageObject("");
	}
	if(type==="div"){
			this.createDivObject();
	}
}

EditorObject.prototype.tofront=function(){
	this.zIndex++;
	this.setZ();
}

EditorObject.prototype.toback=function(){
	if(this.zIndex>0){
		this.zIndex--;
	}
	this.setZ();
}

EditorObject.prototype.setZ=function(){
	$(editor_size_obj).css("z-index", this.zIndex);
}

EditorObject.prototype.destroy_element=function(){
	ui_menubar_close();
	$(editor_size_obj).remove();
}

EditorObject.prototype.createSizeDiv = function(obj){
	var divObj=document.createElement("div");
	divObj.style.backgroundColor="rgb(250,250,0)";
	divObj.style.top=(obj.offsetHeight-5)+"px";
	divObj.style.left=(obj.offsetWidth-5)+"px";
	divObj.style.width="5px";
	divObj.style.cursor="pointer";
	divObj.style.height="5px";
	divObj.style.position="absolute";
	$(obj).append(divObj); 
	this.sizdiv=divObj;
	var a_this=this;
	var parentr=this.maindiv;
	$( divObj ).bind( "mousedown", function(e) {
		editor_size_on=1;
		editor_size_obj=obj;
		editor_size_obj_siz=divObj;
	});
	$( this.maindiv).mousemove(function( e ) {
		editSize(e,editor_size_obj,editor_size_obj_siz);
	});
	$( divObj ).bind( "mouseup", function(e) {
		editor_size_on=0;
	});
}


EditorObject.prototype.createTextObject = function(text)
{
	var textObj=document.createElement("div");
	this.objelement=textObj;
	editor_size_obj=textObj;
	textObj.style.cursor="pointer";
	textObj.class="ui-widget-content";
	textObj.innerHTML=text;
	textObj.style.top=this.y+"px";
	textObj.style.left=this.x+"px";
	//textObj.style.width=this.width+"px";
	//textObj.style.height=this.height+"px";
	textObj.style.position="absolute";
	textObj.style.borderStyle="dotted";
	textObj.style.borderWidth="1px";
	$(this.maindiv).append(textObj); 
	this.createSizeDiv(textObj);
	 $(function() {
		$(textObj).draggable();
	});
	var a_this=this;
	var t_maindiv=this.maindiv;
    $(textObj).bind("contextmenu",function(e){
		editor_size_obj=textObj;
		current_obj=a_this;
        ui_menubar_rel(textObj, '#teksti_prop', t_maindiv);
		return false;
        $('.alert').fadeToggle(); 
    });

}

EditorObject.prototype.createImageObject = function(src)
{
	var imgObj=document.createElement("img");
	imgObj.src=src;
	this.objelement=imgObj;
	editor_size_obj=imgObj;
	imgObj.class="ui-widget-content";
	imgObj.style.cursor="pointer";
	imgObj.style.top=this.y+"px";
	imgObj.style.left=this.x+"px";
	imgObj.style.width="50px";
	imgObj.style.height="50px";
	imgObj.style.position="absolute";
	imgObj.style.borderStyle="dotted";
	imgObj.style.borderWidth="1px";
	$(this.maindiv).append(imgObj); 
	this.createSizeDiv(imgObj);
	$(function() {
		$(imgObj).draggable();
	});
	var a_this=this;
	var t_maindiv=this.maindiv;
	$(imgObj).bind("contextmenu",function(e){
		editor_size_obj=imgObj;
		current_obj=a_this;
        ui_menubar_rel(imgObj, '#image_prop', t_maindiv);
		return false;
        $('.alert').fadeToggle(); 
    });
}

EditorObject.prototype.createTableObject = function()
{

}

EditorObject.prototype.createDivObject = function()
{
	var divObj=document.createElement("div");
	divObj.style.cursor="pointer";
	this.objelement=divObj;
	editor_size_obj=divObj;
	divObj.class="ui-widget-content";
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width="50px";
	divObj.style.height="50px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	$(this.maindiv).append(divObj); 
	this.createSizeDiv(divObj);
	 $(function() {
		$(divObj).draggable();
	});
	var t_maindiv=this.maindiv;
	var a_this=this;
    $(divObj).bind("contextmenu",function(e){
		editor_size_obj=divObj;
		current_obj=a_this;
        ui_menubar_rel(divObj, '#div_prop', t_maindiv);
		return false;
        $('.alert').fadeToggle(); 
    });
}

