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

        private collection_id: number
        private fileName: String
        private creationDate: String
        private description: String

    constructor() { console.log("asd");}




    public get Id() {
        return this.collection_id;
    }
    get Description() {
        return this.description;
    }
    set Description(value) {
        this.description = value;
    }
    get FileName() {
        return this.fileName;
    }
    set FileName(value) {
        this.fileName = value;
    }
    get CreationDate() {
        return this.creationDate;
    }
    set CreationDate(value) {
        this.creationDate = value;
    }

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
