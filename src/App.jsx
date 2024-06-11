import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing';
import Clothes from './Components/Clothes';
import Accessories from './Components/Accessories';
import Homedecor from './Components/Homedecor';
import Electronics from './Components/Electronics';
import Sports from './Components/Sports';
import Arts from './Components/Arts';
import Carts from './Components/Carts';
import Buy from './Components/Buy';
import Payment from './Components/Payment';

import { withAuthenticationRequired } from '@auth0/auth0-react';


const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/clothes" element={<ProtectedRoute component={Clothes} />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/decor" element={<Homedecor />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/payment" element={<Payment />} />
        
      </Routes>
    </BrowserRouter>
  );
}
