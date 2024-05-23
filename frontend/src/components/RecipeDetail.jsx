import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      });
      if (response.ok) {
        alert('Recipe updated successfully!');
        window.location.href = '/';
      } else {
        console.error('Failed to update recipe');
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipes/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Recipe deleted successfully!');
        window.location.href = '/';
      } else {
        console.error('Failed to delete recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Container>
      <h1>{recipe.name}</h1>
      <img src={recipe.image_url} alt={recipe.name} className="img-fluid" />
      <p><strong>Ingredients:</strong> {recipe.ingredients.map(ingredient => ingredient.name).join(', ')}</p>
      <p><strong>Quantities:</strong> {recipe.ingredients.map(ingredient => `${ingredient.quantity} ${ingredient.unit}`).join(', ')}</p>
      <p><strong>Steps:</strong> {recipe.steps.map(step => step.description).join(', ')}</p>
      <p><strong>Notes:</strong> {recipe.notes}</p>

      <Button variant="primary" onClick={() => setShowEdit(true)}>Edit</Button>
      <Button variant="danger" onClick={() => setShowDelete(true)}>Delete</Button>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this recipe?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecipeDetail;
