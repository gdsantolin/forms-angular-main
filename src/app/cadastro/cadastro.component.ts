import { ConsultaCepService } from './../service/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private cepService: ConsultaCepService,
  ) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid){
      this.router.navigate(['./sucesso'])
    } else{
      alert('Formulário inválido');
    }
      console.log(form.controls);
  }

  consultaCEP(ev: any, f: NgForm){
    const cep = ev.target.value;
    if(cep !== ""){
      this.cepService.getConsultaCep(cep).subscribe((res: any) => {
        console.log(res);
        this.popularEndereco(res, f);
      });
    }
  }

  popularEndereco(dados: any, f: NgForm){
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }
}
