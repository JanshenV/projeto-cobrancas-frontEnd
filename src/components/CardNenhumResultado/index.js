import "./styles.css";
import nenhumResultado from "../../assets/components/CardNehumResultado/nenhumResultado.svg";

export default function CardNenhumResultado() {
    return (
        <div className='container-card_nenhum-resultado'>
            <img src={nenhumResultado} alt='Nenhum resultado encontrado' />
        </div>
    )
}