
function AjaxGetPost(){

}

AjaxGetPost.prototype.ajaxPost=function(variable_arr, callback){
	$.post( "php/handle_post.php", variable_arr)
	.done(function( data ) {
		callback(data);
	});
}
