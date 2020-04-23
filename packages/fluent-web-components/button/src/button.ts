import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { styles } from './button-css';
import '@fluentui/fluent-icon';

export type ButtonAppearance = 'transparent' | 'neutralLighter' | 'neutralDarker' | 'outline' | 'primary';

export type IconPosition = 'before' | 'after';

/**
 * A button
 *
 * @export
 * @class mgt-button
 * @extends {MgtTemplatedComponent}
 */
@customElement('fluent-button')
export class FluentButton extends LitElement {
  static get styles() {
    return styles;
  }

  /**
   * Fabric Core Icon Name
   * https://developer.microsoft.com/en-us/fabric#/styles/web/icons
   *
   * @type {string}
   * @memberof FluentButton
   */
  @property() public icon: string;

  @property() public text: string;
  @property() public iconPosition: IconPosition = 'before';
  @property() public appearance: ButtonAppearance = 'neutralDarker';
  @property({ type: Boolean, reflect: true }) public disabled: boolean;

  @query('.root') private buttonElement: HTMLElement;

  public focus(focusOptions?: FocusOptions) {
    const button = this.buttonElement;
    if (button) {
      button.focus(focusOptions);
    }
  }

  public blur() {
    const button = this.buttonElement;
    if (button) {
      button.blur();
    }
  }

  protected render() {
    const className: any = {
      disabled: this.disabled,
      root: true,
      'icon-after': this.iconPosition === 'after',
      'icon-only': !!this.icon && !(this.text && this.text.length),
    };

    className[this.appearance] = !this.disabled;

    const content = [this.renderIcon(), this.renderText()];

    if (this.iconPosition === 'after') {
      content.reverse();
    }

    return html`
      <button class=${classMap(className)} ?disabled=${this.disabled}>
        ${content}
        <slot></slot>
      </button>
    `;
  }

  protected renderIcon() {
    if (this.icon) {
      return html`
        <fluent-icon class="icon" name="${this.icon}"></fluent-icon>
      `;
    }

    return null;
  }

  protected renderText() {
    if (this.text && this.text !== '') {
      return html`
        <span class="text">${this.text}</span>
      `;
    }
  }
}
