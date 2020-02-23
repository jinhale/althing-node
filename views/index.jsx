const React = require('react');
const DefaultLayout = require('./layouts/default');

function getGoogleEventDate(event) {
  console.log('event: ', event);
  console.log(event.start.dateTime || event.start.date);
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
      console.log('date');
      listings[j++] = <h1 key={String(j)}>{date.toDateString()}</h1>;
    }

    listings [j++] = <Event event={events[i]} key={j} />;
  }

  return (<div>{listings}</div>);
}

function Event({ googleEvent, }) {
  return <div className="event">{googleEvent.description}</div>;
}

function Home({ googleEvents, }) {
  return (
    <DefaultLayout title='Althing Home'>
      <h1>
	Calendar of Events
      </h1>

      {googleEvents.map((googleEvent, key) => {
        return <Event key={String(key)} googleEvent={googleEvent} />;
    })}
    </DefaultLayout>);
}

module.exports = Home;
