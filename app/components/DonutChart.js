// components/DonutChart.js
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DonutChart = ({data}) => {
  const svgRef = useRef();

  useEffect(() => {
    const radius = Math.min(width, height) / 2;

    // Sélectionner l'élément SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Définir l'arc du donut
    const arc = d3.arc()
      .innerRadius(radius - 80) // Rayon interne
      .outerRadius(radius - 20); // Rayon externe

    // Créer un pied de graphique (pie chart)
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    // Créer un groupe d'éléments pour chaque section
    const arcs = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    // Dessiner les arcs
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color);

    // Ajouter des labels
    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .text(d => d.data.label);

  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default DonutChart;
