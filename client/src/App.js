import { Routes, Route } from 'react-router-dom'
import { Home, Login, RentalRoom, RentalHouse, RentalApartment, RentalMiniApartment, RentalServicedApartment, Homepage } from './containers/Public'
import { path } from './ultils/constant';

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={< Home />}>
          <Route path='*' element = {< Homepage />} />
          <Route path={path.LOGIN} element={<Login />}/>
          <Route path={path.PHONG_TRO} element = {< RentalRoom />} />
          <Route path={path.NHA_NGUYEN_CAN} element = {< RentalHouse />} />
          <Route path={path.CAN_HO_CHUNG_CU} element = {< RentalApartment />} />
          <Route path={path.CAN_HO_MINI} element = {< RentalMiniApartment />} />
          <Route path={path.CAN_HO_DICH_VU} element = {< RentalServicedApartment />} />
        
        </Route>
        

      </Routes>
    </div>
  );
}

export default App;
