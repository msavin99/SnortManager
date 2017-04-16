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
  rulesCollection: RulesCollection
  constructor(
    private rulesService: RulesService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.route.params
      .switchMap((params: Params) => this.rulesService.getRulesPack(+params['id']))
      .subscribe((receivedRules: RulesCollection) => {
        this.rulesCollection = receivedRules;
        console.log(this.rulesCollection.CreationDate);
      }, err => console.log(err));
    //this.rulesService.getRules(1).then(receivedRules=> this.rulesCollection = receivedRules);
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
