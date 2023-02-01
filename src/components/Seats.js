import styled from 'styled-components';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';



export default function Seats ({ setObject }) {
    const { sessionId } = useParams();
    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState([]);
    const [session, setSession] = useState([]);
    const [hour, setHour] = useState([]);
    const [ids, setIds] = useState([]);
    const [selecteds, setSelecteds] = useState(new Array(50).fill(true));
    const [refresh, setRefresh] = useState(false);
    const [form, setForm] = React.useState({});
    const [message, setMessage] = React.useState({});
    const navigate = useNavigate();

    useEffect(() => {
		const requisition = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`);

        requisition.then(answer => {
            setSeats(answer.data.seats);
            setMovie(answer.data.movie);
            setSession(answer.data.day);
            setHour(answer.data.name);
        });
	}, []);
   
    useEffect(() => {
        let compradores = [];
        let i = 0;

        ids.map(id => {
            compradores = [...compradores, {
                    idAssento: id,
                    name: Object.values(form)[i],
                    cpf: Object.values(form)[i+1],
            }];

            i+=2;
        });

        setMessage({
            ids: ids,
            compradores: compradores,
        });

        let seatsNum = [];
        
        ids.map(id => {
            seatsNum = [...seatsNum ,id%50];
        });
        
        setObject({
            title:movie.title,
            weekday:session.weekday,
            hour:hour,
            seats: seatsNum,
            compradores: compradores,
        });
    }, [form]);

    function handleForm (e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function sendSeats () {
        axios.post(`https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`, message);

        navigate(`/sucesso/`);
	}

    return (
        <>
            <Title>
                Selecione o(s) assento(s)
            </Title>

            <Content refresh={refresh}>
                {seats.map(seat => {
                    return (
                        <>
                            {seat.isAvailable ? (
                                !selecteds[seat.name -1] ? (
                                    <Seat 
                                        able={seat.isAvailable}
                                        onClick={() => {
                                            let arr = selecteds;
                                            arr[seat.name -1] = !selecteds[seat.name -1];
                                            if (arr[seat.name -1] === false) {
                                                setIds([...ids, seat.id])
                                            } else {
                                                {window.confirm('Gostaria realmente de remover o assento e apagar os dados?') === true ? (
                                                    ids.map((id, index) => {
                                                        if (id === seat.id){
                                                            ids.splice(index, 1);
                                                        }
                                                    })
                                                ) : (arr[seat.name -1] = !selecteds[seat.name -1])}
                                            }
                                            setSelecteds(arr);
                                            setRefresh(!refresh);
                                        }}
                                        selected={selecteds[seat.name -1]} >
                                        <p>{seat.name <= 9 ? '0'+seat.name : seat.name}</p>
                                    </Seat>
                                ) : (
                                    <Seat 
                                        able={seat.isAvailable}
                                        onClick={() => {
                                            let arr = selecteds;
                                            arr[seat.name -1] = !selecteds[seat.name -1];
                                             if (arr[seat.name -1] === false) {
                                                setIds([...ids, seat.id])
                                            } else {
                                                {window.confirm('Gostaria realmente de remover o assento e apagar os dados?') === true ? (
                                                    ids.map((id, index) => {
                                                        if (id === seat.id){
                                                            ids.splice(index, 1);
                                                        }
                                                    })
                                                ) : (arr[seat.name -1] = !selecteds[seat.name -1])}
                                            }
                                            setSelecteds(arr);
                                            setRefresh(!refresh);
                                        }}
                                        selected={selecteds[seat.name -1]} >
                                        <p>{seat.name <= 9 ? '0'+seat.name : seat.name}</p>
                                    </Seat>
                                )
                            ) : (
                                    <Seat 
                                        able={seat.isAvailable}
                                        onClick={() => {
                                            alert('Esse assento não está disponível');
                                        }}
                                    >
                                        <p>{seat.name <= 9 ? '0'+seat.name : seat.name}</p>
                                    </Seat>
                            )}
                        </>
                    );
                })}
            </Content>
                
            <Options>
                <Option>
                    <Seat able={true} selected={false}></Seat>
                    <p>Selecionado</p>   
                </Option>
                <Option>
                    <Seat able={true} selected={true}></Seat>
                    <p>Disponível</p>   
                </Option>
                <Option>
                    <Seat able={false}></Seat>
                    <p>Indisponível</p>   
                </Option>
            </Options>
            
            <Form>
                <form onSubmit={sendSeats}> 
                    {ids.map(id => {
                        return (
                            <>
                                <p>Nome do comprador:</p>
                                <input type="name" name={'nome'+id} onChange={handleForm} value={form.name} placeholder='Digite seu nome...'/>
                                <p>CPF do comprador:</p>
                                <input type="text" name={'cpf'+id} onChange={handleForm} value={form.cpf} placeholder='Digite seu CPF...'/>
                            </>
                        );
                    })}
                    {ids.length === 0 ? <></> :(
                    <Button>
                        <button type="submit">Reservar assento(s)</button>
                    </Button>
                    ) }
                    
                    
                </form>
            </Form>
                
            <Bottom>
                <Posters>
                    <img src={movie.posterURL} alt=''></img>    
                </Posters>
                <Info>
                    <p>{movie.title}</p>
                    <p>{session.weekday} - {hour}</p>
                </Info>
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

const Info = styled.div`
    p {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 20px;
        color: #293845;
        margin-left: 30px;
        margin-bottom: 10px;
    }
`;

const Seat = styled.div`
    box-sizing: border-box;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    background-color: ${props => props.able ? (
        props.selected ?  '#C3CFD9' : '#8DD7CF'
    ) : '#FBE192'};
    margin-right: 2%;
    margin-bottom: 4%;
    border: 1px solid ${props => props.able ? (
        props.selected ?  '#808F9D' : '#1AAE9E'
    ) : '#F7C52B'};
    border-radius: 12px;

    display: flex;
    flex-direction: center;
    align-items: center;
    
    p {
        margin-left: 6px;
    }

    &:hover {
        filter: brightness(0.9);
    }
`;

const Content = styled.div`
    height: 250px;
    margin: 0 24px;
    
    display: flex;
    flex-wrap: wrap;
`;

const Options = styled.div`
    height: 100px;
    margin: 0 15%;

    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
        font-size: 14px;
    }
`;

const Form = styled.div`
    margin-left: 10%;
    
    p {
        margin-bottom: 5px;
    }

    input {
        width: 85%;
        height: 45px;
        border: 1px solid #D5D5D5;
        padding-left: 12px;
        margin-bottom: 10px;
    }

    ::placeholder {
        color: #D5D5D5;
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 20px;
    }

    
`;

const Button = styled.div`
    margin: 57px 10% 157px 0;
    
    display: flex;
    justify-content: center;

    button {
        width: 213px;
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