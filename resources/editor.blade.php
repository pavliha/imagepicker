@extends("layouts.main")
@section("head")
    <link rel="stylesheet" href="/styles/main.css"/>
@endsection
@section("body")
    <section id="app"></section>
    <script src="/bower_components/jquery/dist/jqueryAjax.js"></script>
    <script async src="/bower_components/jq-ajax-progress/src/jq-ajax-progress.min.js"></script>
    <script async src="/bower_components/caman/dist/caman.min.js"></script>
    <script src="/react.js"></script>
    <script src="/main.js"></script>
@endsection