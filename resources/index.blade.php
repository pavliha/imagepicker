<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Disable tap highlight on IE -->
    <meta name="msapplication-tap-highlight" content="no">

    <!-- Web Application Manifest -->
    <link rel="manifest" href="manifest.json">

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="Web Starter Kit">
    <link rel="icon" sizes="192x192" href="images/touch/chrome-touch-icon-192x192.png">

    <meta name="theme-color" content="#2F3BA2">

    <title>Image Picker</title>
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>

<header class="header">
    <img class="header_img" src="images/landscape.jpg">
</header>

<section class="section_source-image" >
    <div class="block_source-image flexbox-container" id="ImageLoading">

        {{--<img class="source-image" src="/images/photo.jpg">--}}
    </div>

</section>

<section class="section_handled-image" id="Thumbnails">


</section>
<footer>

</footer>



{{--//////***** SCRIPTS *****///////--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js"></script>
<script src="/bower_components/jq-ajax-progress/src/jq-ajax-progress.js"></script>
<script src="/js/main.js"></script>


</body>
</html>