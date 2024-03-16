import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './homestyle.css';
import Navbar from '../layout/Navbar';
import { Bar } from 'react-chartjs-2';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    company: '',
    domain: '',
  });

  const [companies, setCompanies] = useState([]);
  const [domains, setDomains] = useState([]);
  const [placementPercentage, setPlacementPercentage] = useState(0);

  const years = Array.from({ length: 14 }, (_, index) => (new Date().getFullYear() - 13) + index).reverse();


  const loadUsers = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8080/users', { params: filters });
      setUsers(result.data);

      // Calculate placement percentage
      const placementCount = result.data.filter(user => user.status === "placed").length;
      const totalUsers = result.data.length;
      const percentage = (placementCount / totalUsers) * 100;
      setPlacementPercentage(percentage.toFixed(2)); // Round to two decimal places
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }, [filters]);

  const loadCompanies = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8080/companies');
      setCompanies(result.data);
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  }, []);

  const loadDomains = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8080/domains');
      setDomains(result.data);
    } catch (error) {
      console.error('Error loading domains:', error);
    }
  }, []);

  const [placedStudents, setPlacedStudents] = useState([]);

  const loadPlacedStudents = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8080/placedStudents', { params: filters });
      setPlacedStudents(result.data);
    } catch (error) {
      console.error('Error loading placed students:', error);
    }
  }, [filters]);

  useEffect(() => {
    loadUsers();
    loadCompanies();
    loadDomains();
    loadPlacedStudents();
  }, [loadUsers, loadCompanies, loadDomains, loadPlacedStudents]);

  const [placementData, setPlacementData] = useState({
    labels: ['Placed', 'Not Placed'],
    datasets: [
      {
        label: 'Placement Statistics',
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: '#1E88E5',
        borderWidth: 1,
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        hoverBorderColor: '#1E88E5',
        data: [0, 0],
      },
    ],
  });

  useEffect(() => {
    // Update placement data when users change
    const placedCount = users.filter((user) => user.status === 'placed').length;
    const notPlacedCount = users.filter((user) => user.status !== 'placed').length;

    setPlacementData({
      ...placementData,
      datasets: [
        {
          ...placementData.datasets[0],
          data: [placedCount, notPlacedCount],
        },
      ],
    });
  }, [users]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Placement Statistics',
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column',
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: [
          { label: 'Placed', y: placementData.datasets[0].data[0] }, // Placed count
          { label: 'Not Placed', y: placementData.datasets[0].data[1] }, // Not placed count
        ],
      },
    ],
    colorSet: 'customColorSet', // Define your own color set
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Set background color
    toolTip: {
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      fontSize: 14,
    },
    axisX: {
      labelFontColor: '#000000',
      tickColor: '#000000',
    },
    axisY: {
      labelFontColor: '#000000',
      tickColor: '#000000',
    },
    width: 400, // Set the width
    height: 300,
  };
  

  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
  };

  return (
    <div className='Homepage'>
      <Navbar></Navbar>
      <div className='container'>
        <div className='filter-section'>
          <div className='form-group'>
            <label htmlFor='yearFilter' className='form-label'>
              Year:
            </label>
            <select
              className='form-control'
              id='yearFilter'
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value=''>All</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='companyFilter' className='form-label'>
              Company:
            </label>
            <select
              className='form-control'
              id='companyFilter'
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            >
              <option value=''>All</option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='domainFilter' className='form-label'>
              Domain:
            </label>
            <select
              className='form-control'
              id='domainFilter'
              value={filters.domain}
              onChange={(e) => handleFilterChange('domain', e.target.value)}
            >
              <option value=''>All</option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='placement-percentage'>
          <p>Placement Percentage: {placementPercentage}%</p>
        </div>
        <div className='chart-container'>
        </div>

        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>SNo</th>
              <th scope='col'>name</th>
              <th scope='col'>email</th>
              <th scope='col'>status</th>
              <th scope='col'>year</th>
              <th scope='col'>domain</th>
              <th scope='col'>company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.year}</td>
                <td>{user.domain}</td>
                <td>{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filters.company && (
          <div>
            <h2>Alumni of {filters.company}</h2>
            <table className='table border shadow'>
              <thead>
                <tr>
                  <th scope='col'>SNo</th>
                  <th scope='col'>name</th>
                  <th scope='col'>email</th>
                  <th scope='col'>status</th>
                  <th scope='col'>year</th>
                  <th scope='col'>domain</th>
                  <th scope='col'>company</th>
                </tr>
              </thead>
              <tbody>
                {placedStudents
                  .filter((student) => student.company === filters.company && student.year !== 2023)
                  .map((student, index) => (
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.status}</td>
                      <td>{student.year}</td>
                      <td>{student.domain}</td>
                      <td>{student.company}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='chart-container' style={{ marginLeft: '60vh', display: 'flex' }}>
      <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
				/* containerProps={{ width: '100%', height: '300px' }} */
			/>
      </div>
      </div>
    </div>
  );
}