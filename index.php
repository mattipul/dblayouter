<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DbLayouter</title>
<link rel="stylesheet" type="text/css" href="style.css">
<link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
</head>
<body onload="main_do_onload();" onresize="main_do_onresize();" onmouseup="main_do_onmouseup()" onmousemove="main_do_onmousemove(event)">


<div id="menubar">
	<img src="img/logo.png" style="height:18px;margin:2px;float:left;"/>
	<a class="menubar_item" href="#" onclick="ui_menubar(this, '#database_valikko')">Database</a>
	<a class="menubar_item" href="#" onclick="ui_menubar(this, '#layout_valikko')">Layout</a>
	<a class="menubar_item" href="#" onclick="ui_menubar(this, '#users_valikko')">Users</a>
	<a class="menubar_item" href="#">Settings</a>
	<a class="menubar_item" href="#">About</a>
	<a class="menubar_item" style="float:right" href="#">Log out</a>
</div>



<div id="toolbar">
	<div style="float:left;margin-right:10px;"> 
	<div class="painike" style="padding:5px;float:left;text-align:center;width:40px;">
		<img src="img/prev.png" style="height:30px;"/>
	</div>
	<div class="painike" style="padding:5px;float:left;text-align:center;width:40px;">
		<img src="img/next.png" style="height:30px;"/>
	</div>
	</div>
	<div style="float:left;margin-right:10px;width:200px;">
		<div style="float:left;height:50%"> 
			<input style="border-style:solid;text-align:right;width:70px;height:20px;border-radius:5px;" type="text"/> / 1000
		</div>	
		<div  style="float:left;height:50%;">
			<div style="width:100px;height:5px;background:rgb(200,200,200);position:relative;top:12px;border-style:solid;border-width:1px;border-color:rgb(170,170,170);"></div>
			<div style="width:5px;height:14px;background:rgb(200,200,200);position:relative;border-style:solid;border-width:1px;border-color:rgb(170,170,170);"></div>
		</div>
	</div>
	<div onclick="ui_open_layout_editor_records()" class="painike" style="padding:0px;float:left;text-align:center;width:100px;">
		<img src="img/gui.png" style="height:30px;"/><br/><span style="font-size:12px">Layout editor</span>
	</div>
	<div onclick="ui_open_layout_records()" class="painike" style="padding:0px;float:left;text-align:center;width:100px;">
		<img src="img/records.png" style="height:30px;"/><br/><span style="font-size:12px">Records</span>
	</div>
	<div onclick="ui_open_layout_maintenance();" class="painike" style="padding:0px;float:left;text-align:center;width:100px;">
		<img src="img/maintenance.png" style="height:30px;"/><br/><span style="font-size:12px">Maintenance</span>
	</div>
	<div onclick="ui_open_layout_search();" class="painike" style="padding:0px;float:left;text-align:center;width:100px;">
		<img src="img/search.png" style="height:30px;"/><br/><span style="font-size:12px">Search</span>
	</div>
	<div onclick="controller_sync();" class="painike" style="padding:0px;float:left;text-align:center;width:100px;">
		<img src="img/refresh.png" style="height:30px;"/><br/><span style="font-size:12px">Refresh</span>
	</div>
</div>

<div id="layoutbar">
<div style="margin:5px;font-size:12px;float:left;" ><span style="float:left;">Layout: </span><a href="#" id="current_layout" onclick="ui_menubar(this, '#layout_choose_layout')" class="alasveto"></a></div>
<div style="margin:5px;font-size:12px;float:left;"><span style="float:left;">Tab: </span><a href="#" id="current_tab" onclick="ui_menubar(this, '#layout_choose_tab')" class="alasveto"></a></div>
</div>

<div style="clear:both"></div>



