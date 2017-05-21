import { Injectable } from '@angular/core';
import { Headers, Http, ResponseContentType } from '@angular/http';
import { RulesCollection, Rule } from './rules';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RulesService {

  //  Declare routes to API
  private rulesCollectionsDetailsUrl = 'http://localhost:8080/api/rules'; // url to rule collections
  private collectionsUrl = 'http://localhost:8080/api/collection'
  private ruleUrl = 'http://localhost:8080/api/rule'; //URL for single rule

  //  Declare headers
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  //  METHODS DECLARATIONS

  //  Returns all rules package descriptions
  getAllRulesPacks(): Promise<RulesCollection[]> {
    return this.http.get(this.rulesCollectionsDetailsUrl)
      .toPromise()
      .then(response => response.json().Collections as RulesCollection[])
      .catch(this.handleError);
  }
  /*
  insertRulesPack(rulesPack: RulesCollection): Promise<RulesCollection[]> {
    
  }
  */
  deleteRulePack(collection_id: number): Promise<void> {
    console.log("API called for deleting Pack with collection_id:" + collection_id);
    const url = `${this.rulesCollectionsDetailsUrl}/${collection_id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  //  Get the details of a rules package with specific id
  getPackage(id: number): Promise<RulesCollection> {
    const url = `${this.rulesCollectionsDetailsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().Collections[0] as RulesCollection)
      .catch(this.handleError);
  }
  //  Get the rules of a rules package with specific id
  getPackageRules(id: number): Promise<Rule[]> {
    const url = `${this.collectionsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().Collections as Rule[])
      .catch(this.handleError);
  }

  downloadRulesFile(collection_id: number): Promise<Blob> {
    // URL SHOULD BE 'http://localhost:8080/api/collection' 
    // TODO implement in server
    const url = `${this.collectionsUrl}/download/${collection_id}`;
    return this.http.get(url, { responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob())
      .catch(this.handleError);
  }

  //  Delete a rule
  deleteRule(id: number): Promise<void> {
    console.log("API called for delete rule! Id:" + id);
    const url = `${this.ruleUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);

  }
  //  Update a rule
  updateRule(newRule: Rule): Promise<Rule> {
    console.log("API called for update rule! Id:" + newRule.id);
    const url = `${this.ruleUrl}/${newRule.id}`;
    return this.http.put(url, JSON.stringify(newRule), { headers: this.headers })
      .toPromise()
      .then(() => newRule)
      .catch(this.handleError);
  }
  //  Insert new rule
  insertRule(newRule: Rule): Promise<void> {
    console.log("API called for inserting new rule !");
    return this.http.post(this.ruleUrl, JSON.stringify(newRule), { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
