
function EOImage(x,y,w,h,data){
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.data=data;
	this.style;
	this.obj;
	this.objRecord;
	this.objMaintenance;
	this.objSearch;
	this.prevHTML;
}

EOImage.prototype.createEdit = function(){
	var divObj=document.createElement("div");
	var imgObj=document.createElement("img");
	divObj.class="ui-widget-content";
	imgObj.src=this.data;
	divObj.style.cursor="pointer";
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	$(divObj).append(imgObj);
	imgObj.style.width="100%";
	imgObj.style.height="100%";
	this.obj=divObj;
}

EOImage.prototype.createRecord = function(data){
	var divObj=document.createElement("div");
	var imgObj=document.createElement("img");
	imgObj.src=this.data;
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	$(divObj).append(imgObj);
	imgObj.style.width="100%";
	imgObj.style.height="100%";
	this.objRecord=divObj;
}

EOImage.prototype.createSearch = function(data){
	var divObj=document.createElement("div");
	var imgObj=document.createElement("img");
	imgObj.src=this.data;
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	$(divObj).append(imgObj);
	imgObj.style.width="100%";
	imgObj.style.height="100%";
	this.objSearch=divObj;
}

EOImage.prototype.createMaintenance = function(data){
	var divObj=document.createElement("div");
	var imgObj=document.createElement("img");
	imgObj.src=this.data;
	divObj.style.top=this.y+"px";
	divObj.style.left=this.x+"px";
	divObj.style.width=this.w+"px";
	divObj.style.height=this.h+"px";
	divObj.style.position="absolute";
	divObj.style.borderStyle="dotted";
	divObj.style.borderWidth="1px";
	$(divObj).append(imgObj);
	imgObj.style.width="100%";
	imgObj.style.height="100%";
	this.objMaintenance=divObj;
}


