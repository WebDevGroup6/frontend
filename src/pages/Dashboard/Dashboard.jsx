import React from 'react';
// Consider using a charting library like Recharts, Chart.js, or Nivo for dynamic charts
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'; // Example import

// Placeholder data - Replace with data fetched from your API
const statsData = {
  muestrasPendientes: { value: 143, change: 2.5, changeType: 'increase' },
  muestrasRealizadas: { value: 50, change: 2.5, changeType: 'neutral' }, // Assuming neutral based on color #454D7D
  pruebasRealizadas: { value: 21, change: 2.5, changeType: 'decrease' },
  resultadosCompletos: { value: 21, change: 2.5, changeType: 'decrease' }, // Assuming decrease based on color #F04D4D
};

const chartData = [
  { name: 'Muestras Pendientes', value: 143, color: '#FD981F' }, // Orange
  { name: 'Muestras Realizadas', value: 50, color: '#384CFF' },  // Blue
  { name: 'Pruebas Realizadas', value: 21, color: '#454D7D' },  // Dark Blue/Purple
  { name: 'Resultados Completos', value: 21, color: '#5DFF3D' }, // Green
];

const onlineEmployees = [
    { name: 'Ámbar Tiburcio', online: true },
    { name: 'Miguel Filpo', online: true },
    { name: 'Obal Nina', online: true },
    { name: 'Josmer Peralta', online: true },
    { name: 'Pedro Ramírez', online: false },
    // Add more employees as needed
];

// Helper to determine color based on change type
const getChangeColor = (type) => {
  switch (type) {
    case 'increase': return 'text-orange-600'; // As per Muestras Pendientes % color #F68631
    case 'decrease': return 'text-red-600';   // As per Pruebas Realizadas % color #F04D4D
    case 'neutral': return 'text-indigo-900'; // As per Muestras Realizadas % color #454D7D
    default: return 'text-gray-600';
  }
};

// Simple Donut Chart Component (SVG based - consider a library for advanced features)
const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let accumulatedPercentage = 0;

  return (
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path className="text-gray-200" strokeWidth="3.8" fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const strokeDasharray = `${percentage}, 100`;
        const strokeDashoffset = `-${accumulatedPercentage}`;
        accumulatedPercentage += percentage;
        return (
          <path
            key={index}
            stroke={item.color}
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        );
      })}
    </svg>
  );
};


function Dashboard() {
  // TODO: Fetch data using useEffect and useState

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50 min-h-screen font-['Roboto']"> {/* Main container */}

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Column: Stacked Cards */}
        <div className="flex flex-col gap-6 w-full lg:w-[494px] flex-shrink-0">

          {/* Card 1: Muestras Pendientes */}
          <div className="w-full p-5 bg-orange-100/15 rounded-lg shadow-md border border-gray-200"> {/* Approximated bg-opacity */}
            <div className="text-gray-600 text-base font-medium mb-3 leading-6 tracking-[0.15px]">Muestras Pendientes</div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-4xl font-normal leading-[44px]">{statsData.muestrasPendientes.value}</div>
              <div className={`${getChangeColor(statsData.muestrasPendientes.changeType)} text-sm font-medium leading-5 tracking-[0.1px]`}>
                {statsData.muestrasPendientes.change}%
              </div>
            </div>
            {/* Removed "Compared to last month" as it wasn't in the new design snippet */}
          </div>

          {/* Card 2: Muestras Realizadas */}
          <div className="w-full p-5 bg-blue-100/15 rounded-lg shadow-md border border-gray-200"> {/* Approximated bg-opacity */}
            <div className="text-gray-600 text-base font-medium mb-3 leading-6 tracking-[0.15px]">Muestras Realizadas</div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-4xl font-normal leading-[44px]">{statsData.muestrasRealizadas.value}</div>
              <div className={`${getChangeColor(statsData.muestrasRealizadas.changeType)} text-sm font-medium leading-5 tracking-[0.1px]`}>
                {statsData.muestrasRealizadas.change}%
              </div>
            </div>
          </div>

          {/* Card 3: Pruebas Realizadas */}
          <div className="w-full p-5 bg-indigo-100/20 rounded-lg shadow-md border border-gray-200"> {/* Approximated bg-opacity */}
            <div className="text-gray-600 text-base font-medium mb-3 leading-6 tracking-[0.15px]">Pruebas Realizadas</div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-4xl font-normal leading-[44px]">{statsData.pruebasRealizadas.value}</div>
              <div className={`${getChangeColor(statsData.pruebasRealizadas.changeType)} text-sm font-medium leading-5 tracking-[0.1px]`}>
                {statsData.pruebasRealizadas.change}%
              </div>
            </div>
          </div>

          {/* Card 4: Resultados Completos */}
          <div className="w-full p-5 bg-green-100/20 rounded-lg shadow-md border border-gray-200"> {/* Approximated bg-opacity */}
            <div className="text-gray-600 text-base font-medium mb-3 leading-6 tracking-[0.15px]">Resultados Completos</div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-900 text-4xl font-normal leading-[44px]">{statsData.resultadosCompletos.value}</div>
              <div className={`${getChangeColor(statsData.resultadosCompletos.changeType)} text-sm font-medium leading-5 tracking-[0.1px]`}>
                {statsData.resultadosCompletos.change}%
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Chart and Online Employees */}
        <div className="flex flex-col gap-6 w-full lg:flex-1">

          {/* Top Right: Chart Card */}
          <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-6">
            {/* Title - Using a more generic title */}
            <div className="text-gray-900 text-base font-medium leading-6 tracking-[0.15px] mb-6">Estadísticas Generales</div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-16 lg:gap-24"> {/* Increased gap */}
              {/* Chart */}
              <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                 {/* Replace with your interactive chart component if needed */}
                 <DonutChart data={chartData} />
              </div>
              {/* Legend */}
              <div className="flex flex-col justify-start items-start gap-4 md:gap-6"> {/* Increased gap */}
                {chartData.map((item, index) => (
                  <div key={index} className="w-64 flex justify-between items-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="text-gray-900 text-xs font-semibold leading-4 tracking-[0.5px]">{item.name}</div>
                    </div>
                    <div className="text-gray-600 text-xs font-medium leading-4 tracking-[0.5px]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Right: Empleados Online */}
          <div className="w-full p-6 bg-blue-50/60 rounded-lg shadow-md border border-gray-200"> {/* Approximated bg-opacity */}
            <div className="text-gray-900 text-base font-bold font-['Inter'] mb-5 leading-6 tracking-[0.15px]">Empleados</div> {/* Using Inter font as specified */}
            <div className="flex flex-col gap-5"> {/* Gap approx 19px */}
              {onlineEmployees.map((employee, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-gray-800 text-base font-medium font-['Inter'] leading-6">{employee.name}</div> {/* Using Inter font */}
                  <div className={`w-3 h-3 rounded-full ${employee.online ? 'bg-green-500' : 'bg-red-500'}`}></div> {/* Status indicator */}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Remove or adapt the original bottom row if it's no longer needed */}
      {/*
      <div className="flex gap-6">
         Original Bottom Row Content Here
      </div>
      */}

    </div>
  );
}

export default Dashboard;
