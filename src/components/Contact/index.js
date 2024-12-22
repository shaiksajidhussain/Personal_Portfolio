import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import emailjs from '@emailjs/browser';

import { Snackbar, Alert } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS file


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`



const Contact = () => {

  //hooks
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');
  const form = useRef();
  const hasIncrementedRef = useRef(false);
  const [viewCount, setViewCount] = useState(() => {
    return parseInt(localStorage.getItem('contactViews') || '0');
  });

  const sendEmail = (e) => {
    e.preventDefault();

    // Form validation
    const email = form.current.from_email.value;
    const name = form.current.from_name.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    if (!email || !name || !subject || !message) {
      setAlertMessage('Please fill in all fields');
      setSeverity('error');
      setOpen(true);
      return;
    }

    emailjs
      .sendForm('service_m9m33cj', 'template_spp7619', form.current, {
        publicKey: 'aWex7xBMzUz0geUmJ',
      })
      .then(
        () => {
          setAlertMessage('Email sent successfully!');
          setSeverity('success');
          setOpen(true);
          form.current.reset(); // Clear the form after successful submission
        },
        (error) => {
          setAlertMessage('Failed to send email. Please try again.');
          setSeverity('error');
          setOpen(true);
          console.log('FAILED...', error.text);
        },
      );
  };
  
  
  
  useEffect(() => {
    AOS.init();
    
    // Only increment if we haven't done so already
    if (!hasIncrementedRef.current) {
      const currentViews = parseInt(localStorage.getItem('contactViews') || '0');
      const newViews = currentViews + 1;
      localStorage.setItem('contactViews', newViews.toString());
      setViewCount(newViews);
      hasIncrementedRef.current = true;
    }
  }, []);
  




  return (
<>
<div id="contact">

</div>


    <div data-aos="zoom-in-up">

<Container data-aos="zoom-in-left" data-aos-duration="1500"  >
      <Wrapper>
        <Title>Contact</Title>
        <small style={{ color: '#858584' }}>Page Views: {viewCount}</small>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={sendEmail}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" type="email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
    </div>
</>
  )
}

export default Contact