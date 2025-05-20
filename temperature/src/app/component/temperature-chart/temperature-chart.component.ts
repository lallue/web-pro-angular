import { Component, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TemperatureEntry } from 'src/app/service/TemperatureService';

Chart.register(zoomPlugin);

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss']
})
export class TemperatureChartComponent implements OnChanges, AfterViewInit {
  @Input() data: TemperatureEntry[] = [];
  @Input() unit: '°C' | '°F' = '°C';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Température',
        fill: true,
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: '#007bff',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: [],
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 30,
          minRotation: 0,
          autoSkip: true,
        }
      },
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  ngAfterViewInit(): void {
    this.updateChartData();
  }

  ngOnChanges(): void {
    this.updateChartData();
  }

  private updateChartData(): void {
    if (!this.chart?.chart?.ctx || !this.chart?.chart?.chartArea) return;

    const ctx = this.chart.chart.ctx;
    const chartArea = this.chart.chart.chartArea;
    const chartHeight = chartArea.bottom;

    const formatter = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });

    const labels = this.data.map(entry =>
      formatter.format(new Date(entry.timestamp))
    );

    const convertedTemps = this.data.map(entry => {
      const tempC = entry.unit === '°F' ? (entry.temperature - 32) * 5 / 9 : entry.temperature;
      return this.unit === '°F' ? (tempC * 9 / 5 + 32) : tempC;
    });

    const pointColors = this.data.map(entry => {
      const tempC = entry.unit === '°F' ? (entry.temperature - 32) * 5 / 9 : entry.temperature;
      return this.getColorFromTemperature(tempC);
    });

    // Création du dégradé dynamique
    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradient.addColorStop(0, 'rgba(255,0,0,0.2)');
    gradient.addColorStop(0.5, 'rgba(255,165,0,0.2)');
    gradient.addColorStop(1, 'rgba(0,123,255,0.2)');

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = convertedTemps;
    this.lineChartData.datasets[0].label = `Température (${this.unit})`;
    this.lineChartData.datasets[0].pointBackgroundColor = pointColors;
    this.lineChartData.datasets[0].backgroundColor = gradient;

    this.chart.update();
  }

  private getColorFromTemperature(tempC: number): string {
    if (tempC <= 0) return '#007bff';
    if (tempC >= 30) return '#ff0000';

    const r = Math.round((tempC / 30) * 255);
    const g = Math.round(140 - (tempC / 30) * 140);
    const b = Math.round(255 - (tempC / 30) * 255);
    return `rgb(${r},${g},${b})`;
  }

  public resetZoom(): void {
    this.chart?.chart?.resetZoom();
  }

  public zoomIn(): void {
    this.chart?.chart?.zoom(1.2);
  }

  public zoomOut(): void {
    this.chart?.chart?.zoom(0.8);
  }
}
