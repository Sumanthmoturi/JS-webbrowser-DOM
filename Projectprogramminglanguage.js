//Egg Language Project

// everything in the language would be an expression even ">" which are operators in js
// Each expression in egg would be an object.
// this would contain a type property, which would describe the type of the expresssion
// type: "value" means strings(literal values)
// type: "word" means identifiers name (variables)
// type: "apply" represent applications which includes 1.an operator and 2.args property.
// operator: {type: "word", value: ">"} // refers to the expression being applied., which in this case is >
// args: [{type: "word", value: "a"},{type: "value", value: 5}] // refers to the array of argument expressions. // means a = 5,
// a is word(variable) and 5 is value (number)





//1.Parsing expression function-This function is responsible for recognizing the different components of an Egg program (strings, numbers, words) and creating the appropriate expression object.
function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
      expr = {type: "value", value: match[1]};
    }
    // Match and parse a number
    else if (match = /^\d+\b/.exec(program)) {
      expr = {type: "value", value: Number(match[0])};
    }
    // Match and parse a word (identifier)
    else if (match = /^[^\s(),#"]+/.exec(program)) {
      expr = {type: "word", name: match[0]};
    }
    // If no valid expression is found, throw a syntax error
    else {
      throw new SyntaxError("Unexpected syntax: " + program);
    }
    return parseApply(expr, program.slice(match[0].length));
  }
  
  function skipSpace(string) {        //This utility function removes leading whitespace from the program string.
    let first = string.search(/\S/);
    if (first == -1) return "";
    // Return the string after removing leading whitespace
    return string.slice(first);
  }
  
  function parseApply(expr, program) {    //If the expression is a function application (identified by the presence of (), this function parses the operator (function) and its arguments.
    // Skip any leading whitespace
    program = skipSpace(program);
    if (program[0] != "(") {
      return {expr: expr, rest: program};
    }
  
    // Otherwise, this is a function application
    program = skipSpace(program.slice(1));  // Skip '('
    expr = {type: "apply", operator: expr, args: []};  // Create an "apply" expression
    
    // Loop to parse each argument
    while (program[0] != ")") {
      let arg = parseExpression(program);  // Parse the argument
      expr.args.push(arg.expr);            // Add it to the arguments list
      program = skipSpace(arg.rest);       // Update the program string
      
      // If a comma separates the arguments, skip it
      if (program[0] == ",") {
        program = skipSpace(program.slice(1));
      }
      // If the next character isn't ')' or ',', throw an error
      else if (program[0] != ")") {
        throw new SyntaxError("Expected ',' or ')'");
      }
    }
  
    // Recursively check if there's another application after this one
    return parseApply(expr, program.slice(1));  // Skip ')'
  }
  
  function parse(program) {
    // Start parsing the input program
    let {expr, rest} = parseExpression(program);
    
    // After parsing, there should be no leftover text, throw error if there is
    if (skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }
    
    // Return the final parsed expression (syntax tree)
    return expr;
  }
  console.log(parse("+(a, 10)"));
  // output: {type: "apply",
  //    operator: {type: "word", name: "+"},
  //    args: [{type: "word", name: "a"},
  //           {type: "value", value: 10}]}




//2.Evaluating the program=Evaluator-it runs program by taking syntax tree and aa scope and processes it to return a result.
function evaluate(expr, scope) {
    // If the expression is a literal value, return the value
    if (expr.type == "value") {
      return expr.value;
    } 
    // If the expression is a variable, look it up in the scope
    else if (expr.type == "word") {
      if (expr.name in scope) {
        return scope[expr.name];
      } else {
        throw new ReferenceError(`Undefined binding: ${expr.name}`);
      }
    } 
    // If the expression is a function or application
    else if (expr.type == "apply") {
      let {operator, args} = expr;
      // If the operator is a special form, handle it specially
      if (operator.type == "word" && operator.name in specialForms) {
        return specialForms[operator.name](expr.args, scope);
      } 
      // Otherwise, evaluate the operator and call it as a function
      else {
        let op = evaluate(operator, scope);  // Evaluate the operator
        if (typeof op == "function") {
          return op(...args.map(arg => evaluate(arg, scope)));  // Call the function with evaluated arguments
        } else {
          throw new TypeError("Applying a non-function.");
        }
      }
    }
  }





//3.Special Forms object
//if
/*it takes three arguments: a condition, a value if the condition is true, and a value if it’s false.
It only evaluates either the second or third argument, depending on whether the condition is true or false. */
specialForms.if = (args, scope) => {
    if (args.length != 3) {
      throw new SyntaxError("Wrong number of args to if");
    } else if (evaluate(args[0], scope) !== false) {
      return evaluate(args[1], scope);
    } else {
      return evaluate(args[2], scope);
    }
  };

//while
/* while loops while the condition is true, repeatedly evaluating the second argument.
It stops when the condition becomes false, and returns false since there's no specific value to return.  */
specialForms.while = (args, scope) => {
    if (args.length != 2) {
      throw new SyntaxError("Wrong number of args to while");
    }
    while (evaluate(args[0], scope) !== false) {
      evaluate(args[1], scope);
    }
    return false;
  };

//do-do executes multiple expressions in sequence and returns the value of the last one
specialForms.do = (args, scope) => {
    let value = false;
    for (let arg of args) {
      value = evaluate(arg, scope);
    }
    return value;
  };

//define
/* define creates a new variable (binding) in the current scope. It expects a name (word) and a value to assign to that name.
It returns the value assigned. */
specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != "word") {
      throw new SyntaxError("Incorrect use of define");
    }
    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
  };
  





//4.Declaring the Environment-Global scope
const topScope = Object.create(null);
topScope.true = true;
topScope.false = false;
//Now we can access above global scope by evaluating a program in egg whenever 
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));    //output:false
//Instead of writing each operator as a function, we use a loop to define several arithmetic and comparison operators 
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
    topScope[op] = Function("a, b", `return a ${op} b;`);
  }
//To output values in Egg, the print function is added to the global scope
  topScope.print = value => {
    console.log(value);
    return value;
  };
//The run function takes an Egg program parses it into a syntax tree, and evaluates it within a fresh scope.
function run(program) {
    return evaluate(parse(program), Object.create(topScope));
  }




//5.Function example in egg program
run(`
    do(define(plusOne, fun(a, +(a, 1))),
       print(plusOne(10)))
    `);    //output:11




//6.Egg also supports recursive functions
run(`
    do(define(pow, fun(base, exp,
         if(==(exp, 0),
            1,
            *(base, pow(base, -(exp, 1)))))),
       print(pow(2, 10)))
    `);



//7.Exercises
topScope.array = (...values) => {
    return values;
  };
  
  topScope.length = (array) => {
    return array.length;
  };
  
  topScope.element = (array, n) => {
    return array[n];
  };
  run(`
    do(define(sum, fun(array,
         do(define(i, 0),
            define(sum, 0),
            while(<(i, length(array)),
              do(define(sum, +(sum, element(array, i))),
                 define(i, +(i, 1)))),
            sum))),
       print(sum(array(1, 2, 3))))
    `);
    
    
