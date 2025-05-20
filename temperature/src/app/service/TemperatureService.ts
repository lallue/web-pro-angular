import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TemperatureEntry {
  id: number;
  temperature: number;
  timestamp: string;
  unit?: string;
  fakeId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private serverUrl: string | null = localStorage.getItem('serverUrl');

  constructor(private http: HttpClient) {}

  getTemperature(url: string): Observable<TemperatureEntry[]> {
    return this.http.get<TemperatureEntry[]>(`${url}/temperature`);
  }

  sendTemperature(temp: number, unit: string): Observable<TemperatureEntry> {
    const url = localStorage.getItem('serverUrl');
    return this.http.post<TemperatureEntry>(`${url}/temperature`, { temperature: temp, unit });
  }

  deleteTemperature(entry: TemperatureEntry): Observable<any> {
    const url = localStorage.getItem('serverUrl');
    if (!url) {
      throw new Error('Server URL is not set in localStorage.');
    }
  
    return this.http.request('delete', `${url}/temperature`, {
      body: entry
    });
  }
  
}
