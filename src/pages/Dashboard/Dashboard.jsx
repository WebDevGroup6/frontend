import React from 'react';
// Consider importing icons from a library like Heroicons or using custom SVGs
// import { ArrowRightIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'; // Example import

function Dashboard() {
  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50 min-h-screen"> {/* Main container */}

      {/* Top Row */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6 items-start">

        {/* Left: Customer Satisfaction */}
        {/* Card 4: Customer Satisfaction Score */}
        <div data-layer="Frame 36469" className="w-full lg:flex-1 bg-white rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-200">
           <div className="p-6">
            <div data-layer="Description Top" className="text-gray-800 text-lg font-semibold font-['Roboto'] leading-normal tracking-tight mb-6">Customer Satisfaction Score</div>
            <div data-layer="Frame 36467" className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-16">
              {/* Placeholder for Chart - Replace with your actual chart component */}
              <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-gray-100 rounded-full">
                 {/* Example using SVG Donut Chart (basic) */}
                 <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path className="text-gray-200" strokeWidth="3.8" fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Segments (adjust stroke-dasharray and stroke-dashoffset based on data) */}
                    {/* Very Satisfied (Dark Blue ~40%) */}
                    <path className="text-indigo-700" strokeWidth="4" fill="none"
                        strokeDasharray="40, 100" // 40%
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                     {/* Satisfied (Yellow ~25%) */}
                    <path className="text-yellow-400" strokeWidth="4" fill="none"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-40" // Start after previous segment
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                     {/* Neutral (Light Pink ~15%) */}
                     <path className="text-pink-200" strokeWidth="4" fill="none"
                        strokeDasharray="15, 100"
                        strokeDashoffset="-65" // 40 + 25
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                     {/* Unsatisfied (Light Blue ~10%) */}
                     <path className="text-sky-400" strokeWidth="4" fill="none"
                        strokeDasharray="10, 100"
                        strokeDashoffset="-80" // 40 + 25 + 15
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                     {/* User Name (Pink ~10%) */}
                     <path className="text-pink-400" strokeWidth="4" fill="none"
                        strokeDasharray="10, 100"
                        strokeDashoffset="-90" // 40 + 25 + 15 + 10
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                 </svg>
                 {/* <span className="text-gray-500 text-sm">Chart Placeholder</span> */}
              </div>
              {/* Legend */}
              <div data-layer="Frame 36466" className="flex flex-col justify-start items-start gap-4">
                {/* List Item 1 */}
                <div data-layer="Frame 34434" className="w-64 flex justify-between items-center">
                  <div data-layer="List Item With" className="flex justify-center items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-700 rounded-full"></div> {/* Color indicator */}
                    <div data-layer="Text" className="Text text-gray-700 text-sm font-medium font-['Roboto']">Very Satisfied</div>
                  </div>
                  <div data-layer="Frame 36440" className="flex justify-start items-center gap-3">
                    <div data-layer="Text" className="Text text-gray-600 text-sm font-medium font-['Roboto']">24</div>
                    <div data-layer="Frame 36439" className="px-1.5 py-0.5 bg-orange-100 rounded-md flex justify-start items-center gap-1">
                      {/* Up Arrow */}
                      <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                      <div data-layer="Text" className="Text text-center text-orange-700 text-xs font-medium font-['Roboto']">8.2%</div>
                    </div>
                  </div>
                </div>
                {/* List Item 2 */}
                <div data-layer="Frame 34435" className="w-64 flex justify-between items-center">
                   <div data-layer="List Item With" className="flex justify-center items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div> {/* Color indicator */}
                    <div data-layer="Text" className="Text text-gray-700 text-sm font-medium font-['Roboto']">Satisfied</div>
                  </div>
                  <div data-layer="Frame 36440" className="flex justify-start items-center gap-3">
                    <div data-layer="Text" className="Text text-gray-600 text-sm font-medium font-['Roboto']">34</div>
                     <div data-layer="Frame 36440" className="px-1.5 py-0.5 bg-orange-100 rounded-md flex justify-start items-center gap-1">
                       <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                      <div data-layer="Text" className="Text text-center text-orange-700 text-xs font-medium font-['Roboto']">8.2%</div>
                    </div>
                  </div>
                </div>
                 {/* List Item 3 (Neutral) */}
                <div data-layer="Frame 34436" className="w-64 flex justify-between items-center">
                  <div data-layer="List Item With" className="flex justify-center items-center gap-2">
                    <div className="w-3 h-3 bg-pink-200 rounded-full"></div> {/* Color indicator */}
                    <div data-layer="Text" className="Text text-gray-700 text-sm font-medium font-['Roboto']">Neutral</div>
                  </div>
                  <div data-layer="Frame 36440" className="flex justify-start items-center gap-3">
                    <div data-layer="Text" className="Text text-gray-600 text-sm font-medium font-['Roboto']">52</div>
                    <div data-layer="Frame 36440" className="px-1.5 py-0.5 bg-orange-100 rounded-md flex justify-start items-center gap-1">
                      <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                      <div data-layer="Text" className="Text text-center text-orange-700 text-xs font-medium font-['Roboto']">8.2%</div>
                    </div>
                  </div>
                </div>
                {/* List Item 4 (Unsatisfied) */}
                <div data-layer="Frame 34437" className="w-64 flex justify-between items-center">
                  <div data-layer="List Item With" className="flex justify-center items-center gap-2">
                    <div className="w-3 h-3 bg-sky-400 rounded-full"></div> {/* Color indicator */}
                    <div data-layer="Text" className="Text text-gray-700 text-sm font-medium font-['Roboto']">Unsatisfied</div>
                  </div>
                  <div data-layer="Frame 36440" className="flex justify-start items-center gap-3">
                    <div data-layer="Text" className="Text text-gray-600 text-sm font-medium font-['Roboto']">20</div>
                    <div data-layer="Frame 36440" className="px-1.5 py-0.5 bg-red-100 rounded-md flex justify-start items-center gap-1">
                      {/* Down Arrow */}
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                      <div data-layer="Text" className="Text text-center text-red-700 text-xs font-medium font-['Roboto']">8.2%</div>
                    </div>
                  </div>
                </div>
                 {/* List Item 5 (User Name / Very Unsatisfied?) */}
                <div data-layer="Frame 34438" className="w-64 flex justify-between items-center">
                  <div data-layer="List Item With" className="flex justify-center items-center gap-2">
                     <div className="w-3 h-3 bg-pink-400 rounded-full"></div> {/* Color indicator */}
                    <div data-layer="Text" className="Text text-gray-700 text-sm font-medium font-['Roboto']">User Name</div> {/* Or Very Unsatisfied */}
                  </div>
                  <div data-layer="Frame 36440" className="flex justify-start items-center gap-3">
                    <div data-layer="Text" className="Text text-gray-600 text-sm font-medium font-['Roboto']">12</div>
                    <div data-layer="Frame 36440" className="px-1.5 py-0.5 bg-orange-100 rounded-md flex justify-start items-center gap-1">
                       <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                      <div data-layer="Text" className="Text text-center text-orange-700 text-xs font-medium font-['Roboto']">8.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Stacked Cards */}
        <div className="flex flex-col gap-6 w-full lg:w-80 flex-shrink-0"> {/* Adjusted width */}

          {/* Card 1: Total Closed Calls */}
          <div data-layer="Frame 36510" className="w-full p-5 bg-white rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-200">
            <div data-layer="Total Closed Calls" className="text-gray-600 text-base font-medium font-['Roboto'] mb-3">Total Closed Calls</div>
            <div className="flex justify-between items-start mb-1">
              <div className="flex flex-col gap-1">
                <div data-layer="143" className="text-gray-900 text-3xl font-semibold font-['Roboto']">143</div>
                <div data-layer="2.5%" className="text-orange-600 text-sm font-medium font-['Roboto']">2.5%</div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                {/* Right Arrow Icon */}
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
            <div data-layer="Compared to Last month" className="text-gray-500 text-sm font-normal font-['Roboto']">Compared to Last month</div>
          </div>

          {/* Card 3: Job Requests */}
          <div data-layer="Frame 36508" className="w-full p-5 bg-white rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-200">
            <div data-layer="Job Requests" className="text-gray-600 text-base font-medium font-['Roboto'] mb-3">Job Requests</div>
            <div className="flex justify-between items-start mb-1">
              <div className="flex flex-col gap-1">
                <div data-layer="50" className="text-gray-900 text-3xl font-semibold font-['Roboto']">50</div>
                <div data-layer="2.5%" className="text-gray-600 text-sm font-medium font-['Roboto']">2.5%</div> {/* Neutral color */}
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                 {/* Right Arrow Icon */}
                 <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>
            <div data-layer="Compared to Last month" className="text-gray-500 text-sm font-normal font-['Roboto']">Compared to Last month</div>
          </div>

          {/* Card 2: Outstanding RMAs */}
          <div data-layer="Frame 36509" className="w-full p-5 bg-white rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-200">
            <div data-layer="Outstanding RMAs" className="text-gray-600 text-base font-medium font-['Roboto'] mb-3">Outstanding RMAs</div>
            <div className="flex justify-between items-start mb-1">
              <div className="flex flex-col gap-1">
                <div data-layer="21" className="text-gray-900 text-3xl font-semibold font-['Roboto']">21</div>
                <div data-layer="2.5%" className="text-red-600 text-sm font-medium font-['Roboto']">2.5%</div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                 {/* Left Curved Arrow Icon (Reply/U-turn Left) */}
                 <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"></path>
                 </svg>
              </div>
            </div>
            <div data-layer="Compared to Last month" className="text-gray-500 text-sm font-normal font-['Roboto']">Compared to Last month</div>
          </div>

        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex gap-6">
        {/* Card 5: Trabajadores Online */}
        <div data-layer="Frame 36505" className="w-full max-w-xl p-6 bg-white rounded-lg shadow-[0px_4px_10px_rgba(0,0,0,0.05)] border border-gray-200"> {/* Adjusted max-width */}
          <div data-layer="Description Top" className="text-gray-800 text-lg font-semibold font-['Roboto'] mb-5">Trabajadores Online</div>
          <div className="flex gap-4">
            {/* Timeline Connector */}
            <div className="flex flex-col items-center mt-1">
              {[...Array(7)].map((_, index, arr) => ( // Assuming 7 items from image
                <div key={index} className="flex flex-col items-center h-8"> {/* Height matches text line-height + gap */}
                  <div className="w-2.5 h-2.5 bg-white border-2 border-blue-600 rounded-full z-10"></div>
                  {index < arr.length - 1 && ( // Don't draw line after last item
                    <div className="w-px flex-grow bg-gray-300 -mt-1"></div>
                  )}
                </div>
              ))}
            </div>
            {/* List of Workers */}
            <div className="flex-1 flex flex-col gap-[22px]"> {/* Adjusted gap to align with timeline */}
              {/* Worker Item 1 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Ámbar Tiburcio</div>
                {/* <div className="text-gray-500 text-sm font-medium">34</div> */}
              </div>
              {/* Worker Item 2 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Miguel Filpo</div>
                <div className="text-gray-500 text-sm font-medium">34</div>
              </div>
              {/* Worker Item 3 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Obal Nina</div>
                 <div className="text-gray-500 text-sm font-medium">52</div>
              </div>
              {/* Worker Item 4 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Josmer Peralta</div>
                 <div className="text-gray-500 text-sm font-medium">20</div>
              </div>
               {/* Worker Item 5 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Engineer Assignedx</div>
                 <div className="text-gray-500 text-sm font-medium">13</div>
              </div>
               {/* Worker Item 6 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Part Change</div>
                 <div className="text-gray-500 text-sm font-medium">13</div>
              </div>
               {/* Worker Item 7 */}
              <div className="flex justify-between items-center">
                <div className="text-gray-800 text-sm font-medium font-['Roboto']">Call Closed</div>
                 <div className="text-gray-500 text-sm font-medium">12</div>
              </div>
            </div>
          </div>
        </div>
        {/* Add other bottom row cards here if needed */}
      </div>

    </div>
  );
}

export default Dashboard;
