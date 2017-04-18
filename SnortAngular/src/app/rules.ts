export class Rule {

    type: Type = Type.Alert;
    protocol: Protocol = Protocol.TCP;
    sourceIP: String = "any";
    sourcePort: String = "any";
    direction: Direction = Direction.Right;
    destinationIP: String = "any";
    destinationPort: String = "any";
    content: String = " Very nice rule content !";
}

export class RulesCollection {
     collection_id: number;
     fileName: String;
     creationDate: String;
     description: String;
}

export enum Type {
    Alert = 0,
    Warning = 1,
    Info = 2
}

export enum Protocol {
    TCP = 0,
    UDP = 1
}
export enum Direction {
    Right = 0,
    Left = 1,
    Both = 2
}
