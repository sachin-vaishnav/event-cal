import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './App.css'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);

  useEffect(() => {
    // Fetch events from the API or set default events
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Fetch events from the API
    axios.post("https://four-seasons-be-e4f102fd0366.herokuapp.com/get-all-visits", {
      auth_code: "Secured"
    })
    .then((res) => {
      const eventData = res?.data;
      console.log("API events:", eventData);

      // Format the response data into FullCalendar events
      const formattedEvents = eventData
        .filter(event => event.patient_name !== null && event.status !== null)
        .map(event => ({
          title: `${event.patient_name} - ${event.status}`,
          start: event.date
        }));

      setEvents(formattedEvents);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  };
  const handleSelect = (arg) => {
    // Save the selected date range
    setSelectedRange(arg);
    // Show a dialog or form to add an event with the selected date range
    const eventTitle = prompt('Enter event title:');
    if (eventTitle) {
      // Create the event object
      const newEvent = {
        title: eventTitle,
        start: arg.start,
        end: arg.end
      };
      // Update the events state with the new event
      setEvents(prevEvents => [...prevEvents, newEvent]);
      // Send the new event data to your backend API
      // Example: axios.post('your-backend-api-url', newEvent);
    }
  };
  

  const renderEventContent = (eventInfo) => {
    let backgroundColor = '';
    if (eventInfo.event.title.includes("Upcoming")) {
      backgroundColor = 'grey';
    } else if (eventInfo.event.title.includes("Completed")) {
      backgroundColor = 'rgba(90, 149, 90, 0.7)';
    } else {
      backgroundColor = 'rgba(255, 0, 0, 0.6)';
    }

    return (
      <div style={{ backgroundColor: backgroundColor, padding: '10px', borderRadius: '5px', border: "none", fontWeight: 'bold' }}>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  return (
    <div className="App">
      <div style={{ padding: "3% 20px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          events={events}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayMaxEventRows={2}
          height={"90vh"}
          selectable={true}
          select={handleSelect} // Callback when date selection is made
        />
      </div>
    </div>
  );
}

export default App;
