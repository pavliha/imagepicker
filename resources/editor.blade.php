@extends("layouts.main")
@section("head")
    <link rel="stylesheet" href="/styles/main.css"/>
@endsection
@section("body")
    <section id="app"></section>
    <script src="https://fb.me/react-15.1.0.min.js"></script>
    <script src="https://fb.me/react-dom-15.1.0.min.js"></script>
    <script src="/bower_components/jquery/dist/jqueryAjax.js"></script>
    <script async src="/bower_components/jq-ajax-progress/src/jq-ajax-progress.min.js"></script>
    <script async src="/bower_components/caman/dist/caman.min.js"></script>
    <script src="/js/main.js"></script>
@endsection