import { Component, Input, OnInit } from '@angular/core';
import { Rule, RulesCollection, Type, Protocol, Direction } from '../rules';
import { RulesService } from '../rules.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { saveAs } from "file-saver";
import 'rxjs/add/operator/switchMap';
import 'rxjs/Rx';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
})

export class RulesComponent implements OnInit {

  //  Fields
  rules: Rule[];
  rulesCollection: RulesCollection;
  selectedRuleId: number;

  constructor(
    private rulesService: RulesService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() { }
  ngAfterViewInit() {
    this.route.params
      .switchMap((params: Params) =>
        this.rulesService.getPackage(+params['id']))
      .subscribe((receivedDescription: RulesCollection) => { this.rulesCollection = receivedDescription; console.log(this.rulesCollection) },
      err => console.log(err));
    this.route.params
      .switchMap(
      (params: Params) =>
        this.rulesService.getPackageRules(+params['id']))
      .subscribe((receivedRules: Rule[]) => { this.rules = receivedRules; console.log(this.rules) },
      err => console.log(err));

  }

  directionToString(direction: Direction): string {
    switch (direction) {
      case Direction.Left:
        return "<-";
      case Direction.Right:
        return "->";
      case Direction.Both:
        return "<->";
    }
  }
  protocolToString(protocol: Protocol): string {
    switch (protocol) {
      case Protocol.TCP:
        return "TCP";
      case Protocol.UDP:
        return "UDP";
      case Protocol.ICMP:
        return "ICMP";
      case Protocol.IP:
        return "IP";
    }
  }
  typeToString(type: Type): string {
    switch (type) {
      case Type.Alert:
        return "Alert";
      case Type.Activate:
        return "Activate";
      case Type.Drop:
        return "Drop";
      case Type.Dynamic:
        return "Dynamic";
      case Type.Log:
        return "Log";
      case Type.Pass:
        return "Pass";
      case Type.Reject:
        return "Reject";
      case Type.SDrop:
        return "SDrop";
    }
  }

  selectRuleForEdit(id: number) {
    this.selectedRuleId = id;
    console.log("Selected rule for edit:" + this.selectedRuleId);
  }
  saveRule() {
    // If the rule is already existing
    if (this.selectedRuleId != null) {

      this.rulesService.updateRule(this.rules.find(rule => rule.id == this.selectedRuleId))
        .then(
        updatedRule => {
          var tmp = this.rules.find(rule => rule.id == this.selectedRuleId);
          tmp = updatedRule
        },
        err => console.log(err)
        ).then(
        updatedRule => {
          console.log("Rule " + this.selectedRuleId + " was updated succesfully");
          this.selectedRuleId = null;
        },
        err => console.log(err)
        );

    } else {
      // Insert the new rule & retrieve all rules
      this.rulesService.insertRule(this.rules.pop())
        .then(() => this.refreshRules())
        .catch(err => console.log(err));
    }
  }
  insertRule() {
    this.rules.push(new Rule(this.rulesCollection.collection_id));
    console.log("New array:");
    console.log(this.rules);
  }

  refreshRules() {
    this.rulesService.getPackageRules(this.rulesCollection.collection_id)
      .then((receivedRules: Rule[]) => { this.rules = receivedRules; console.log("Refreshed Rules:" + this.rules.length), err => console.log(err) });
  }

  deleteItemById(id: number) {
    this.rulesService.deleteRule(id)
      .then(() => {
        //Filter so the array contains only the rules that have the rule.id !== deleted rule id
        this.rules = this.rules.filter(rule => rule.id !== id);
        console.log("Rule " + id + " was deleted succesfully!");
      });
  }

  ExportRulesCSV(){
    // call the service downloadRulesFile method with the collection_id parameter.
    return this.rulesService.downloadRulesFile(this.rulesCollection.collection_id)
      .subscribe(result => {
        console.log("Yuppi file result back for downloading the rules !")
        saveAs(result,this.rulesCollection.fileName.substring(0, this.rulesCollection.fileName.length-4)+".rules");
      });

  }

  ImportInSnort(){
    console.log("Importing into Snort !");
  }
  goBack(): void {
    this.location.back();
  }
}
