
function Layout(id, name){
	this.name=name;
	this.id=id;
	this.tab_array=new Array();
}

Layout.prototype.addTab=function(tab){
	this.tab_array.push(tab);
}