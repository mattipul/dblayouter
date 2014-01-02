
function Database(){
	this.layout_array=new Array();
	this.databaseInit();
}

Database.prototype.databaseInit = function(){
	/*var test_tab=new Tab("Välilehti", 1, 1);
	var test_layout=new Layout(1, "Asetelma");
	test_layout.addTab(test_tab);
	this.databaseAddLayout(test_layout);
	current_layout=test_layout;
	current_tab=test_tab;*/
}

Database.prototype.databaseAddLayout=function(layout){
	this.layout_array.push(layout);
}

