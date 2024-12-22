import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    38.73deg, 
    rgba(204, 0, 187, 0.15) 0%, 
    rgba(201, 32, 184, 0) 50%
  ), linear-gradient(
    141.27deg, 
    rgba(0, 70, 209, 0) 50%, 
    rgba(0, 70, 209, 0.15) 100%
  );
  width: 100%;
  padding: 50px 0;
  margin: 0 auto;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  padding: 40px 0;
  gap: 12px;
  margin: 0 auto;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 20px;
  }
`;

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

const TestimonialContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  margin: 30px auto;
  max-width: 1100px;
  padding: 0 20px;
`;

const TestimonialCard = styled.div`
  width: 330px;
  height: auto;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854CE6;
  box-shadow: rgba(133, 76, 230, 0.25) 0px 4px 24px;
  border-radius: 16px;
  padding: 26px 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(133, 76, 230, 0.5) 0px 4px 32px;
  }
`;

const TestimonialText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #854CE6;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const AuthorRole = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const testimonials = [
    {
        text: "Sajid's expertise in React and Node.js is exceptional. He helped us develop a complex web application that exceeded our expectations. His problem-solving skills and attention to detail are remarkable.",
        name: "Priya Sharma",
        role: "Tech Lead at TechCrunch India",
        image: "https://randomuser.me/api/portraits/women/11.jpg"
    },
    {
        text: "Working with Sajid was a great experience. His understanding of full-stack development and ability to deliver clean, efficient code made our project a success. Highly recommended!",
        name: "Rahul Verma",
        role: "Senior Developer at Infosys",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "Sajid is a talented developer who brings both technical expertise and creative solutions to the table. His work on our e-commerce platform was outstanding, delivering excellent results on time.",
        name: "Anita Desai",
        role: "Product Manager at Flipkart",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
];

const Testimonials = () => {
    return (
        <Container id="testimonials">
            <Wrapper>
                <Title>Testimonials</Title>
                <Desc>
                    What professionals and clients say about my work and collaboration.
                </Desc>
                <TestimonialContainer>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index}>
                            <TestimonialText>"{testimonial.text}"</TestimonialText>
                            <TestimonialAuthor>
                                <AuthorImage src={testimonial.image} alt={testimonial.name} />
                                <AuthorInfo>
                                    <AuthorName>{testimonial.name}</AuthorName>
                                    <AuthorRole>{testimonial.role}</AuthorRole>
                                </AuthorInfo>
                            </TestimonialAuthor>
                        </TestimonialCard>
                    ))}
                </TestimonialContainer>
            </Wrapper>
        </Container>
    );
};

export default Testimonials; 