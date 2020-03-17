const React = require('react');

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link href="/public/css/althing.css" rel="stylesheet" />
      </head>
      <body>{props.children}</body>
    </html>);
}

module.exports = DefaultLayout;
