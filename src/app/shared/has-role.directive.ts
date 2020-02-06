import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from '../security/security.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input() set appHasRole(roles: string) {
    const rolesSplitted = roles.split(',');
    let flag = false;

    for (let role of rolesSplitted) {
      if (this.securityService.getRole === role) {
        flag = true;
        break;
      }
    }
    if (flag) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService) { }
}
