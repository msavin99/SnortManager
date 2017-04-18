import { Component, Input, OnInit } from '@angular/core';
import { Rule, RulesCollection, Type, Protocol, Direction } from '../rules';
import { RulesService } from '../rules.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
})

export class RulesComponent implements OnInit {

  //  Fields
  rules: Rule[];
  rulesCollection: RulesCollection;
  selectedRule: Rule;
  
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
    }
  }
  typeToString(type: Type): string {
    switch (type) {
      case Type.Alert:
        return "Alert";
      case Type.Info:
        return "Info";
      case Type.Warning:
        return "Warning";
    }
  }
  goBack(): void {
    this.location.back();
  }
}
