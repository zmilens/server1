import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  students: any = [{}];
  id: number;
  disabled: false;
  editForm: FormGroup;
  student;

  constructor(
    private http: HttpService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.activeRouter.params.subscribe(param => { 
       this.id=param.id
      })
    }

  async ngOnInit() {
    this.getStudent().then( () =>{
      this.editForm = new FormGroup(
        { 
        surname: new FormControl({value: this.student.surname, disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        name: new FormControl({value: this.student.name, disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        middlename: new FormControl({value: this.student.middlename, disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        number: new FormControl({value: this.student.number, disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-z0-9._-]{0,}@[A-Za-z]{0,}.[A-Za-z]{2,3}")]),
        email: new FormControl({value: this.student.email, disabled: this.disabled}),
        data: new FormControl({value: this.student.data, disabled: this.disabled}),
        })
    })
  }

  async getStudent(){
    try{
      this.student = await this.http.getStudentById(this.id);
    } catch(e){
        console.log(e);
      }
    }

  async edit(){
    await this.http.putStudents(this.id, this.editForm.value);
    this.router.navigate(['/students']);
  }
  
  async onDelete(){
    await this.http.deleteStudents(this.id);
    this.router.navigate(['/students']);
  }
}
