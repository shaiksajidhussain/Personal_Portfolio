import React, { useEffect, useRef, useState } from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/sanju1.jpg'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS file
import { gsap } from 'gsap';

const HeroSection = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        AOS.init();
        
        const handlePageView = async () => {
            try {
                // const response = await fetch('http://localhost:5000/api/views/hero', {
                const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/views/hero', {
                    method: 'POST'
                });
                const data = await response.json();
                setViewCount(data.count);
            } catch (error) {
                console.error('Error updating views:', error);
            }
        };

        handlePageView();

        // Add event listener for page visibility
        document.addEventListener('visibilitychange', handlePageView);
        
        // Mouse move effect code
        const container = containerRef.current;
        const image = imageRef.current;

        const handleMouseMove = (e) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(container, {
                rotationY: x * 10,
                rotationX: -y * 10,
                ease: 'power3.out',
                transformPerspective: 1000,
                transformOrigin: 'center'
            });

            gsap.to(image, {
                rotationY: x * 20,
                rotationX: -y * 20,
                ease: 'power3.out'
            });
        };

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('visibilitychange', handlePageView);
            container.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <HeroContainer ref={containerRef}>
            <HeroBg>
                <HeroBgAnimation />
            </HeroBg>
            <HeroInnerContainer>
                <HeroLeftContainer className="hero-text" data-aos="fade-right" data-aos-duration="1000">
                    <Title className="" data-text={`Hi, I am`}>Hi, I am <br /> {Bio.name}</Title>
                    <small style={{ color: '#858584' }}>Page Views: {viewCount}</small>
                    <TextLoop>
                        I am a
                        

                        <Span>
                            <Typewriter
                                options={{
                                    strings: Bio.roles,
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </Span>
                        
                    </TextLoop>
                    <SubTitle>{Bio.description}</SubTitle>
                    <ResumeButton href={Bio.resume} target='display' className="btn-glitch">Check Resume</ResumeButton>
                </HeroLeftContainer>

                <HeroRightContainer className="hero-image" data-aos="fade-left" data-aos-duration="1000">
                    <Img ref={imageRef} src={HeroImg} alt="hero-image" />
                </HeroRightContainer>
            </HeroInnerContainer>
        </HeroContainer>
    )
}

export default HeroSection