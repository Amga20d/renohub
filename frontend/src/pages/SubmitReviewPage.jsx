import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Card from "react-bootstrap/Card";

function SubmitReviewPage() {
  return (
    <div>
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
            fugit quidem doloremque repudiandae veritatis dolorem consectetur
            consequuntur tenetur ducimus! Quidem animi ipsam id consequatur.
            Possimus iusto fugit repellendus obcaecati excepturi.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <span>
        Contractor Review Rating <i class="fa-solid fa-star"></i>
      </span>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup aria-label="Third group">
          <Button>
            <i class="fa-solid fa-star"></i>
          </Button>
          <Button>
            <i class="fa-solid fa-star"></i>
          </Button>
          <Button>
            <i class="fa-solid fa-star"></i>
          </Button>
          <Button>
            <i class="fa-solid fa-star"></i>
          </Button>
          <Button>
            <i class="fa-solid fa-star"></i>
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <br />
      <FloatingLabel controlId="floatingTextarea2" label="Comments">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
        />
      </FloatingLabel>
    </div>
  );
}

export default SubmitReviewPage;
