import { Link } from 'react-router-dom';

export default function Navigation(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/controlled-form">React Hook Form</Link>
        </li>
      </ul>
    </nav>
  );
}