<div id="layout">

	<div class="layout_child" id="layout_ui_tools">
	<p class="layout_tool" onclick="ui_open_dialog('#pimennys_wrench');"><span style="margin:15px;" class="glyphicon glyphicon-wrench"></span></p>
	<p class="layout_tool" onclick="current_tab.editor.setType('text')"><span style="margin:15px;" class="glyphicon glyphicon-font"></span></p>
	<p class="layout_tool" onclick="current_tab.editor.setType('image')"><span style="margin:15px;" class="glyphicon glyphicon-picture"></span></p>
	<p class="layout_tool"><span style="margin:15px;" class="glyphicon glyphicon-pencil"></span></p>
	<p class="layout_tool" onclick="current_tab.editor.setType('div')"><span style="margin:15px;" class="glyphicon glyphicon-list-alt"></span></p>
	<p class="layout_tool" onclick="ui_menubar_tools('#layout_ui_moduls');ui_moduls();"><span style="margin:15px;" class="glyphicon glyphicon-chevron-right"></span></p>
	</div>

	<div class="layout_child" id="layout_ui">
		<div id="layout_ui_edit">
		</div>
	</div>
	
	<div class="layout_child" id="layout_records">
		<div id="layout_ui_records">
		</div>
	</div>
	
	<div class="layout_child" id="layout_maintenance">
		<div id="layout_ui_maintenance">
		</div>
	</div>
	
	<div class="layout_child" id="layout_search">
		<div id="layout_ui_search">
		</div>
	</div>

</div>






<div id="statusbar">
</div>











<div class="valikko_menubar" id="database_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_properties')">Properties</a><br/>
<hr/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_newtable')">New table</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_db_manage');controller_get_table_list();">Manage tables</a><br/><br/>
</div>

<div class="valikko_menubar" id="layout_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_properties')">Properties</a><br/>
<hr/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_newlayout')">New layout</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_layout_manage');controller_get_layout_list();">Manage layouts</a><br/>
<hr/>
<a class="menubar_a" href="#">Layout editor</a><br/>
<a class="menubar_a" href="#">Records</a><br/>
<a class="menubar_a" href="#">Search</a><br/><br/>
</div>

<div class="valikko_menubar" id="users_valikko">
<a class="menubar_a" href="#" onclick="ui_open_dialog('#pimennys_new_user')">New user</a><br/>
<a class="menubar_a" href="#">Manage users</a><br/>
<a class="menubar_a" href="#">Delete user</a><br/><br/>
</div>

<div class="valikko_menubar" id="layout_choose_layout">

</div>

<div class="valikko_menubar" id="layout_choose_tab">

</div>





<div class="valikko_menubar_a" id="layout_ui_moduls">
</div>










<div class="valikko_menubar" id="text_prop">
<a class="menubar_a" href="#" onclick="controller_change_object_data_structure()">Text</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_style_dialog();">Style</a><br/>
<a class="menubar_a" href="#" onclick="controller_delete_object();">Delete object</a><br/><br/>
</div>

<div class="valikko_menubar" id="div_prop">
<a class="menubar_a" href="#" onclick="ui_open_style_dialog();">Style</a><br/>
<a class="menubar_a" href="#" onclick="controller_delete_object();">Delete object</a><br/><br/>
</div>

<div class="valikko_menubar" id="image_prop">
<a class="menubar_a" href="#" onclick="controller_change_object_data_structure()">Source</a><br/>
<a class="menubar_a" href="#" onclick="ui_open_style_dialog();">Style</a><br/>
<a class="menubar_a" href="#" onclick="controller_delete_object();">Delete object</a><br/><br/>
</div>



















