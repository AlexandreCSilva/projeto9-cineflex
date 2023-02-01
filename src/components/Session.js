import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Session ({ setMovieId }) {
    const { movieId } = useParams();
    const [days, setDays] = useState([]);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`);

        requisition.then(answer => {
            setDays(answer.data.days);
            setMovie(answer.data);
        });
	}, []);

    return (
        <>
            <Title>
                Selecione o horário
            </Title>

            {days.map(day => {
                return (
                    <Content>
                        <p>{day.weekday} - {day.date}</p>
                        {day.showtimes.map(time => {
                            return (
                                <Link to={'/assentos/'+time.id}>
                                    <button>{time.name}</button>
                                </Link>
                            );
                        })}
                    </Content>
                );
            })}

            <Bottom>
                <Posters>
                    <img src={movie.posterURL} alt=''></img>    
                </Posters>
                <p>{movie.title}</p>
            </Bottom>
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
    margin-left: 10%;

    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 34px;
    }

    button {
        width: 83px;
        height: 43px;
        background-color: #E8833A;
        border-radius: 3px;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 34px;
        margin-right: 10px;
        color: #FFFFFF;
        cursor: pointer;
        border-color: #E8833A;
        box-shadow: none;
    }
`;

const Bottom = styled.div`
    width: 100vw;
    height: 167px;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 34px;

    display: flex;
    align-items: center;

    position: fixed;
    bottom: 0;
    z-index: 2;

    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 20px;
        color: #293845;
        margin-left: 30px
    }
`;

const Posters = styled.div`
    float: left;
    background-color: #FFFFFF;
    margin-left: 20px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
        height: 120px;
        padding: 7px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;

        position: relative;
    }
`;