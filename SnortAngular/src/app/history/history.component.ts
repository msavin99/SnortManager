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
    this.rulesService.getAllRulesPacks().then((res: RulesCollection[]) => { this.historyRules = res; console.log(this.historyRules) });
    //this.historyRules.push(new RulesCollection(1,"ADADADA","0001010101","Super tare..e naiba"));
    //setTimeout(()=> {this.historyRules.push(new RulesCollection(1,"ADADADA","0001010101","Super tare..e naiba"));},2000);
  }


  getRulesCollections(): void {

  }

  deleteItem(id: number) {
    //this.rulesService.deleteRulesPack(id).then(historyRules => this.historyRules = historyRules);
  }
  goToRulesDetails(id: number) {
    this.router.navigate(['/rules', id])
  }
}
