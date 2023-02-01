import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Movies () {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
		const requisition = axios.get('https://mock-api.driven.com.br/api/v7/cineflex/movies');

        requisition.then(answer => {
            setMovies(answer.data);
        });
	}, []);

    return (
        <>
            <Title>
                Selecione o filme
            </Title>
            
            <Content>
                {movies.map( movie => {
                    return (
                        <Link to={'/sessoes/'+movie.id}>
                            <Posters>
                                <img src={movie.posterURL} alt=''></img>
                            </Posters>
                        </Link>
                    );
                })}
            </Content>
        </>
    );
}

const Title = styled.div`
    margin-top: 67px;
    height: 110px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    content: "";
    display: table;
    clear: both;
`;

const Posters = styled.div`
    float: left;
    width: 50%;
    height: 100%;
    margin-bottom: 10%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        margin: 0 10% 0 10%;
        width: 75%;
        max-height: 713px;
        padding: 15px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;

        position: relative;
    }
`;