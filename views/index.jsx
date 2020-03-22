const React = require('react');
const DefaultLayout = require('./layouts/default');

function getGoogleEventDate(event) {
  return new Date(event.start.dateTime || event.start.date);
}

function testIsSameDay(a, b) {
  a = getGoogleEventDate(a).getDay;
  b = getGoogleEventDate(b).getDay;
  return a === b;
}

function Calendar({events, days, }) {
  if (!events || events.length) {
    return null;
  }

  let j = 0;
  const listings = [<h1 key={String(j++)}>{events[0].toDateString()}</h1>, <Event event={events[0]} key={j++} />];
  for (let i = 1; i < events.length; i++) {
    if (!testIsSameDay(events[i], events[i - 1])) {
      const date = getGoogleEventDate(events[i]);
      listings[j++] = <h1 key={String(j)}>{date.toDateString()}</h1>;
    }

    listings [j++] = <Event event={events[i]} key={j} />;
  }

  return (<div>{listings}</div>);
}

function Event({ googleEvent, }) {
  if (!googleEvent || !googleEvent.summary) {
    return null;
  }
  return (
    <li className="event">
      <a href={googleEvent.htmlLink} >{googleEvent.summary}</a>
    </li>);
}

function getDateTitle(previousEvent, currentEvent) {
  const currentEventDate = getGoogleEventDate(currentEvent);

  if (previousEvent) {
    const previousEventDate = getGoogleEventDate(previousEvent);
    if (previousEventDate.getDay() === currentEventDate.getDay()) {
      if (previousEventDate.getMonth() === currentEventDate.getMonth()) {
	if (previousEventDate.getFullYear() === currentEventDate.getFullYear()) {
	  return null;
	}
      }
    }
  }

  return <h2 className="date-title">{`${currentEventDate.toLocaleDateString()}`}</h2>;
}

function Home({ googleEvents, }) {
  return (
    <DefaultLayout title='Althing Home'>
      <h1>
	Calendar of Events
      </h1>

      <ul id="events-list">
	{googleEvents.map((googleEvent, key, allEvents) => {
          const dateTitle = getDateTitle(key > 0 ? allEvents[key - 1] : null, googleEvent);
	  return (
	    <div>
              {dateTitle}
              <Event key={String(key)} googleEvent={googleEvent} />
            </div>);
	})}
      </ul>
    </DefaultLayout>);
}

module.exports = Home;
