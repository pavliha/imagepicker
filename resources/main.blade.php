<!DOCTYPE html>
<html lang="ru">
<head>

  <link rel="manifest" href="manifest.json">

  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="description"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="msapplication-tap-highlight" content="no"/>
  <meta name="mobile-web-app-capable" content="yes"/>
  <meta name="application-name" content="Image Filters"/>
  <meta name="theme-color" content="#009db5"/>
  <meta charset="UTF-8">

  <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png"/>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
  <link rel="stylesheet" href="/styles/main.css"/>

  <title>Image Filters Online - быстрая обработка фото бесплатно</title>
  @yield("head")
</head>
<body>
@yield("body")
{{--remove for production--}}
<script src="http://cherry.dev:4014/livereload.js"></script>

<script src="https://code.jquery.com/jquery-3.0.0.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
<script src="/js/init.js"></script>
@yield("js")
</body>
</html>