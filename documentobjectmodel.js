//Document Object Model Chapter

//1.Document Object Model(DOM)-
/*->We can manipulate HTML and CSS using JS by using DOM
  ->DOM is the stuctured representaion of content in the document created by the browser
  ->We can imagine html dom as nested set of boxes.The DOM tree represent html document as nodes
  ->Each node is referred as an Object
  ->the document object is the entry point to DOM
  ->the document object provides access to DOM in javascript */


  //2.Accessing the DOM
/*The document object provides access to the DOM in JavaScript.
  document.documentElement refers to the <html> element.
  document.head refers to the <head> element.
  document.body refers to the <body> element.*/


//3.Node Types:
/*
  Element Nodes:Represent HTML tags (e.g.<body>, <h1>).These can have child nodes.
        code 1 or (Node.ELEMENT_NODE)
  Text Nodes:Contain the text inside HTML elements (e.g."My home page").These are leaf nodes.
        code 3  or (Node.TEXT_NODE)
  Comment Nodes:Represent comments in the HTML (e.g., <!-- Comment -->)
        code 8 or (Node.COMMENT_NODE).*/



//4.Node properties
/*
  1.parentNode: Points to the parent node of the current node. For the root node, this is null.
  2.childNodes: An array-like object containing all child nodes (including text and comment nodes).
  3.firstChild: Points to the first child node. null if there are no children.
  4.lastChild: Points to the last child node. null if there are no children.
  5.previousSibling: Points to the node immediately before the current node with the same parent. null if the node is the first child.
  6.nextSibling: Points to the node immediately after the current node with the same parent. null if the node is the last child.
  7.children: An array-like object containing only element nodes (type 1), excluding text and comment nodes.  */



//5.Recursive function- are useful for traversing and processing tree structures.
/*in html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DOM Example</title>
</head>
<body>
  <p>I also wrote a book! Read it here.</p>
  
  <script>
    function talksAbout(node, string) {
      if (node.nodeType == Node.ELEMENT_NODE) {
        for (let child of node.childNodes) {
          if (talksAbout(child, string)) {
            return true;
          }
        }
        return false;
      } else if (node.nodeType == Node.TEXT_NODE) {
        return node.nodeValue.indexOf(string) > -1;
      }
    }

    console.log(talksAbout(document.body, "book"));  // Should log true if "book" is found
  </script>
</body>
</html>
*/



//6.Finding Elements
/*
Finding elements by ID,tagname,className
document.getElementById("id");
document.getElementByTagName("tagname");
document.getElementByclassName("className");
*/


/*
7.Node methods:
                    remove(): Removes a node.
                    appendChild(): Adds a child node to the end.
                    insertBefore(newNode, referenceNode): Inserts a node before a reference node.
                    replaceChild(newNode, oldNode): Replaces an existing node with a new one.
*/



/*
8.Creating node

<p>The <img src="img/cat.png" alt="Cat"> in the
  <img src="img/hat.png" alt="Hat">.</p>
<p><button onclick="replaceImages()">Replace</button></p>
<script>
  function replaceImages() {
    let images = document.body.getElementsByTagName("img");
    for (let i = images.length - 1; i >= 0; i--) {
      let image = images[i];
      if (image.alt) {
        let text = document.createTextNode(image.alt);
        image.parentNode.replaceChild(text, image);
      }
    }
  }
</script>
*/



//9.live nodelists vs static nodelists- We use Array.from to convert live nodelist to static nodelist
let arrayish = {0: "one", 1: "two", length: 2};
let array = Array.from(arrayish);
console.log(array.map(s => s.toUpperCase()));


//Creating element- by using document.createElement(tagname) and appending child() 
let h1Element=document.createElement("h1");
h1Element.textContent="Hi";
let containerElement=document.document.getElementById("mycontainer");
containerElement.appendChild(h1Element);


/*10.Utility function elt-
          1.It creates an element node and treats its rest of arguments as  children to that node.
example:-
<blockquote id="quote">
  No book can ever be finished.
</blockquote>
<script>
  function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
      if (typeof child != "string") node.appendChild(child);
      else node.appendChild(document.createTextNode(child));
    }
    return node;
  }
  document.getElementById("quote").appendChild(
    elt("footer", "—",
        elt("strong", "Karl Popper"),
        ", preface to the second edition of ",
        elt("em", "The Open Society and Its Enemies"),
        ", 1950"));
</script> */



//11.Standard Attributes and Custom attributes
/*Standard attributes-
                    1.These are common attributes like href for links, src for images, and class for CSS classes.
                    2.You can access these attributes directly as properties of the element  */

                    let link = document.getElementById("myLink");
                    console.log(link.href); // Access href attribute directly
/*Custom attributes:- 
                    1.These are user-defined attributes that do not have corresponding properties in the DOM API. 
                    2.Attributes prefixed with data- are considered custom.
                    3.To read or set custom attributes, you use getAttribute and setAttribute methods.

<p data-classified="secret">The launch code is 00000000.</p>
<p data-classified="unclassified">I have two feet.</p>
<script>
  let paras = document.body.getElementsByTagName("p");
  for (let para of Array.from(paras)) {
    if (para.getAttribute("data-classified") == "secret") {
      para.remove(); // Removes the paragraph with secret classification
    }
  }
</script> */

/*Class Attribute- 
                  1.The class attribute is a bit special,the property used to access it is called className instead of class.
                  2.You can still use getAttribute and setAttribute methods to work with class if needed.                    

<p id="myPara" class="highlight">This is a paragraph.</p>
<script>
  let para = document.getElementById("myPara");

  // Accessing class attribute using className
  console.log(para.className); // Outputs: highlight

  // Accessing class attribute using getAttribute
  console.log(para.getAttribute("class")); // Outputs: highlight

  // Setting class attribute using setAttribute
  para.setAttribute("class", "newClass");
  console.log(para.className); // Outputs: newClass
</script>
*/



