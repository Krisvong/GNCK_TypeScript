# 1. GNCK PERN To Do App
<div class="force-word-wrap">
    This is the Milestone two project of all stars Casey, Kristen, Nick and Gregg for the NCSU Software Development Bootcamp.  The goal ofthis project was to demonstrate our knowledge and understanding of a fuulstack application from conception to deployment.  It is a culmination of all of our work in the software development course with a specific focus on building from scratch a React front end, an Express back end, connecting to a PostgreSQL database, and running in a Node environment. Our overarching goal was to build an API that relied on RESTful pricipals, keeping our code as DRY as possible, and to make an app that was functional and useful, and that looked good too. This project differed from our last in that it involved a group that allowed us begin to better understand what a real working environment in this field could be like.  We at once had to put aside any apprehension and learn very quickly to cooperate and help each other navigate the ins and outs of collaborative coding.  
</div>

##  2. Outline 
<div class="force-word-wrap">
    In order to organize our original thoughts, we started our planning with an outline.  It was not 100% complete, and it had some things that would change in the end, but it helped us to get going.

    Here is what our outline looked like:
</div>

### Pern to do List outline

1. Build server
2. Create folder to hold client and server
3. In server NPM init
4. NPM install express, PG, cors
5. Touch index.js
6. In index.js require express
7. Cont app = express()
8. app.listen(5000, () => {console.log(“server has started on port 5000)});
9. Start nodemon
10. Const cors = require(“cors”);
11. Create middleware (app.use(cors())
12. app.use(express.json());
13. Create postgres database and table
14. Create file called database.sql
15. Inside database.sql at the top CREATE DATABASE perntodo;
16. CREATE TABLE todo
17. Got to postgres shell  type psql -U postgres
18. Type your password
19. /l to view all Databases
20. Move inside the database for todo
21. Copy CREATE DATABASE command from database.sql and run in shell
22. /dt to view the table
23. Connect our Postgres database and server
24. Create a file called db.js
25. Inside db.js   const Pool = require(“pg”),Pool;
26. Below that const pool = new Poolmodule.exports = pool;
27. Go back to index.js    const pool = require(“./db”);
28. Routes create a todo
    -Get all todo
    -Get a todo
    -Update a todo
    -Delete a todo
29. Build routes with postgres queries
30. Start creating client side
31. New terminal  npx create-react-app define as client
32. Go into client
33. Get rid of test
34. Get rid of service worker
35. Get rid of logo
36. Go into index.js
37. Get rid of service worker stuff and comments
38. Go into app.js get rid of logo
39. In import react statement add { Fragment }
40. Under function App clean out and add return <fragment></fragment>
41. Make new folder called components
42. New file Input todo.js
43. New file Listtodos.js
44. New file Edittodo.js 
45. Open bootstrap website 
46. copy  bootstrap css link
47. Add bootstrap link to public .html file 
48. Get js model from bootstrap website
49. Place near the bottom body of public.html
50. Build input component
51. Npm start in client folder
52. Go into input component folder 
53. Import React from “react”
54. Const InputTodo = () => {
				-Return (
				-h1 Input todo h1
				-)
			    - }
55. Export default InputTodo;
56. Go to app.js 
57. Import InputTodo from “./components/InputTodo”
58. Inside fragment in function app put <InputTodo>
59. Add <div className=”container”>
60. Go back into InputTodo component folder 
61. Add {Fragment} to React import statement
62. Put <Fragment> in InputTodo function
63. Add h1 To do List h1  inside fragment in  function
64. Add className of “text-center and mt5
65. Under that create a form className=”d-flex mt 5”>
66. <form>  input type=”text” className=”form-control”
67. <button className=”btn btn-success”>Add<button>
68. Add React hooks { Fragment, useStste }
69. In the top of the function before return add const[description, setDescription] = useState (“”)
70. After input type=text className=formControl add value={description}
71. After that onChange={e => setDescription(e.taget.value)}
72. After the UseState of # 70  const onSubmitForm =async(e) => {
					-e.preventDefault();
    -Try{
    -const body = { description };
    -Const response = await  fetch(“http://localhost:5000/todos”, {
    -method: “POST”,
    -headers: {“Content-Type”: “application/json” },
    -body:  JSON.stringify(body)
    -});
    -} catch (err) {
    -console.error(err.message)
    -}
73.    Add onSubmit={onSubmitform} to form at d-flex
74. Build the ListTodo
75. Import React
76. Const ListTodos function
77. Export default
78. Go into index.js and import ListTodos from components
79. Add it to the index function
80. Add fragment to ListTodo
81. Get table tag from bootstrap and add it to ListTodos function
82. Add table class “table mt-5 text-center”
83. Make the displays for the table description, edit, delete
84. Add useEffect and useState to ListTodos
85. Write use effect function to hit get Todos
86. Map the data to the bootstrap table
87. Build the delete button  (button classname ‘btn btn-danger’>Delete</button)
88. Inside todos map add <tr> key={todo.todo_id}</tr> to get todo id
89. In delete  button add onClick ={() => deleteTodo(todo.todo_id)}
90. Back at the top of ListTodos create delete function
91. Build the edit todo component
92. Inside EditTodo import React from React
93. Make edit function
94. Get  modal button from bootstrap
95. Build button just like the the delete


## 3. Usage:
<div class="force-word-wrap">
We undertook to build an intuitive app that harkens back to the days of a paper to do list.  Add your todos and a due date and watch them populate to the integrated calander. Check off done items and they will be moved to a new list so you can reference your progress.  

</div>

## 4. About the Team
<div class="force-word-wrap">
Casey:

Hey I'm Casey. I have been a stay at home mom for a few years and now looking for a change of scenery! I enjoy technology and learning new skills as well as creating and fixing projects. I would love to pursue something with the car industry and software. Here's to a new journey!


Nick:

Nick has been working in IT for over 10 years. He is looking forward to making a career transition into software development, focusing on frontend specialties. When he's not learning new code, Nick enjoys playing guitar and chess, as well as working on projects outside.



Kristen:

Hi there! I am Kristen, a software developer. I am passionate about fitness, reading, and I love to learn about new technologies.



Gregg: 

Gregg has spent the last many years opening and developing a venerable local eatery/institution, but has now decided to try his hand at a different kind of development.  He likes to debate matters of great import with his adult sons, and is obsessed with electrified stringed instruments.

</div>

## 5. Tech

<div class="force-word-wrap">
The team made use of an Express App running React and a PostgreSQL database to keep track  of everything, all of which is running in a Node environment.  Upon deployment a user should see a seamless app.  

</div>