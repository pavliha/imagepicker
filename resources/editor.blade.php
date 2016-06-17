@extends("main")
@section("head")
    <link rel="stylesheet" href="/styles/main.css"/>
    {{--TODO get rid of camanjs--}}
    <script async src="/bower_components/caman/dist/caman.min.js"></script>
@endsection
@section("body")

    <section id="app">{{--react entry point--}}</section>



@endsection

@section("js")
    <script src="/js/react.js"></script>
    <script async src="/js/main.js"></script>
@endsection