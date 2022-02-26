import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Pacientes} from './models/PacienteModel';
import { FormControl } from '@angular/forms';
import {NgModule} from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'cadastroFrontEnd';
  public pacientes: Pacientes[] = []

  constructor(private http: HttpClient) { }

  public pacientesSection = new FormGroup({
    cpf: new FormControl(""),
    nome: new FormControl(""),
    uf: new FormControl(""),
    nascimento: new FormControl(new Date()),
    peso: new FormControl(0),
    altura: new FormControl(0)
    })



  postPaciente(){
    this.http.post<Pacientes[]>("http://localhost:8080/paciente/", this.pacientesSection.value)
    .subscribe((data: Pacientes[]) =>{

    })
  }

   getPacientes(){
    return this.http.get<Pacientes[]>("http://localhost:8080/paciente/");
  }

  ngOnInit(){
    this.getPacientes()
    .subscribe((data: Pacientes[]) => {
    this.pacientes = data
})
  }
}