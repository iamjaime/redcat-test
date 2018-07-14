<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', config('app.name'))</title>

    <!-- Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600' rel='stylesheet' type='text/css'>
    {{--<link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css'>--}}
    <link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" href="/libs/ionicons/dist/css/ionicons.min.css" type="text/css">

    <!-- CSS -->
    <link rel="stylesheet" href="/libs/dropzone/dist/min/dropzone.min.css">
    <link rel="stylesheet" href="/libs/datatables.net-bs4/css/dataTables.bootstrap4.css">
    <link href="css/app.css" rel="stylesheet">

    <!-- Scripts -->
    @yield('scripts', '')

</head>
<body>

<div id="app" v-cloak>

    <!-- Begin Primary Content -->
    <main>
        @yield('content')
    </main>
    <!--End Primary Content-->
</div>

<!-- JavaScript -->
<script src="{{ mix('js/app.js') }}"></script>

<!-- build:js scripts/app.min.js -->

<!-- Bootstrap -->
<script src="/libs/popper.js/dist/umd/popper.min.js"></script>
<!-- core -->
<script src="/libs/pace-progress/pace.min.js"></script>
<script src="/libs/pjax/pjax.js"></script>

<script src="/libs/dropzone/dist/min/dropzone.min.js"></script>
<script src="/libs/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="/libs/datatables.net-bs4/js/dataTables.bootstrap4.js"></script>

<script src="/scripts/lazyload.config.js"></script>
<script src="/scripts/lazyload.js"></script>
<script src="/scripts/plugin.js"></script>
<script src="/scripts/nav.js"></script>
<script src="/scripts/scrollto.js"></script>
<script src="/scripts/toggleclass.js"></script>
<script src="/scripts/theme.js"></script>
<script src="/scripts/ajax.js"></script>
<script src="/scripts/app.js"></script>
<!-- endbuild -->

</body>
</html>