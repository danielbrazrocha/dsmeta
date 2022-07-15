import axios from 'axios';
import image from '../../img/notification-icon.svg'
import { BASE_URL } from '../../utils/request';
import './styles.css'

type Props = {
  saleId: number;
}

function handleClick(id: number) {
  try{
    axios(`${BASE_URL}/sales/${id}/notification`)
    .then(response => {
        console.log("SMS Enviado com sucesso");
    });
  } catch {
    console.log("SMS não pode ser enviado");
  }
  
}

function NotificationButton( {saleId} : Props) {

    return (
        <div className="dsmeta-red-btn" onClick={() => handleClick(saleId)}>
            <img src={image} alt="Notificar" />
      </div>
    )
  }
  
  export default NotificationButton
  