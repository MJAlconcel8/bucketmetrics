import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import PropTypes from 'prop-types';

export const ShotChart = ({ playerId, minCount, chartType, displayTooltip }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`API_ENDPOINT/player/${playerId}/shots`);
      const data = await response.json();

      const final_shots = data.shot_Chart_Detail.map(shot => ({
        x: (shot.locX + 250) / 10,
        y: (shot.locY + 50) / 10,
        action_type: shot.actionType,
        shot_distance: shot.shotDistance,
        shot_made_flag: shot.shotMadeFlag,
      }));

      const ctx = chartRef.current.getContext('2d');

      const chart = new Chart(ctx, {
        type: chartType,
        data: {
          datasets: [{
            data: final_shots,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Customize the color as needed
            // Add other dataset options if necessary
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: displayTooltip,
            // Customize tooltips options if needed
          },
          // Add other chart options if necessary
        },
      });
    };

    fetchData();
  }, [playerId, minCount, chartType, displayTooltip]);

  return <canvas id="shot-chart" ref={chartRef} />;
};

ShotChart.propTypes = {
  playerId: PropTypes.number,
  minCount: PropTypes.number,
  chartType: PropTypes.string,
  displayTooltip: PropTypes.bool,
};
