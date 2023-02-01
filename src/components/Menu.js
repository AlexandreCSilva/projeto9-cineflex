import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu () {
    let navigate = useNavigate();
    const location = useLocation();

    const returnPage = () => {
        navigate(-1);
    }; 

    return (
        <Upper>
            {location.pathname === '/' ? (<></>) : (
                <ion-icon name="arrow-back-outline" onClick={returnPage}></ion-icon>
            )}
            CINEFLEX
        </Upper>
    );
}

const Upper = styled.div`
    width: 100vw;
    height: 67px;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 34px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    z-index: 2;

    ion-icon {
        position: fixed;
        left: 10px;
    }
`;