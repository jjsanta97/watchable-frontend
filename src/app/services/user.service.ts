import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8088/users';

  constructor(private http: HttpClient) {}

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create_user`, userData);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, this.getHttpHeaders());
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/me`, data, this.getHttpHeaders());
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/me/change-password`,
      data,
      this.getHttpHeaders()
    );
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/upload-profile-picture`,
      formData,
      this.getHttpHeaders()
    );
  }

  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
}
