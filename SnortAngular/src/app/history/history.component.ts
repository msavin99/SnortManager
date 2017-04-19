import { Component, OnInit, Input } from '@angular/core';
import { RulesCollection, Rule } from '../rules';
import { RulesService } from '../rules.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {

  @Input() public historyRules: RulesCollection[];

  constructor(private rulesService: RulesService, private router: Router) { }

  ngOnInit() {
    this.getRulesCollections();
  }

  // Get the rules collections in order to show them in the history view
  getRulesCollections(): void {
    this.rulesService.getAllRulesPacks().then((res: RulesCollection[]) => { this.historyRules = res; console.log(this.historyRules) });
  }

  deleteItemById(id: number) {
    this.rulesService.deleteRulePack(id).then(() => {
      this.getRulesCollections();
      console.log("Rule pack with id: " + id + " was deleted succesfully!")
    });
  }
  goToRulesDetails(id: number) {
    this.router.navigate(['/rules', id])
  }
}
