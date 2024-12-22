import React, { useState, useEffect, useRef } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS file
import { projects as staticProjects } from '../../data/constants'; // Import static projects


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  const [dbProjects, setDbProjects] = useState([]); // Renamed to dbProjects
  const [loading, setLoading] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const hasIncrementedRef = useRef(false);

  const fetchViewCount = async () => {
    try {
      const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/views/projects');
      const data = await response.json();
      setViewCount(data.count);
    } catch (error) {
      console.error('Error fetching view count:', error);
    }
  };

  useEffect(() => {
    // Fetch both projects and view count when component mounts
    const initializePage = async () => {
      await Promise.all([
        fetchProjects(),
        fetchViewCount()
      ]);
    };

    initializePage();

    // Handle visibility change for view count
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && !hasIncrementedRef.current) {
        try {
          const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/views/projects', {
            method: 'POST'
          });
          const data = await response.json();
          setViewCount(data.count);
          hasIncrementedRef.current = true;
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/projects');
      const data = await response.json();
      setDbProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  // Combine projects with DB projects first
  const allProjects = [...dbProjects, ...staticProjects];

  return (
    <Container id="projects" data-aos="zoom-in-right" data-aos-duration="1500" >
      <Wrapper>
        <Title>Projects</Title>
        {/* <small style={{ color: '#858584' }}>Page Views: {viewCount}</small> */}
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
          {loading ? (
            <div>Loading projects...</div>
          ) : (
            allProjects
              .filter((project) => toggle === 'all' || project.category === toggle)
              .map((project) => (
                <ProjectCard key={project._id || project.id} project={project} setOpenModal={setOpenModal} />
              ))
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects