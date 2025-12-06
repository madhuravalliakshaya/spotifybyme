import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  // Load from localStorage on refresh
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEvents(parsed.map(ev => ({
        ...ev,
        start: new Date(ev.start),
        end: new Date(ev.end)
      })));
    }
  }, []);

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Add event
  function addEvent() {
    const newId = events.length ? events[events.length - 1].id + 1 : 1;

    setEvents([
      ...events,
      {
        id: newId,
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end)
      }
    ]);

    setNewEvent({ title: "", start: "", end: "" });
  }

  // Delete event
  function deleteEvent(eventToDelete) {
    setEvents(events.filter(ev => ev.id !== eventToDelete.id));
  }

  return (
    <div style={{ padding: 20 }}>
        <div style={{marginBottom:"10px"}}>
      <h3>Add Event</h3>

      <input
        type="text"
        placeholder="Event Title"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        style={{ marginRight: 10 ,border:"1px solid black",padding:"2px",backgroundColor:"#deeefeff"}}
      />

      <input
        type="datetime-local"
        value={newEvent.start}
        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
        style={{ marginRight: 10,backgroundColor:"#deeefeff",padding:"2px" ,border:"1px solid black",color:"grey"}}
      />

      <input
        type="datetime-local"
        value={newEvent.end}
        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
        style={{ marginRight: 10 ,backgroundColor:"#deeefeff",padding:"2px",border:"1px solid black",color:"grey"}}
      />

      <button onClick={addEvent} style={{backgroundColor:"#00e5ffff" ,padding:"2px",borderRadius:"2px",width:"20px"}}>+</button>
      </div>

      <div style={{height:600}}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          onSelectEvent={(event) => deleteEvent(event)} // click to delete
        />
      </div>
    </div>
  );
}
