import React from 'react';
import {Link} from "react-router-dom";

const WebHeader = () => {
  return (
    <div>
      <li>
        <Link to="/">Intake Dashboard</Link>
      </li>
      <li>
        <Link to="/">Intake Form</Link>
      </li>
      <li>
        <Link to="/">Calendly</Link>
      </li>
    </div>
  )
}

export default WebHeader