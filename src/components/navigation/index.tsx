import { NavLink } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Main</NavLink>
        </li>
        <li>
          <NavLink to="/uncontrolled-form">Uncontrolled Form</NavLink>
        </li>
        <li>
          <NavLink to="/controlled-form">React Hook Form</NavLink>
        </li>
      </ul>
    </nav>
  );
}
