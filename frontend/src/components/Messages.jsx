import Alert from "react-bootstrap/Alert";

const Messages = () => {
  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>John Doe: Hey, nice to see you</Alert.Heading>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel nam
          totam enim, quis debitis asperiores aspernatur eaque beatae adipisci
          ducimus eligendi earum vitae modi repellendus quam, eum commodi
          laudantium suscipit..
        </p>
        <hr />
        <p className="mb-0">Today at 9:20 AM</p>
      </Alert>
      <br />
      <Alert variant="success">
        <Alert.Heading>Jan Doe: No, it's nice to see you!</Alert.Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          nesciunt veritatis voluptatem fugiat. Eum voluptates provident
          nostrum, illo consectetur quidem accusamus assumenda blanditiis
          pariatur accusantium necessitatibus aliquid voluptatum esse officiis?.
        </p>
        <hr />
        <p className="mb-0">Today at 9:30 AM</p>
      </Alert>
    </div>
  );
};

export default Messages;
