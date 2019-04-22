import { Developer } from "./developer.model";

export class Company {
    public companyName: string;
    public companyAge: string;
    public companyDeveloper?: Developer[];

    constructor(values: Object ={}){
        Object.assign(this, values);
    }

}
