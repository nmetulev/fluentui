import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
// import { classMap } from 'lit-html/directives/class-map';
import { styles } from './avatar-css';

@customElement('fluent-avatar')
export class FluentAvatar extends LitElement {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  @property() public image: string;
  @property() public imageAlt: string;
  @property() public initials: string;

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  protected render() {
    return html`
      <div class="root">
        ${this.renderAvatar()}
      </div>
    `;
  }

  protected renderAvatar(): TemplateResult {
    if (!!this.image && this.image.length > 0) {
      return this.renderImage();
    } else {
      return this.renderInitials();
    }
  }

  protected renderImage(): TemplateResult {
    return html`
      <div class="image">
        <img alt=${this.imageAlt} src=${this.image} />
      </div>
    `;
  }

  protected renderInitials(): TemplateResult {
    return html`
      <div class="initials">
        <div>
          ${this.initials}
        </div>
      </div>
    `;
  }
}
