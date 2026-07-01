import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrgMetrics {
  total_stars: number;
  total_contributors: number;
  active_projects: number;
  status: string;
}

export interface Member {
  name: string;
  role: string;
  github: string;
  avatar: string;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private apiUrl = 'https://atomic-linux-team-welcome-page.onrender.com/api/metrics';
  private membersUrl = 'https://atomic-linux-team-welcome-page.onrender.com/api/members';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<OrgMetrics> {
    console.log('📡 Intentando conectar con el backend en:', this.apiUrl);
    return this.http.get<OrgMetrics>(this.apiUrl);
  }

  getMembers(): Observable<Member[]> {
    console.log('📡 Intentando conectar con los miembros en:', this.membersUrl);
    return this.http.get<Member[]>(this.membersUrl);
  }
}
