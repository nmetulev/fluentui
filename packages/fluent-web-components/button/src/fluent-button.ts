import { customElement, html, LitElement, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
// import '../mgt-icon/mgt-icon';
import { styles } from './fluent-button-css';
import '@fluentui/fluent-icon';

/**
 * Defines how a person card is shown when a user interacts with
 * a person component
 *
 * @export
 * @enum {number}
 */
export enum ButtonType {
  /**
   * Default button
   */
  default,

  /**
   * Primary button
   */
  primary,

  /**
   * Command button
   */
  command,
}

export enum IconPosition {
  before = 'before',
  after = 'after',
}

/**
 * A button
 *
 * @export
 * @class mgt-button
 * @extends {MgtTemplatedComponent}
 */
@customElement('fluent-button')
export class FluentButton extends LitElement {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  /**
   * The text to display
   *
   * @type {string}
   * @memberof MgtComponent
   */
  @property({ attribute: 'text' }) public text: string;

  /**
   * Fabric Core Icon Name
   * https://developer.microsoft.com/en-us/fabric#/styles/web/icons
   *
   * @type {string}
   * @memberof FluentButton
   */
  @property({ attribute: 'icon' }) public icon: string;

  @property({
    converter: (value: string) => {
      value = value.toLowerCase();
      if (typeof IconPosition[value] === 'undefined') {
        return IconPosition.before;
      } else {
        return IconPosition[value];
      }
    },
  })
  public iconPosition: IconPosition = IconPosition.before;

  // /**
  //  * The type of button
  //  *
  //  * @type {string}
  //  * @memberof FluentButton
  //  */
  // @property({
  //   attribute: 'type',
  //   converter: (value, type) => {
  //     if (!value) {
  //       return ButtonType.default;
  //     }

  //     value = value.toLowerCase();
  //     return ButtonType[value as keyof typeof ButtonType] || ButtonType.default;
  //   },
  // })
  // public type: ButtonType;

  @query('.root') private buttonElement: HTMLElement;

  /**
   * Sets whether the button is disabled
   *
   * @type {boolean}
   * @memberof FluentButton
   */
  @property({ attribute: 'disabled' }) public disabled: boolean;

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

  /**
   * Invoked on each update to perform rendering tasks. This method must return
   * a lit-html TemplateResult. Setting properties inside this method will *not*
   * trigger the element to update.
   */
  protected render() {
    const className: any = {
      disabled: this.disabled,
      root: true,
      'icon-after': this.iconPosition === IconPosition.after,
      'icon-only': !!this.icon && !(this.text && this.text.length),
    };

    const content = [this.renderIcon(), this.renderText()];

    if (this.iconPosition === IconPosition.after) {
      content.reverse();
    }

    return html`
      <button class=${classMap(className)} ?disabled=${this.disabled}>
        ${content}
        <slot></slot>
      </button>
    `;
  }

  /**
   * Returns the icon element if defined
   *
   * @protected
   * @returns
   * @memberof FluentButton
   */
  protected renderIcon() {
    if (this.icon) {
      return html`
        <fluent-icon class="icon" name="${this.icon}"></fluent-icon>
      `;
    }

    return null;
  }

  /**
   * Returns the text element if defined
   *
   * @protected
   * @returns
   * @memberof FluentButton
   */
  protected renderText() {
    if (this.text && this.text !== '') {
      return html`
        <span class="text">${this.text}</span>
      `;
    }
  }
}
