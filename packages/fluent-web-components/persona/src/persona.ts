import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
// import { classMap } from 'lit-html/directives/class-map';
import { styles } from './persona-css';
import { PersonaSize, AvatarBackground } from './persona-types';
import '@fluentui/fluent-avatar';

@customElement('fluent-persona')
export class FluentPersona extends LitElement {
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
  @property() public text: string;
  @property() public secondaryText: string;
  @property() public tertiaryText: string;
  @property() public optionalText: string;

  @property({
    converter: value => {
      if (!value || value.length === 0) {
        return AvatarBackground.green10;
      }

      if (typeof AvatarBackground[value] === 'undefined') {
        return AvatarBackground.green10;
      } else {
        return AvatarBackground[value];
      }
    },
  })
  public avatarBackground: AvatarBackground = AvatarBackground.green10;

  @property({
    converter: value => {
      if (!value || value.length === 0) {
        return PersonaSize.size32;
      }

      if (typeof PersonaSize[value] === 'undefined') {
        return PersonaSize.size32;
      } else {
        return PersonaSize[value];
      }
    },
  })
  public size: PersonaSize = PersonaSize.size32;

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  protected render() {
    return html`
      <div class="root">
        <div class="avatar ${PersonaSize[this.size]} ${AvatarBackground[this.avatarBackground]}">
          ${this.renderAvatar()}
        </div>
        <div class="details ${PersonaSize[this.size]}">
          ${this.renderDetails()}
        </div>
      </div>
    `;
  }

  protected renderAvatar(): TemplateResult {
    return html`
      <fluent-avatar .image=${this.image} .initials=${this.initials} .imageAlt=${this.imageAlt}></fluent-avatar>
    `;
  }

  protected renderDetails(): TemplateResult {
    return html`
      ${this.renderText()} ${this.renderSecondaryText()} ${this.renderTertiaryText()} ${this.renderOptionalText()}
    `;
  }

  protected renderText(): TemplateResult {
    return html`
      <div class="primaryText">
        <div>${this.text}</div>
      </div>
    `;
  }

  protected renderSecondaryText(): TemplateResult {
    if (this.size < PersonaSize.size40) {
      return html``;
    }

    return html`
      <div class="secondaryText">
        <div>${this.secondaryText}</div>
      </div>
    `;
  }

  protected renderTertiaryText(): TemplateResult {
    if (this.size < PersonaSize.size72) {
      return html``;
    }

    return html`
      <div class="secondaryText">
        <div>${this.tertiaryText}</div>
      </div>
    `;
  }

  protected renderOptionalText(): TemplateResult {
    if (this.size < PersonaSize.size100) {
      return html``;
    }

    return html`
      <div class="secondaryText">
        <div>${this.optionalText}</div>
      </div>
    `;
  }
}
