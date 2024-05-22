
CMS using Web/API , backend with PHP and frontend with JavaScript

Interface, Model and API are separated from each other

Folders:

1- web_api/php2json

 this folder contains .php files that when called return a JSON (Data from database or result message) and the JSON is passed to JS or jQuery along with HTML & CSS to Create
and return UI. (it can be tested with postman)
Action pages like select, insert, update, delete
Classes for users sessions, authorization, authentication and encryption of user input and output

2- web_api/interface

this folder contains .php OOP classes with required methods and properties that handle requests and process data to pass it to Model or return a the JSON contains result 
from database or success/fail message.

3- web_api/model

this folder contains .php classes that runs a specified query which request from user or API and pass queries to
 class_database.php that connects to database and runs query.

