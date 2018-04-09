echo %~1
c:\wamp\bin\php\php5.5.12\php.exe -r "include 'load.php'; error_reporting(E_ALL ^ E_DEPRECATED ^ E_NOTICE); %~1 "

