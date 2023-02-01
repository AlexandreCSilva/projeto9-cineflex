import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export default function Sucess ({ object }) {
    const navigate = useNavigate();
    
    function backHome () {
        navigate('/');
    }
    
    return (
        <>
            <Title>
                Pedido feito
                com sucesso!
            </Title>

            <Content>
                <Info>
                    <h1>Filme e sessão</h1>
                    <p>{object.title}</p>
                    <p>{object.weekday} - {object.hour}</p>
                </Info>
                
                <Info>
                    <h1>Ingressos</h1>
                    {object.seats.map(seat => {
                        return <p>Assento {seat}</p>;
                    })}
                </Info>

                <Info>
                    <h1>Compradores(as)</h1>
                    {object.compradores.map(comprador => {
                        return (
                            <>
                                <p>Nome: {comprador.name}</p>
                                <p>cpf: {comprador.cpf}</p>
                            </>
                        );
                    })}
                </Info>
            </Content>

            <Button>
                <button onClick={backHome}>Voltar pra Home</button>
            </Button>
            
        </>
    );
};

const Title = styled.div`
    margin-top: 67px;
    height: 110px;
    font-family: 'Roboto';
    color: #247A6B;
    font-weight: 700;
    font-size: 22px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    margin-left: 10%;

    h1 {
        font-family: 'Roboto';
        font-size: 22px;
        font-weight: 700;
        color: #293845;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    p {
        font-family: 'Roboto';
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 4px;
    }
`;

const Info = styled.div`
    margin-bottom: 30px;
`;

const Button = styled.div`
    margin-top: 100px;
    margin-bottom: 167px;

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
        
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;