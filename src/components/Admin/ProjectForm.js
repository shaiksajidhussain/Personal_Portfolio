import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Error } from './styles';

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const FormContainer = styled(Form)`
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    margin: 0.5rem 0;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 4px;
    background-color: transparent;
    color: ${({ theme }) => theme.text_primary};
    min-height: 100px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 20px;
    cursor: pointer;
`;

const ProjectForm = ({ project, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tags: '',
        category: '',
        github: '',
        webapp: '',
        member: [{
            name: '',
            img: '',
            linkedin: '',
            github: ''
        }]
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                ...project,
                tags: project.tags.join(', '),
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMemberChange = (e, index) => {
        const { name, value } = e.target;
        const updatedMembers = [...formData.member];
        updatedMembers[index] = {
            ...updatedMembers[index],
            [name]: value
        };
        setFormData(prev => ({
            ...prev,
            member: updatedMembers
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim())
            };

            const url = project 
                ? `https://portfolio-backend-six-ruby.vercel.app/api/projects/${project._id}`
                : 'https://portfolio-backend-six-ruby.vercel.app/api/projects';

            const response = await fetch(url, {
                method: project ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(projectData)
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            onSubmit();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal>
            <FormContainer onSubmit={handleSubmit}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
                {error && <Error>{error}</Error>}
                
                <Input
                    name="title"
                    placeholder="Project Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                
                <TextArea
                    name="description"
                    placeholder="Project Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
                
                <Input
                    name="github"
                    placeholder="GitHub URL"
                    value={formData.github}
                    onChange={handleChange}
                />
                
                <Input
                    name="webapp"
                    placeholder="Web App URL"
                    value={formData.webapp}
                    onChange={handleChange}
                />

                <h3>Team Member</h3>
                <Input
                    name="name"
                    placeholder="Member Name"
                    value={formData.member[0].name}
                    onChange={(e) => handleMemberChange(e, 0)}
                />
                
                <Input
                    name="img"
                    placeholder="Member Image URL"
                    value={formData.member[0].img}
                    onChange={(e) => handleMemberChange(e, 0)}
                />
                
                <Input
                    name="linkedin"
                    placeholder="Member LinkedIn URL"
                    value={formData.member[0].linkedin}
                    onChange={(e) => handleMemberChange(e, 0)}
                />
                
                <Input
                    name="github"
                    placeholder="Member GitHub URL"
                    value={formData.member[0].github}
                    onChange={(e) => handleMemberChange(e, 0)}
                />

                <Button type="submit">
                    {project ? 'Update Project' : 'Add Project'}
                </Button>
            </FormContainer>
        </Modal>
    );
};

export default ProjectForm; 