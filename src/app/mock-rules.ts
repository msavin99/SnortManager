import {Rule, RulesCollection, Type, Protocol, Direction} from './rules';

export const RULES: Rule[] = [
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
  { type: Type.Alert, protocol: Protocol.UDP, sourceIP: "any", sourcePort: "any", direction: Direction.Right, destinationIP: "any", destinationPort: "any", content: "Very nice rule content" },
]

export class RulesMockup{
    rulesCollection: RulesCollection[] = [];
    constructor(){
        //this.rulesCollection.push(new RulesCollection(0,RULES,"FirstFile.csv",new Date(), "Rules package prepared for Ransomware attacks"));
        //this.rulesCollection.push(new RulesCollection(1,RULES,"Second_File.csv",new Date(), "Rules package prepared for Trojan Horse attacks"));
        //this.rulesCollection.push(new RulesCollection(2,RULES,"NewRulesFromMathew.csv",new Date(), "Rules package prepared from Bitdefender for multi-clustered server protection"));
        //this.rulesCollection.push(new RulesCollection(3,RULES,"RulesFromApril.csv",new Date(), "Just a dummy rules package"));
    }
}

// THIS ONE IS FOR EXPORTING THE COLLECTION OF RULES AS A MOCKUP
export const RulesMock: RulesCollection[] = new RulesMockup().rulesCollection;

