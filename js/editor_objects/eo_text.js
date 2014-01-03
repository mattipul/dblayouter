
function EOText(x,y,w,h,data){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.style;
	this.data=data;
	this.obj;
	this.objRecord;
	this.prevHTML;
}

EOText.prototype.createEdit = function(){
	var textObj=document.createElement("span");
	textObj.style.cursor="pointer";
	textObj.class="ui-widget-content";
	textObj.innerHTML=this.data;
	textObj.style.top=this.y+"px";
	textObj.style.left=this.x+"px";
	textObj.style.width=this.w+"px";
	textObj.style.height=this.h+"px";
	textObj.style.position="absolute";
	textObj.style.borderStyle="dotted";
	textObj.style.borderWidth="1px";
	this.obj=textObj;
}

EOText.prototype.createRecord = function(data){
	var textObj=document.createElement("span");
	textObj.innerHTML=data;
	textObj.style.top=this.y+"px";
	textObj.style.left=this.x+"px";
	textObj.style.width=this.w+"px";
	textObj.style.height=this.h+"px";
	textObj.style.position="absolute";
	this.objRecord=textObj;
}
