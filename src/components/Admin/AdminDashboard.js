import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import { 
    DashboardContainer, 
    ProjectList, 
    ProjectCard, 
    Button, 
    Header,
    Title 
} from './styles';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://portfolio-backend-six-ruby.vercel.app/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await fetch(`https://portfolio-backend-six-ruby.vercel.app/api/projects/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <DashboardContainer>
            <Header>
                <Title>Admin Dashboard</Title>
                <Button onClick={handleLogout}>Logout</Button>
            </Header>
            
            <Button onClick={() => {
                setEditingProject(null);
                setShowForm(true);
            }}>
                Add New Project
            </Button>

            {showForm && (
                <ProjectForm 
                    project={editingProject}
                    onClose={() => {
                        setShowForm(false);
                        setEditingProject(null);
                    }}
                    onSubmit={() => {
                        setShowForm(false);
                        setEditingProject(null);
                        fetchProjects();
                    }}
                />
            )}

            <ProjectList>
                {projects.map((project) => (
                    <ProjectCard key={project._id}>
                        <h3>{project.title}</h3>
                        <p>{project.description.substring(0, 100)}...</p>
                        <div>
                            <Button onClick={() => {
                                setEditingProject(project);
                                setShowForm(true);
                            }}>
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(project._id)}>
                                Delete
                            </Button>
                        </div>
                    </ProjectCard>
                ))}
            </ProjectList>
        </DashboardContainer>
    );
};

export default AdminDashboard; 