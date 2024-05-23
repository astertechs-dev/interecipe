import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-end mb-3">
          <Button href="/create" variant="primary">＋ Add Recipe</Button>
        </Col>
      </Row>
      <Row>
        {recipes.map((recipe, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card onClick={() => window.location.href = `/recipes/${recipe.id}`}>
              <Card.Img variant="top" src={recipe.image_url} />
              <Card.Body>
                <Card.Title>{recipe.name}</Card.Title>
                <Card.Text>
                  {recipe.description.slice(0, 50)}...
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">Time: {recipe.time} min</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
