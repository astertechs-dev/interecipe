import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RecipeCreate = () => {
  const [recipe, setRecipe] = useState({
    image_url: '',
    name: '',
    description: '',
    time: '',
    ingredients: [],
    steps: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      if (response.ok) {
        alert('Recipe created successfully!');
        window.location.href = '/';
      } else {
        console.error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image_url" value={recipe.image_url} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" name="name" value={recipe.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={recipe.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formTime">
          <Form.Label>Time (minutes)</Form.Label>
          <Form.Control type="number" name="time" value={recipe.time} onChange={handleChange} />
        </Form.Group>

        {/* Ingredients and Steps fields can be added here similarly */}

        <Button variant="primary" type="submit" className="w-100">Register</Button>
      </Form>
    </Container>
  );
};

export default RecipeCreate;
