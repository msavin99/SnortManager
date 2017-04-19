export class Rule {
    id: number;
    type: Type = Type.Alert;
    protocol: number = Protocol.TCP;
    sourceIP: string = "any";
    sourcePort: string = "any";
    direction: number = Direction.Right;
    destinationIP: string = "any";
    destinationPort: string = "any";
    content: string = " Very nice rule content !";
    collection_id = 0;

    constructor(collection_id: number){
        this.collection_id = collection_id;
    }
}

export class RulesCollection {
     collection_id: number;
     fileName: string;
     creationDate: string;
     description: string;
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
