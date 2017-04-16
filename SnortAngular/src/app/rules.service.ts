import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RulesMock } from './mock-rules';
import { RulesCollection, Rule } from './rules';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RulesService {

  private rulesCollectionsUrl = 'http://localhost:8080/api/rules'; // url to rule collections
  private ruleUrl = 'http://localhost:8080/api/rule'; //URL for single rule

  constructor(private http: Http) { }

  getAllRulesPacks(): Promise<RulesCollection[]> {
    return this.http.get(this.rulesCollectionsUrl)
      .toPromise()
      .then(response => <RulesCollection[]>response.json().Collections ).catch(this.handleError);
  }

  insertRulesPack(rulesPack: RulesCollection): Promise<RulesCollection[]> {
    RulesMock.push(rulesPack);
    return Promise.resolve(RulesMock);
  }

  //GetRule method with specific id
  getRulesPack(id: number): Promise<RulesCollection> {
    return this.getAllRulesPacks()
      .then(rules => rules.find(rulesCollection => rulesCollection.Id === id)).catch(err => console.error(err));
  }
  deleteRulesPack(id: number): Promise<RulesCollection[]> {
    return this.getAllRulesPacks()
      .then(rules => rules.filter(rulesCollection => rulesCollection.Id !== id))
      .catch(err => console.log(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
