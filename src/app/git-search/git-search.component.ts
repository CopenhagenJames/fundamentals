import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;

  model = new AdvancedSearchModel('', '', '', null, null, '');
  modelKeys = Object.keys(this.model);

  constructor(private GitSearchService: GitSearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {

      if (params.has('query')) {
        this.searchQuery = params.get('query');
        this.displayQuery = params.get('query');
      } else {
        this.searchQuery = 'angular';
        this.displayQuery = 'angular';
      }

      this.gitSearch();
    });


    this.route.data.subscribe((result) => {
      this.title = result.title;
    });

  }

  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery).subscribe((response) => {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText);
    });
  }

  sendQuery = () => {
    this.searchResults = null;

    let search: string = this.model.q;
    let params: string = "";

    this.modelKeys.forEach((elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.model[elem]) {
        params += '+' + elem + ':' + this.model[elem];
      }
    });

    this.searchQuery = search;

    if(params !== ''){
      this.searchQuery = search + '+' + params;
    }

    this.displayQuery = this.searchQuery;

    this.gitSearch();
  }
}
