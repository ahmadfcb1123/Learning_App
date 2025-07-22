<!DOCTYPE html>
<html>
    <head>
        <script src="{{asset('js/app.js')}}"></script>
    </head>
    <body>
        <form action="/alert" method="post">
        @csrf
            <input name="message" type="text" placeholder="alert">
            <input type="submit" value="send">
        </form>
    </body>
</html>