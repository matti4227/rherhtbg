import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from '../security/security.service';

@Directive({
  selector: '[appOwnRecipe]'
})
export class OwnRecipeDirective {

  @Input() set appOwnRecipe(username: string) {
    if (this.securityService.getUsername === username) {

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
