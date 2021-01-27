import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any = [{}]; //массив объектов
  filter: string;
  sorting: string;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private api: HttpService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
  }
  async ngOnInit() {
    this.students = await this.api.getStudents();
  
  }

}
