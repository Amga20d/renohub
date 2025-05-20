import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BidCard = () => {
  return (
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, dolore ex neque ipsam consectetur excepturi nostrum laboriosam vel eveniet suscipit voluptatum ipsa, illo cumque, dolorem repellat consequatur omnis? Voluptates, temporibus!
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default BidCard;