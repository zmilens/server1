import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  formAdd: FormGroup;
  disabled: false;
  id: number;

  constructor(private activeRoute: ActivatedRoute, private router:Router, private api: HttpService) {
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    });
  }

  async ngOnInit() {
    this.formAdd = new FormGroup(
      {
        surname: new FormControl({value:'', disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        name: new FormControl({value:'', disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        middlename: new FormControl({value:'', disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-zА-Яа-яЁё]{1,}")]),
        number: new FormControl({value:'', disabled: this.disabled}, [Validators.required]),
        email: new FormControl({value:'', disabled: this.disabled}, [Validators.required, Validators.pattern("^[A-Za-z0-9._-]{0,}@[A-Za-z]{0,}.[A-Za-z]{2,3}")]),
        data: new FormControl({value:'', disabled: this.disabled}, [Validators.required]),
      });
    }
      async add(){
        try {
          await this.api.postStudents(
            JSON.stringify(this.formAdd.value)
          );
        this.router.navigate(['/students']);
        } catch (err) {
          console.log(err);
        }
      }
}


