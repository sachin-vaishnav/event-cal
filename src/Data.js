import React from 'react'
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
const Data = () => {
    let { id } = useParams();
    const [data, setData] = useState([])
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.post(`https://fs-be-prod-482a21101d6d.herokuapp.com/get-all-visits/${id}`, {
      auth_code: "Secured"
    })
      .then((res) => {
        const eventData = res?.data;
     
        const formattedEvents = eventData
  .filter(event => event.patient_name !== null && event.status !== null)
  .map(event => ({
    title: `${event.patient_name} - ${event.status}`,
    start: event.date
  }));
        // console.log("formattedEvents",formattedEvents)
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
 


useEffect(()=>{
console.log("id",id)
},[])

  const [bg, setBg] = useState()
  function renderEventContent(eventInfo) {
  
    let con = eventInfo.event.title.split()
 
    let backgroundColor = '';
    if (con[0].includes("Upcoming")) {
      backgroundColor = 'Grey';
    } else if (con[0].includes("Completed")) {
      backgroundColor = 'rgba(90, 149, 90, 0.7)';
    }
    else {
      backgroundColor = 'rgba(255, 0, 0, 0.6)';

    }
    return (
      <div style={{ backgroundColor: backgroundColor, padding: '10px', borderRadius: '5px', border: "none", fontWeight: 'bold' }}>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  }

  return (
    <div> <div className="App">
    <div style={{ padding: "3% 20px" }}>

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        eventContent={renderEventContent}
        events={events}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
          
        }}
        dayMaxEventRows= {2}
        height={"90vh"}
      />
    </div>

  </div></div>
  )
}

export default Data