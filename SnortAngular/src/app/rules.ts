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
    Log = 1,
    Pass = 2,
    Activate = 3,
    Dynamic = 4,
    Drop = 5,
    Reject = 6,
    SDrop = 7
}

export enum Protocol {
    TCP = 0,
    UDP = 1,
    ICMP = 2,
    IP = 3
}
export enum Direction {
    Right = 0,
    Both = 1
}
