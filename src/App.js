import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';
import Loading from './Shared/Loading/Loading';



function App() {
  return (
    <div>



      <RouterProvider router={router} fallbackElement={<Loading></Loading>}>

      </RouterProvider>

      <Toaster></Toaster>


    </div>
  );
}

export default App;
