import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import './App.css';
import './index.css';
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
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import Testimonials from './components/Testimonials';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%);
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%,30% 98%, 0 100%);
`

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  const changeTheme = (color) => {
    const newTheme = {...theme, primary: color};
    setTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={
            <Body>
              <CustomCursor />
              <Navbar />
              <HeroSection />
              <Wrapper>
                <Skills />
                <Experience />
              </Wrapper>
              <Projects openModal={openModal} setOpenModal={setOpenModal} />
              <Testimonials />
              <Wrapper>
                <Education />
                <Contact />
              </Wrapper>
              <Footer />
              <ColorPicker onChange={changeTheme} />
              {openModal.state &&
                <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
              }
            </Body>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
