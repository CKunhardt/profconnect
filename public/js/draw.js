var Draw;
Draw = {};

Draw.init = function() {
    Draw.canvas = document.createElement('canvas');
    Draw.canvas.width = $(window).width()*.75;
    Draw.canvas.height = $(window).height();
    document.getElementById('pc-canvas-parent').appendChild(Draw.canvas);
    Draw.ctx = Draw.canvas.getContext("2d");
    Draw.ctx.fillStyle = "solid";
    Draw.ctx.strokeStyle = $('#pc-color-tool').val();
    Draw.ctx.lineWidth = $('#pc-pen-tool').val();
    Draw.ctx.lineCap = "round";
    Draw.socket = socket;

    Draw.socket.on('draw', function(data) {
	return Draw.draw(data.x, data.y, data.type, data.color, data.size);
    });

    Draw.draw = function(x, y, type, color, size) {
	Draw.ctx.strokeStyle = color;
	Draw.ctx.lineWidth = size;

	if(type === "dragstart") {
	    Draw.ctx.beginPath();
	    return Draw.ctx.moveTo(x, y);
	} else if (type === "drag") {
	    Draw.ctx.lineTo(x, y);
	    return Draw.ctx.stroke();
	} else {
	    Draw.ctx.closePath();
	    Draw.ctx.lineWidth = $('#pc-pen-tool').val();
	    Draw.ctx.strokeStyle = $('#pc-color-tool').val();
	    return;
	}
    };
};

$('#pc-canvas-parent').on('drag dragstart dragend', 'canvas', function(e) {
    var offset, type, x, y;
    type = e.handleObj.type;
    offset = $('#pc-canvas-parent canvas').offset();
    e.offsetX = e.pageX - offset.left;
    e.offsetY = e.pageY - offset.top;
    x = e.offsetX;
    y = e.offsetY;
    color = $('#pc-color-tool').val();
    size = $('#pc-pen-tool').val();
    Draw.draw(x, y, type, color, size);
    Draw.socket.emit('drawClick', {
        x: x,
        y: y,
        type: type,
	color: color,
	size: size
    });
});

$(function() {
    return Draw.init();
});
