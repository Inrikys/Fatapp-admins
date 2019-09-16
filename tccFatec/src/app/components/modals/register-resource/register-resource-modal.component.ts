import { Component } from '@angular/core';
import { RegisterResourceValidatorService } from 'src/app/services/validators/register-resource/register-resource-validator.service';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-register-resource-modal',
  templateUrl: './register-resource-modal.component.html',
  styleUrls: ['./register-resource-modal.component.scss'],
})
export class RegisterResourceModalComponent {

  public registerResourceForm;
  public validationMessages;
  public resources: any = null;

  constructor(
    private registerResourceValidator: RegisterResourceValidatorService,
    private apiCore: FatappCoreService,
    private global: GlobalsService,
  ) {
    this.getAllResources();
    this.registerResourceForm = this.registerResourceValidator.getRegisterResourceForm();
    this.validationMessages = this.registerResourceValidator.getRegisterResourceFormValidationsMessages();
  }

  async submit() {
    if (!this.registerResourceForm.valid) {
      this.registerResourceValidator.validateAllFormFields();
    } else {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      const response = await this.apiCore.registerResource(this.registerResourceForm.value.name);
      console.log(this.registerResourceForm.value);
      console.log(response);
      this.getAllResources();
      await loading.dismiss();
    }
  }

  async getAllResources() {
    try {
      const loading = await this.global.createLoading('Carregando...');
      await loading.present();
      const response = await this.apiCore.getAllResources();
      this.resources = response;
      console.log(this.resources);
      await loading.dismiss();
    } catch (error) {
      console.log(error);
      this.global.createAlert(error);
    }
  }

  async removeResource(id) {
    try {
      const response = await this.apiCore.removeResource(id);
      this.global.createAlert('Recurso removido com sucesso!');
      this.getAllResources();
    } catch (error) {
      console.log(error);
      this.global.createAlert('Ocorreu um erro ao remover o recurso');
    }

  }
}
