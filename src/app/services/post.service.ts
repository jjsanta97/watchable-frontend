import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8088/posts';
  private postCreatedSubject = new BehaviorSubject<boolean>(false);
  postCreated$ = this.postCreatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createPost(formData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/create_post`, formData, this.getHttpHeaders())
      .pipe(
        tap(() => {
          this.postCreatedSubject.next(true);
        })
      );
  }

  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getHttpHeaders());
  }
}
