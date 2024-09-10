Javascript and browsers chapter

1.Network-computer networks have been used to connect computers, allowing them to share data.

2.Internet-the internet is a global network connecting computers all over the world.


3.Network protocols-Network protocols are set of rules that allows two devices communicate with  each other 
                1.HTTP(Hyper Text Transfer Protocol)  
                2.HTTPs(Hyper Text Transfer Protocol secure)  
                3.TCP(Transmission Control Protocol)  


4.TCP connections- 1.Listening and port-A server(computer) listens for incoming connections on specific ports (e.g:-port 25 for email).  
                   2.Client-Server model-A client (anothercomputer) connects to the server using the correct port. This creates a two-way communication channel.


5.Web
1.The World Wide Web (Web) is a system for accessing information via the internet.
2.The Web consists of linked web pages that form a network (or “web”) of information.
3.You access the Web using a browser, like Chrome or Firefox.  */


6.Accessing web pages
1.To make a machine accessible on the Web, it must use the HTTP protocol and listen on port 80.
2.Web pages are accessed using Uniform Resource Locators (URLs)
3.Components of url are 1.Protocol 2.Domainname of server 3.Path parameters and 4.Query parameters  


7.IP address and domain names
1.Every machine on the internet has a unique IP address (e.g., 149.210.142.219).
2.Domain names (e.g., eloquentjavascript.net) are easier to remember than IP addresses.
3.When you enter a URL into a browser, it first translates the domain name into an IP address.The browser then connects to the server at that address using HTTP.The server sends the requested web page back to the browser, which displays it.



8.HTML
1.It gives standard format for creating web pages
2.It gives the basic strucure of we page
3.An HTML document contains text,tags,describing things such as links, paragraphs,buttons and headings. 

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Marijn and this is my home page.</p>
    <p>I also wrote a book! Read it
      <a href="http://eloquentjavascript.net">here</a>.</p>
  </body>
</html>


9.HTML and JavaScript
1. You can write JavaScript directly in an HTML document using the <script>tag.
   <script>alert("hello!");</script>
2.For larger scripts, you can include an external JavaScript file with the src attribute.
   <script src="code/hello.js"></script>
3.You can use JavaScript in HTML attributes
   <button onclick="alert('Boom!');">DO NOT PRESS</button>
4.For modern JavaScript, you can use modules by type attribute to module in the <script> tag.
   <script type="module" src="script.js"></script>


10.Sandboxing
1.JavaScript runs in a restricted environment called a sandbox to prevent it from accessing or modifying your computer files.
2.It also ensures that web pages cannot perform dangerous actions or steal personal information.