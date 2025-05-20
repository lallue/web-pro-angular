import { Component, OnInit } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridType,
  DisplayGrid
} from 'angular-gridster2';
import { TemperatureService, TemperatureEntry } from 'src/app/service/TemperatureService';
import { ToastrService } from 'ngx-toastr';

interface DashboardItem extends GridsterItem {
  id: 'temp' | 'chart';
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  options!: GridsterConfig;
  dashboard: DashboardItem[] = [];

  newTemp: number | null = null;
  fetchedData: TemperatureEntry[] = [];
  displayUnit: '°C' | '°F' = '°C';
  isFahrenheit: boolean = false;

  constructor(
    private temperatureService: TemperatureService,
    private toastr: ToastrService
  ) { }

  isEditMode: boolean = false;

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      margin: 10,
      outerMargin: true,
      draggable: { enabled: this.isEditMode },
      resizable: { enabled: this.isEditMode },
      pushItems: true,
      pushDirections: { north: false, east: true, south: false, west: true },
      swap: false,
      minCols: 11,
      minRows: 4
    };


    this.dashboard = [
      { cols: 5, rows: 3, y: 0, x: 0, id: 'temp' },
      { cols: 6, rows: 3, y: 0, x: 0, id: 'chart' }
    ];


    const serverUrl = localStorage.getItem('serverUrl');
    if (serverUrl) {
      this.temperatureService.getTemperature(serverUrl).subscribe(
        (data) => {
          this.fetchedData = data.map((entry, index) => ({
            ...entry,
            fakeId: index + 1
          }));
          this.toastr.success('Température récupérée avec succès!', 'Succès', {
            timeOut: 3000,
            progressBar: true,
          });
        },
        (err) => {
          console.error('Erreur lors de la récupération des données', err);
          this.toastr.error('Échec de la récupération des données.', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
          });
        }
      );
    }
  }

  sendPost() {
    if (this.newTemp !== null) {
      const unit = this.isFahrenheit ? '°F' : '°C';
      this.temperatureService.sendTemperature(this.newTemp, unit).subscribe(
        (newEntry) => {
          const fakeId = this.fetchedData.length
            ? this.fetchedData[this.fetchedData.length - 1].fakeId! + 1
            : 1;
          this.fetchedData.push({ ...newEntry, fakeId });
          this.toastr.success('Température envoyée avec succès!', 'Succès', {
            timeOut: 3000,
            progressBar: true,
          });
        },
        (err) => {
          console.error('Erreur lors de l\'envoi des données', err);
          this.toastr.error('Échec de l\'envoi des données.', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
          });
        }
      );
    }
  }

  deleteEntry(entry: TemperatureEntry) {
    this.temperatureService.deleteTemperature(entry).subscribe(
      () => {
        this.fetchedData = this.fetchedData.filter(e =>
          !(e.temperature === entry.temperature && e.timestamp === entry.timestamp)
        );
        this.toastr.info('Température supprimée.', 'Information', {
          timeOut: 3000,
          progressBar: true,
        });
      },
      (err) => {
        console.error('Erreur lors de la suppression', err);
        this.toastr.error('Échec de la suppression.', 'Erreur', {
          timeOut: 3000,
          progressBar: true,
        });
      }
    );
  }

  convertToCelsius(entry: TemperatureEntry): number {
    return entry.unit === '°F'
      ? Math.round((entry.temperature - 32) * (5 / 9) * 10) / 10
      : entry.temperature;
  }

  convertToFahrenheit(entry: TemperatureEntry): number {
    return entry.unit === '°C'
      ? Math.round((entry.temperature * 9 / 5 + 32) * 10) / 10
      : entry.temperature;
  }

  getDisplayTemperature(entry: TemperatureEntry): string {
    let value: number;

    if (this.displayUnit === entry.unit) {
      value = entry.temperature;
    } else if (this.displayUnit === '°C') {
      value = this.convertToCelsius(entry);
    } else {
      value = this.convertToFahrenheit(entry);
    }

    return `${value} ${this.displayUnit}`;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.options.draggable!.enabled = this.isEditMode;
    this.options.resizable!.enabled = this.isEditMode;
    this.options.api?.optionsChanged!();
  }

}
