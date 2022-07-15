import NotificationButton from '../NotificationButton';
import './styles.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import { Sale } from '../../models/sale';

type FormDates = {
  minDate: Date,
  maxDate: Date
}


function SalesCard() {
  
  useEffect(() => {
    axios.get(`${BASE_URL}/sales`)
        .then(response => {
            setSales(response.data.content);
        });
  }, []);

  const minDateInitialValue = new Date(new Date().setDate(new Date().getDate() - 365));

  const [dates,setDates] = useState<FormDates>({minDate: minDateInitialValue , maxDate: new Date() })

  const [sales, setSales] = useState<Sale[]>([])
    
  
    return (
      <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={dates.minDate}
            onChange={(date: Date) => {setDates({...dates, minDate: date})}}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
              selected={dates.maxDate}
              onChange={(date: Date) => {setDates({...dates, maxDate: date})}}
              className="dsmeta-form-control"
              dateFormat="dd/MM/yyyy"
            />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => {
                              return (
                                  <tr key={sale.id}>
                                      <td className="show992">{sale.id}</td>
                                      <td className="show576">{new Date(sale.date).toLocaleDateString('pt-Br')}</td>
                                      <td>{sale.sellerName}</td>
                                      <td className="show992">{sale.visited}</td>
                                      <td className="show992">{sale.deals}</td>
                                      <td>R$ {sale.amount.toFixed(2)}</td>
                                      <td>
                                          <div className="dsmeta-red-btn-container">
                                              <NotificationButton />
                                          </div>
                                      </td>
                                  </tr>
                              )
                          })}
          </tbody>

        </table>
      </div>

    </div>
    )
  }
  
  export default SalesCard
  