import React, { useState, useEffect, useRef } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS file


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  const [viewCount, setViewCount] = useState(0);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    AOS.init();
    
    const handlePageView = async () => {
      if (!hasIncrementedRef.current) {
        try {
          // const response = await fetch('http://localhost:5000/api/views/projects', {
          const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/views/projects', {
            method: 'POST'
          });
          const data = await response.json();
          setViewCount(data.count);
          hasIncrementedRef.current = true;
        } catch (error) {
          console.error('Error updating views:', error);
        }
      }
    };

    handlePageView();

    // Add event listener for page visibility
    document.addEventListener('visibilitychange', () => {
      if (!hasIncrementedRef.current) {
        handlePageView();
      }
    });
    
    return () => {
      document.removeEventListener('visibilitychange', handlePageView);
    };
  }, []);
  
  return (
    <Container id="projects" data-aos="zoom-in-right" data-aos-duration="1500" >
      <Wrapper>
        <Title>Projects</Title>
        <small style={{ color: '#858584' }}>Page Views: {viewCount}</small>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {toggle === 'all' ?
            <ToggleButton active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          
          {toggle === 'android app' ?
            <ToggleButton active value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
            :
            <ToggleButton value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
          }
          <Divider />
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton active value="web app" onClick={() => setToggle('Figma')}>FIgma</ToggleButton>
            :
            <ToggleButton value="web app" onClick={() => setToggle('Figma')}>Figma</ToggleButton>
          }
          <Divider />
          
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects