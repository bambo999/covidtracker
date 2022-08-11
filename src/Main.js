import React, {useState, useEffect} from 'react';
import axios from 'axios';

import 'jquery/dist/jquery.min.js'; 
// Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';      

export default function Main() {

  const[covidData, setCovidData] = useState([]);

  useEffect (() => {
    axios.get('https://api.covid19api.com/summary')
    .then(res => {
      console.log(res.data);
      setCovidData(res.data.Countries);
    }).catch(err => {
      console.log(err);
    }) 

    $(document).ready(() =>{
      $('#mytable').DataTable();

    });
  }, []);

  const tableData = covidData.map(obj => {

    return (
      <tr >
        <td>{obj.Country}</td>
        <td>{obj.TotalConfirmed}</td>
        <td>{obj.TotalConfirmed - obj.TotalRecovered}</td>
        <td>{obj.TotalRecovered}</td>
        <td>{obj.TotalDeaths}</td>
      </tr>
    )
  }
  )

  return (
    <div>
        <h1 className='m-5' style={{backgroundColor: 'black', color:'white'}} >CovidStats</h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
            <table id='mytable' className="table table-bordered">
              <thead>
                <tr style={{backgroundColor: 'black', color:'white'}}>
                  <th>Country</th>
                  <th>Confirmed</th>
                  <th>Active </th>
                  <th>Deaths</th>
                  <th>Recovered</th>
                </tr>
              </thead>
              <tbody>

                {tableData}

              </tbody>
            </table>
        </div>
      </div>  
    </div>
  )
}

