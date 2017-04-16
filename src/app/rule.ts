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

export enum Type {
    Alert,
    Warning,
    Info
}

export enum Protocol {
    TCP,
    UDP
}
export enum Direction {
    Right,
    Left,
    Both
}