<div id="pimennys" onclick="">

	<div class="pimennys_child" id="pimennys_data">
		<h4 style="float:left" id="object_data_header"></h4><a style="float:right" href="#" onclick="ui_close_dialog();">Close</a>
		<div style="clear:both"></div><hr/>
		<div id="object_data_div">

		</div>
		<hr/>
		<a href="#" style="" id="button_change_object_data" onclick="" class="nappula2">Change</a><br/>
	</div>

	<div class="pimennys_child" id="pimennys_style">
		<h4 style="float:left">Object properties</h4><a style="float:right" href="#" onclick="ui_close_dialog();">Close</a>
		<div style="clear:both"></div><hr/>
		<div id="style_parameters">
			<table>
				<tr><td style="width:30%"><span>Background: </span></td><td><input class="kentta" id="object_properties_background" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Font-family: </span></td><td><input class="kentta" id="object_properties_fontfamily" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Font-size: </span></td><td><input class="kentta" id="object_properties_fontsize" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Color: </span></td><td><input class="kentta" id="object_properties_color" type="text"/></div></td></tr>
			</table>
		</div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_object_style();" class="nappula2">Ok</a><br/>
	</div>
	
	<div class="pimennys_child" id="pimennys_wrench">
		<h4 style="float:left">Tab properties</h4><a style="float:right" href="#" onclick="ui_close_dialog();">Close</a>
		<div style="clear:both"></div><hr/>
		<div id="style_parameters">
			<table>
				<tr><td style="width:30%"><span>Width: </span></td><td><input class="kentta" id="tab_properties_width" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Height: </span></td><td><input class="kentta" id="tab_properties_height" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Background: </span></td><td><input class="kentta" id="tab_properties_background" type="text"/></div></td></tr>
				<tr><td style="width:30%"><span>Font-family: </span></td><td><input class="kentta" id="tab_properties_fontfamily" type="text"/></div></td></tr>
			</table>
		</div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_tab_style();" class="nappula2">Save properties</a><br/>
	</div>
	
	<!--- -->
	<!--- -->
	<!--- -->
	
	<div class="pimennys_child" id="pimennys_db_properties">
	<div class="ui_bar"><p class="tit">Database properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	<div id="style_parameters"></div>
	<hr/>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Save</a>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Empty</a>
	<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_newtable">
	<div class="ui_bar"><p class="tit">New table</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:60%;float:left;">
			<p>Table name:</p><input class="kentta" id="db_new_table_name" style="width:100%;" type="text"/>
		</div>
		<div style="width:20%;float:left;">
			<p>Column count:</p><input class="kentta" id="db_new_table_column_count" style="width:80%;margin-left:5px;" type="text"/>
		</div>
		<div style="width:20%;float:left;padding-top:25px;">
			<a href="#" class="nappi6" onclick="controller_new_table_refresh();">Refresh</a>
		</div>
		<div style="clear:both"></div>
		
		<div class="parameters" id="db_new_table_columns"></div>
		
		<hr/>
		<a href="#" onclick="ui_close_dialog();controller_new_table_create();" onclick="ui_close_dialog();" class="nappi6">Create table</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Empty</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_manage">
	<div class="ui_bar"><p class="tit">Manage tables</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:70%;float:left">
			<select id="table_names_select" style="padding:5px;width:100%; height:300px;" size="100"> </select>
		</div>
		<div style="width:30%;float:left;padding:5px;text-align:center">
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_add_column_structure();">Add a column</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_change_name_database_structure()">Change name</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_change_column_type_sturcture()">Change type</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_destroy_database_structure();">Destroy</a>
		</div>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_manage_name_table">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Table name: </span><input class="kentta" id="db_manage_new_table_name" style="width:450px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_name_table();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_manage_name_column">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Column name: </span><input class="kentta" id="db_manage_new_column_name" style="width:420px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_name_column();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_manage_type">
	<div class="ui_bar"><p class="tit">Change type</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Column type: </span>
		<select id="manage_type_column_type">
			<option value="-1">Type</option>
			<option value="TEXT">TEXT</option>
			<option value="INT">INT</option>
			<option value="DATE">DATE</option>
			<option value="DOUBLE">DOUBLE</option>
		</select>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_column_type();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_destroy_table">
	<div class="ui_bar"><p class="tit">Destroy table</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	Are you sure?
	<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller_destroy_table();">Destroy table</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_destroy_column">
	<div class="ui_bar"><p class="tit">Destroy column</p>
	<div style="clear:both"></div></div>
	<div class="inds">
	Are you sure?
	<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller_destroy_column();">Destroy column</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_db_add_column">
	<div class="ui_bar"><p class="tit">Add column</p>
	<div style="clear:both"></div></div>
	<div class="inds">
			<span>Column name:</span>
			<input id="add_column_column_name" style="width:25%" type="text" />
			<select id="add_column_column_type">
			<option value="-1">Type</option>
			<option value="TEXT">TEXT</option>
			<option value="INT">INT</option>
			<option value="DATE">DATE</option>
			<option value="DOUBLE">DOUBLE</option>
			</select>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_add_column();" class="nappi6">Add</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	<!--- -->
	<!--- -->
	<!--- -->
	
	<div class="pimennys_child" id="pimennys_layout_properties">
	<div class="ui_bar"><p class="tit">Layout properties</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();" class="nappi6">Save</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Empty</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_newlayout">
	<div class="ui_bar"><p class="tit">New layout</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Layout name: </span><input class="kentta" id="layout_new_layout_name" style="width:420px;" type="text"/>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_new_layout();" class="nappi6">Create layout</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_newtab">
	<div class="ui_bar"><p class="tit">New tab</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab name: </span><input class="kentta" id="layout_new_tab_name" style="width:300px;" type="text"/>
		<span>Tab type: </span>
			<select id="layout_new_tab_type">
				<option value="-1">Type</option>
				<option value="0">Search</option>
				<option value="1">Records</option>
				<option value="2">Maintenance</option>
			</select>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_new_tab();" class="nappi6">Create tab</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage">
	<div class="ui_bar"><p class="tit">Manage layouts</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div style="width:70%;float:left">
			<select id="layout_names_select" style="padding:5px;width:100%; height:300px;" size="100"> </select>
		</div>
		<div style="width:30%;float:left;padding:5px;text-align:center">
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_new_tab_structure();">New tab</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="tablejoins_init();">Relationships</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_change_name_tablayout_structure();">Change name</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_change_tab_type_structure();">Change type</a>
			<a href="#" style="width:90%;margin-top:5px;" class="nappi6" onclick="controller_destroy_tablayout_structure();">Destroy</a>
		</div>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_name_layout">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Layout name: </span><input class="kentta" id="layout_manage_new_layout_name" style="width:450px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_name_layout();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_name_tab">
	<div class="ui_bar"><p class="tit">Change name</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab name: </span><input class="kentta" id="layout_manage_new_tab_name" style="width:420px;" type="text"/>
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_name_tab();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_manage_change_type">
	<div class="ui_bar"><p class="tit">Change type</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<span>Tab type: </span>
			<select id="layout_update_tab_type">
				<option value="-1">Type</option>
				<option value="0">Search</option>
				<option value="1">Records</option>
				<option value="2">Maintenance</option>
			</select>
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_change_tab_type();" class="nappi6">Change</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	<div class="pimennys_child" id="pimennys_layout_destroy_layout">
	<div class="ui_bar"><p class="tit">Destroy layout</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		Are you sure?
		<hr/>
		<a href="#" style="" class="nappi6" onclick="ui_close_dialog();controller_destroy_layout();">Destroy layout</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
		<div style="clear:both"></div>
	</div>
	</div>
	
	
	<!--- -->
	<!--- -->
	<!--- -->
	
	
	<div class="pimennys_child" id="pimennys_layout_tablejoins">
	<div class="ui_bar"><p class="tit">Relationships</p>
	<div style="clear:both"></div></div>
	<div class="inds">
		<div id="db_structure">
			<div id="struct1" class="struct">
			</div>
			<div id="struct2" class="struct">
			</div>

		</div>	
		<div style="clear:both"></div>
		<hr/>
		<a href="#" style="" class="nappi6" onclick="">Show relations</a>
		<a href="#" style="float:right" class="nappi6" onclick="tablejoins_refresh();">Save</a>
		<a href="#" style="float:right" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
	
	
	<!--- -->
	<!--- -->
	<!--- -->
	
	
	<div class="pimennys_child" id="pimennys_new_user">
	<div class="ui_bar"><p class="tit">Destroy layout</p>
	<div style="clear:both"></div></div>
	<div class="inds">
			<p style="margin:5px;">Username:</p><input class="kentta" id="new_username" style="margin-left:20px;width:90%" type="text" />
            <p style="margin:5px;">Password:</p><input class="kentta" id="new_password1" style="margin-left:20px;width:90%" type="password" />
            <p style="margin:5px;">Password again:</p><input class="kentta" id="new_password2" style="margin-left:20px;width:90%" type="password" />
		<hr/>
		<a href="#" style="" onclick="ui_close_dialog();controller_new_user();" class="nappi6">Create user</a>
		<a href="#" onclick="ui_close_dialog();" class="nappi6">Close</a><br/>
	</div>
	</div>
	
	
</div>




</body>
<script src="js/editor_objects/eo_image.js"></script>
<script src="js/editor_objects/eo_text.js"></script>
<script src="js/editor_objects/eo_div.js"></script>
<script src="js/editor_objects/eo_object.js"></script>


<script src="js/mouse.js"></script>
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="js/jquery_ui.js"></script>
<script src="js/ui.js"></script>
<script src="js/globals.js"></script>
<script src="js/ajaxgetpost.js"></script>
<script src="js/editor.js"></script>
<script src="js/tab.js"></script>
<script src="js/layout.js"></script>
<script src="js/database.js"></script>
<script src="js/controller.js"></script>
<script src="js/divline.js"></script>
<script src="js/tbljoin.js"></script>
<script src="js/tablejoins.js"></script>
<script src="js/main.js"></script>
</html> 
