import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pacientes } from './models/PacienteModel';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'cadastroFrontEnd';
  public pacientes: Pacientes[] = []
  public pacientesSection = new FormGroup({});

  constructor(private http: HttpClient) {
    this.createForm();
  }

  ngOnInit() {
    this.updateList();
  }

  createForm() {
    this.pacientesSection = new FormGroup({
      cpf: new FormControl(""),
      nome: new FormControl(""),
      uf: new FormControl(""),
      nascimento: new FormControl(new Date()),
      peso: new FormControl(0),
      altura: new FormControl(0)
    });
  }

  createFormPaciente(paciente: Pacientes) {
    this.pacientesSection = new FormGroup({
      cpf: new FormControl(paciente.cpf),
      nome: new FormControl(paciente.nome),
      uf: new FormControl(paciente.uf),
      nascimento: new FormControl(paciente.nascimento),
      peso: new FormControl(paciente.peso),
      altura: new FormControl(paciente.altura)
    });
  }

  openEdit(paciente: Pacientes) {
    this.createFormPaciente(paciente);
  }

  updateList() {
    this.getPacientes()
      .subscribe((data: Pacientes[]) => {
        this.pacientes = data
      })
  }

  getPacientes() {
    return this.http.get<Pacientes[]>("http://localhost:8080/paciente/");
  }

  postPacientes() {
    if (this.validate()) {
    this.pacientesSection.value.nascimento = this.pacientesSection.value.nascimento+"T00:00:00"
      this.http.post<Pacientes>("http://localhost:8080/paciente/", this.pacientesSection.value)
        .subscribe((data: Pacientes) => {
          this.updateList();
        })
    }
  }

  putPacientes() {
    if (this.validate()) {
      this.http.put<Pacientes>("http://localhost:8080/paciente/" + this.pacientesSection.value.cpf, this.pacientesSection.value)
        .subscribe((data: Pacientes) => {
          this.updateList();
        })
    }
  }

  cpfToDelete: string = "";

  selectDelete(cpf: string) {
    this.cpfToDelete = cpf;
  }

  deletePacientes() {
    this.http.delete<any>("http://localhost:8080/paciente/" + this.cpfToDelete)
      .subscribe((data: any) => {
        this.updateList();
      })
  }

  private validate(): boolean {

    if (this.pacientesSection.value.cpf == "") {
      alert("CPF invalido");
      return false;
    }

    if (this.pacientesSection.value.nome == "") {
      alert("Nome invalido");
      return false;
    }

    if (this.pacientesSection.value.uf == "") {
      alert("UF invalido");
      return false;
    }

    if (this.pacientesSection.value.nascimento == "") {
      alert("Nascimento invalido");
      return false;
    }

    if (this.pacientesSection.value.peso == 0) {
      alert("Peso invalido");
      return false;
    }

    if (this.pacientesSection.value.altura == 0) {
      alert("Altura invalido");
      return false;
    }

    return true;
  }
}