import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'  // import the Calendar component and momentLocalizer function from the react-big-calendar package
import moment from 'moment'  // import the moment library
import 'react-big-calendar/lib/css/react-big-calendar.css'  // import the default styles for the Calendar component
import './MyCalendar.css';  // import custom styles for the MyCalendar component

const MyCalendar = () => {
  const [todos, setTodos] = useState([])  // initialize the todos state variable as an empty array
  const [events, setEvents] = useState([])  // initialize the events state variable as an empty array

  const localizer = momentLocalizer(moment)  // create a localizer for the Calendar component using the moment library

  const getEvents = (todos) => {  // define a helper function to convert todos to events
    if (!todos) return []  // if todos is undefined or null, return an empty array
    const events = todos
      .filter((todo) => !todo.completed)  // filter out completed todos
      .map((todo) => ({
        title: todo.description,  // set the title of the event to the description of the todo
        start: new Date(todo.due_date),  // set the start time of the event to the due_date of the todo
        end: new Date(todo.due_date),  // set the end time of the event to the due_date of the todo
      }))
    return events  // return the array of events
  }
  
  useEffect(() => {  // use the useEffect hook to fetch the todos from the server and update the todos state variable
    const fetchData = async () => {  // define an asynchronous function to fetch the todos
      try {
        const response = await fetch('http://localhost:5001/todos');  // send a GET request to the server to fetch the todos
        const data = await response.json();  // parse the JSON response into a JavaScript object
        setTodos(data);  // update the todos state variable with the fetched data
      } catch (error) {
        console.error(error);  // log any errors to the console
      }
    };
  
    fetchData();  // call the fetchData function when the component mounts or when the todos state variable changes
  }, []);
  
  useEffect(() => {  // use the useEffect hook to convert the todos to events and update the events state variable
    setEvents(getEvents(todos.filter((todo) => !todo.completed)))  // filter out completed todos, convert the remaining todos to events, and update the events state variable
  }, [todos])


  return (
   
    <div className="calendar-container"> {/* // render a div with a class of "calendar-container" */}
      <h2>Calendar</h2>    {/* // render a heading for the calendar */}
      <Calendar  // render the Calendar component
        localizer={localizer}  // pass the localizer to the Calendar component
        events={events}  // pass the events array to the Calendar component
        startAccessor="start"  // specify that the start time of each event is stored in the "start" property of each object in the events array
        endAccessor="end"  // specify that the end time of each event is stored in the "end" property of each object in the events array
        showMultiDayTimes={false}  // hide the times for multi-day events
        onSelectEvent={(event) => console.log(event.title)}  //Handle selection of a calendar event
        onSelectSlot={(slotInfo) => console.log(slotInfo.start)}// Handle selection of a calendar slot (empty space in the calendar)
      />
    </div>
  )
}

export default MyCalendar