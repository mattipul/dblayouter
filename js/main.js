///MAIN JAVASCRIPT

function main_do_onload(){
	ui_layout_adjust_height();
	current_database=new Database();
	controller_get_database();
}

function main_do_onclick(){

}

function main_do_onresize(){
	ui_layout_adjust_height();
}

function main_do_onmouseup(){
	editor_size_on=0;
}

function main_do_onmousemove(e){

}