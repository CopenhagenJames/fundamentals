import { Injectable } from '@angular/core';
import { GitSearch } from './git-search';
import { GitUsers } from './git-users';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];

  constructor(private http: HttpClient) {

  }

  gitSearch = (query: string): Observable<GitSearch> => {
    if (this.cachedValues[query]) {
      return new Observable<GitSearch>(() => {
        return this.cachedValues[query];
      });
    } else {
      return this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query);
    }
  }

  gitUsers = (query: string): Observable<GitUsers> => {
    if (this.cachedUsers[query]) {
      return new Observable<GitUsers>(() => {
        this.cachedUsers[query];
      });
    } else {
      return this.http.get<GitUsers>('https://api.github.com/search/users?q=' + query);
    }
  }
}
