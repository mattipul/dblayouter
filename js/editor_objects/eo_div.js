
function EODiv(x,y,w,h){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.style;
	this.obj;
	this.objRecord;
	this.prevHTML;
}

EODiv.prototype.createEdit = function(){
	var divObj=document.createElement("div");
	divObj.style.cursor="pointer";
	divObj.class="ui-widget-content";
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	this.obj=divObj;
}

EODiv.prototype.createRecord = function(data){
	var divObj=document.createElement("div");
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	this.objRecord=divObj;
}
