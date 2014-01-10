
function table_join_create_line(ax,ay,bx,by,uid,a,b){
	
	ay=ay+$("#db_structure").scrollTop();
	by=by+$("#db_structure").scrollTop();
	
	if(ax==bx){
		ax+=((Math.random()*100)-50);
		bx+=((Math.random()*100)-50);
	}

    if (ax > bx) {
        bx = ax + bx;
        ax = bx - ax;
        bx = bx - ax;
        by = ay + by;
        ay = by - ay;
        by = by - ay;
    }

    var angle = Math.atan((ay - by) / (bx - ax));

    angle = (angle * 180 / Math.PI);
    angle = -angle;

    var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));

    var style = ""
	style += "cursor:pointer;left:" + (ax) + "px;"
	style += "top:" + (ay) + "px;"
    style += "width:" + length + "px;"
    style += "height:3px;"
    style += "background-color:rgb(200,200,200);"
    style += "position:absolute;"
    style += "transform:rotate(" + angle + "deg);"
    style += "-ms-transform:rotate(" + angle + "deg);"
    style += "transform-origin:0% 0%;"
    style += "-moz-transform:rotate(" + angle + "deg);"
    style += "-moz-transform-origin:0% 0%;"
    style += "-webkit-transform:rotate(" + angle + "deg);"
    style += "-webkit-transform-origin:0% 0%;"
    style += "-o-transform:rotate(" + angle + "deg);"
    style += "-o-transform-origin:0% 0%;"
    style += "-webkit-box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, .1);"
    style += "box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .1);"
    style += "z-index:10;"

	
    $("<div id='line"+uid+"' style='" + style + "'></div>").appendTo('#db_structure');
}