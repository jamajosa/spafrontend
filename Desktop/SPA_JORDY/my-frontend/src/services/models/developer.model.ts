export class Developer {
    public name: string;
    public age: string;

    constructor(values: Object ={}){
        Object.assign(this, values);
    }
}
