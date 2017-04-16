import { Component, OnInit } from '@angular/core';
import { RulesCollection, Rule } from '../rules';
import { RulesService } from '../rules.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyRules: RulesCollection[];

  constructor(private rulesService: RulesService, private router: Router) { }

  ngOnInit() {
    this.getRulesCollections();
  }

  getRulesCollections() {
    this.rulesService.getAllRulesPacks()
      .then(historyRules => {
        this.historyRules = historyRules;
        console.log(JSON.stringify(historyRules));
      });
  }
  deleteItem(id: number){
    this.rulesService.deleteRulesPack(id).then(historyRules => this.historyRules = historyRules);
  }
  goToRulesDetails(id: number) {
    this.router.navigate(['/rules', id])
  }
}
