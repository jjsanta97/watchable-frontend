import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:8088/comments';

  constructor(private http: HttpClient) {}

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createComment(commentData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create_comment`,
      commentData,
      this.getHttpHeaders()
    );
  }

  getComments(postId: number): Observable<any> {
    console.log("PostId", postId);
    return this.http.get(`${this.apiUrl}/${postId}`);
  }
}
