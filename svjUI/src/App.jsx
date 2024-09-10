import { Outlet } from 'react-router-dom';
import PadhamForm from './features/PadhamForm/PadhamForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Vedic Padham Calculator</h1>
          {/* Display the form */}
          <PadhamForm />

          {/* Render the result or other components through Outlet */}
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
