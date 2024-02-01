import React, { useState, useEffect } from 'react';
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import { Container, DividerLine, Logo, DivButton, Div } from './style' 
import TypeScheduler from '../TypeScheduler';
import TypeCorresponce from '../TypeCorrespondence';

function Settings() {

  return (
    <Container>
      <NavbarPriority/>
      <Div>
       <TypeScheduler/>
       <TypeCorresponce/>
      </Div>
    </Container>
  );
}

export default Settings;