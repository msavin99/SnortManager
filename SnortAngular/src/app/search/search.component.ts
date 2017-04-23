import { Component, OnInit } from '@angular/core';
import { RulesService } from '../rules.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Rule, RulesCollection, Type, Protocol, Direction } from '../rules';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedString: string;
  filteredRuleCollections: RulesCollection[];
  //filteredRules : Map<number,Rule[]> = new Map<number, Rule[]>();

  constructor(
    private rulesService: RulesService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.searchedString = params['q'];
      this.rulesService.getAllRulesPacks()
        .then(rules => this.filteredRuleCollections = rules.filter(rule => rule.description.toLowerCase().indexOf(this.searchedString.toLowerCase()) >= 0))
      /*
      .then( rules => {
          for(let ruleCollection of rules){
            this.rulesService.getPackageRules(ruleCollection.collection_id).then( ruleItems => {
              this.filteredRules.set(ruleCollection.collection_id, ruleItems.filter(rule=> rule.content.toLowerCase().indexOf(this.searchedString.toLowerCase()) >= 0));
                            console.log(this.filteredRules);
            })
          }
          
      });
    */
  })
  }
  ngAfterViewInit() {

  }

  goBack() {
    this.location.back();
  }

}
