import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { RulesMock } from './mock-rules';
import { RulesCollection, Rule } from './rules';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RulesService {

  private rulesCollectionsDetailsUrl = 'http://localhost:8080/api/rules'; // url to rule collections
  private collectionsUrl = 'http://localhost:8080/api/collection'
  private ruleUrl = 'http://localhost:8080/api/rule'; //URL for single rule

  constructor(private http: Http) { }

  // Returns all rules package descriptions
  getAllRulesPacks(): Promise<RulesCollection[]> {
    return this.http.get(this.rulesCollectionsDetailsUrl)
      .toPromise()
      .then(response => response.json().Collections as RulesCollection[])
      .catch(this.handleError);
  }

  insertRulesPack(rulesPack: RulesCollection): Promise<RulesCollection[]> {
    RulesMock.push(rulesPack);
    return Promise.resolve(RulesMock);
  }

  // Get the details of a rules package with specific id
  getPackage(id: number): Promise<RulesCollection> {
    const url = `${this.rulesCollectionsDetailsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().Collections[0] as RulesCollection)
      .catch(this.handleError);
  }
  // Get the rules of a rules package with specific id
  getPackageRules(id: number): Promise<Rule[]> {
    const url = `${this.collectionsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().Collections as Rule[])
      .catch(this.handleError);
  }

  // deleteRulesPack(id: number): Promise<RulesCollection[]> {
  //   return this.getAllRulesPacks()
  //     .then(rules => rules.filter(rulesCollection => rulesCollection.Id !== id))
  //     .catch(err => console.log(err));
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
