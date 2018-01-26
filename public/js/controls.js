$('#pc-color-tool').on('change', function() {
    Draw.ctx.strokeStyle = $(this).val();
//    Draw.socket.emit('colorChange', {
//	color: $(this).val()
//    });
});

$('#pc-pen-tool').on('change', function() {
   Draw.ctx.lineWidth = $(this).val(); 
//   Draw.socket.emit('sizeChange', {
//       size: $(this).val()
//   });
});

$(function() {
    $('#pc-color-tool').val('#555555');
    $('#pc-pen-tool').val('5').change();
});
