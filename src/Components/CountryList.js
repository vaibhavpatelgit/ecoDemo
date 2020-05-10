import React, { useEffect, useState } from "react";
import { firestore } from "firebase/app";
import { Table, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection("Country")
      .get()
      .then((data) => {
        const tempCountries = [];
        for (const doc of data.docs) {
          const country = doc.data();
          tempCountries.push({ ...country, id: doc.id });
        }
        setCountries(tempCountries);
        console.log(countries);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <Nav.Link as={Link} to="/Country">
        <Button variant="warning text-white">+ ADD Country</Button>
      </Nav.Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? "Loading....." : null}
          {countries.map(({ id, name }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>
                <Link to={`/Country/${id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default CountryList;
