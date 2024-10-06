import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import ColorPicker from './components/ColorPicker';
import CustomCursor from './components/Custom Cursor/Customcursor.jsx';
const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const changeTheme = (color) => {
    const newTheme = {...theme, primary: color};
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CustomCursor />
        <Navbar />
        <Body>
          <HeroSection />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
          <Footer />
          <ColorPicker onChange={changeTheme} />
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;
