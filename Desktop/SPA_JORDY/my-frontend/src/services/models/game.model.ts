import { Company } from "./company.model";


export class Game {
    public gameName: string;
    public gameDetails: string;
    public gameImage: string;
    public gameCompany: Company;

    constructor(values: Object ={}){
        Object.assign(this, values);
    }

}
