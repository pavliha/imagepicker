@extends("layouts.main")

@section('head')
    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css">
    <link rel="stylesheet" href="/styles/main.css"/>
@endsection
@section("body")
    <header class="banner">
        <div>
        <h1 class="banner_h">Image Filters Online</h1>
            <h3 class="banner_subh">Лучшая замена тяжёлым и непонятным редакторам</h3>
        </div>
    </header>
    <section class="laptop center">
        <img src="/images/laptop2.png">

    </section>
    <section class="center">
        <br>N
        <br>
        <br>
        <a  href="/editor" class="waves-effect waves-light btn-large">Открыть редактор</a>
    </section>


    <footer class="Footer">
        <div class="Footer-left">
            <p>Image filters &copy; 2016</p>
        </div>
    </footer>
    <script src="/preload.js"></script>
@endsection

