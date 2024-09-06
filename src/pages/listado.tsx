import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Figure from 'react-bootstrap/Figure';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Pokemon } from "../models/Pokemon.m";
import { getPokemons } from "../services/pokemonService";
import { Col, Form, Row } from "react-bootstrap";

const Listado = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const obtenerPokemones = async () => {
      try {
        const allPokemons = await getPokemons();
        setPokemons(allPokemons);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    };

    obtenerPokemones();
  }, []); 

  const filtrarPokemon =pokemons?.slice(0,151).filter((pokemon)=>{
    return pokemon.name.toLowerCase().match(query.toLowerCase());
  } )

  return (
    <>
      <Row className="ms-3 mt-2 mb-3">
        <h1>Listado de Pokémon</h1>
      </Row>

      <header>
        <Row className="ms-2 mb-3">
          <Col className="col-4">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Control 
                value={query}
                placeholder="Buscar pokemon..."
                onChange={(event) =>setQuery(event.target.value.trim())}
                type="text" 
                />
            </Form.Group>
          </Col>
        </Row>

      </header>

      <div className="content-wrapper ms-2 me-2">
        <div className="content">
          <div className="row gap-3">
            {filtrarPokemon.slice(0, 151).map((pokemon) => (
              <Card key={pokemon.id} className="mx-auto" style={{ width: '18rem' }}>
                <Card.Header className="text-center">
                  <b>Tipo:</b> {pokemon.type.join(", ")}
                </Card.Header>
                <Card.Img width="80" height="100" className="d-block mx-auto w-50" variant="top" src={pokemon.imglarge} />
                <Card.Body>
                  <Card.Title className="text-center">{pokemon.id} - {pokemon.name}</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/833/833472.png "
                      />
                      <b> Puntos de vida: </b>{pokemon.hp}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/3522/3522092.png "
                      />
                      <b> Ataque: </b>{pokemon.attack}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/929/929429.png "
                      />
                      <b> Defensa: </b>{pokemon.defense}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png "
                      />
                      <b>Ataque especial: </b>{pokemon.sp_atk}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/1671/1671062.png "
                      />
                      <b> Defensa especial: </b>{pokemon.sp_def}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Figure.Image
                        width={16}
                        height={16}
                        src="https://cdn-icons-png.flaticon.com/512/8853/8853763.png "
                      />
                      <b> Velocidad: </b>{pokemon.speed}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Listado;
