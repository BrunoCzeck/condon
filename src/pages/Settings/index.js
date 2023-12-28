import React, { useState, useEffect } from 'react';
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import { Container, DividerLine, Logo, DivButton } from './style' 
import TypeScheduler from '../TypeScheduler';


function Settings() {

  return (
    <Container>
      <NavbarPriority/>
      <TypeScheduler/>
    </Container>
  );
}

export default Settings;
