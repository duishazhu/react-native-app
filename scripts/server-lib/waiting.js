module.exports = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>打包中请等待</title>
  </head>
  <body>
    <h3>打包中，请稍后...</h3>
    <p>自动刷新倒计时<span id="reload">5</span></p>
    <p style="color:#aaa;">注：自动刷新将会在打包结束后停止，如未执行对应的 npm run dev (seller|admin)，您将白等...</p>
    <script>
      var showTime = document.getElementById('reload');
      var time = 5;
      var timer = setInterval(function() {
        time -= 0.05;
        if (time <= 0) {
          clearInterval(timer);
          window.location.reload();
          return;
        }
        showTime.innerHTML = time.toFixed(2);
      }, 50);
    </script>
  </body>
</html>`;
