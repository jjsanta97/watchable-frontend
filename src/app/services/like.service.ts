import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl = 'http://localhost:8088/likes';

  constructor(private http: HttpClient) {}

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  likePost(postId: number): Observable<any> {
    console.log(postId);
    return this.http.post(
      `${this.apiUrl}/likes`,
      { post_id: postId },
      this.getHttpHeaders()
    );
  }

  unlikePost(likeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${likeId}`, this.getHttpHeaders());
  }
}
