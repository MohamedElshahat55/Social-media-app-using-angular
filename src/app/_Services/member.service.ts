import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private _HttpClient: HttpClient) {}
  BaseUrl = environment.apiUrl;

  getAllMember() {
    return this._HttpClient.get<Member[]>(this.BaseUrl + 'users');
  }

  getMember(username: string) {
    return this._HttpClient.get<Member>(this.BaseUrl + `users/${username}`);
  }
}
