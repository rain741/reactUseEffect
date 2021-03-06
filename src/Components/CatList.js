import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, InputGroup, Container } from "react-bootstrap";
function CatList() {
  let [cats, setCats] = useState([]);
  let [catsTemp, setCatsTemp] = useState([]);
  console.log(cats);
  useEffect(() => {
    console.log("perubahan");
    axios("https://api.thecatapi.com/v1/breeds").then((result) => {
      setCats(result.data);
      setCatsTemp(result.data);
    });
  }, []);

  let [input, setInput] = useState("");
  useEffect(() => {
    const filterCats = catsTemp.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setCats(filterCats);
    console.log(filterCats);
  }, [input]);
  const handleChangesInput = (event) => {
    setInput(event.target.value);
  };
  console.log(input);
  return (
    <div>
      <Container fluid='md'>
        <InputGroup className='mb-4 justify-content-md-center'>
          <input
            type='text'
            placeholder='Search Data...'
            name='input'
            value={input}
            onChange={handleChangesInput}
          />
        </InputGroup>
        <h2>List Cats</h2>

        <Row xs={1} md={4} className='g-4'>
          {cats.map((item, key) => (
            <Col>
              <Card style={{ width: "100%", height: "100%" }}>
                <Card.Img
                  variant='top'
                  key={key}
                  src={item.image?.url}
                  alt=''
                  style={{ width: "100%", height: "200px" }}
                />
                <br />
                <Card.Body>
                  <Card.Title style={{ textAlign: "center", color: "red" }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text style={{ textAlign: "left" }}>
                    <h5>{item.description}</h5>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
export default CatList;
