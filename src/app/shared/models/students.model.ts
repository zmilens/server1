export class Students {
    public surname: string;
    public name: string;
    public middlename: string;
    public number: number;
    public email: string;
    public data: string;
    public id: number;
    constructor(
        surname: string,
        name: string,
        middlename: string,
        number: number,
        email: string,
        data: string,
        id: number
    ) {
      this.surname = surname;
      this.name = name;
      this.middlename = middlename;
      this.number = number;
      this.email = email;
      this.data = data;
      this.id = id;
    }
  }
  