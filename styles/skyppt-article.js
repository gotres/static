  $(function() {
    $('span.down').click(function(){
      var $down = $('span.down');
      var $img = $('<img>').addClass('scene-qrcode').attr({
        src: qrcode, width: 300, height: 300
      });
      var timer;
      layer.alert($img.prop('outerHTML'), {
        btnAlign: 'c',
        area: ['420px', '430px'],
        skin: 'qrcode-dialog',
        title: '请使用微信扫码下载',
        btn: ['我已扫码并确认'],
        success: function(layero, index) {
          $down.animate({opacity: 0});
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(function() {
            var $btn = layero.find('.layui-layer-btn a');
            $btn.css('visibility', 'visible').animate({opacity: 1});
          }, 3000);
        },
        cancel: function(index, layero) {
          $down.animate({opacity: 1});
        },
        yes: function(index, layero) {
          var sendData = {action: 'checkSceneQrcode', data: scene};
          $.getJSON(window.location.href, sendData, function(res) {
            if (res.errcode) {
              return layer.msg(res.errmsg || '操作失败');
            }
            if (res.data) {
              layer.title('操作成功', index);
              var $btn = layero.find('.layui-layer-btn a');
              var $target = layero.find('.layui-layer-content');
              $btn.animate({opacity: 0});
              $target.html(res.data);
            }
          });
        }
      });
    });
  });
