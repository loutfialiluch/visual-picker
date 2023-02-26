import { LightningElement, api } from "lwc";

/**
 * @typedef {Object} Option
 * @property {string} label - Indicates the label of an option
 * @property {*} value - Indicates the value that an option represents
 * @property {string} icon - Indicates the icon of an option and should match the following regex: ^(utility|doctype|standard|custom|action):\w+$
 * @property {boolean} isDisabled - Indicates whether an option is disabled
 */

/**
 * @property {string} label - Indicates the label of the visual picker
 * @property {Option[]} options - Indicates the list of options that will be displayed by the visual picker
 * @property {boolean} multiple - Indicates whether multiple selections are allowed
 * @property {"small" | "medium" | "size"} size - Indicates the size of the options boxes, "medium" is the default value
 * @property {*[]} selectedItems
 */
export default class VisualPicker extends LightningElement {
  @api
  label;
  @api
  options;
  @api
  multiple;
  @api
  size = "medium";

  @api
  selectedItems = [];

  handleSelectionChange(event) {
    if (event.target.checked) {
      // eslint-disable-next-line @lwc/lwc/no-api-reassignments
      this.selectedItems = [...this.selectedItems, event.target.value];
    } else {
      // eslint-disable-next-line @lwc/lwc/no-api-reassignments
      this.selectedItems = this.selectedItems.filter((item) => item !== event.target.value);
    }
    this.dispatchEvent(
      new CustomEvent("selectionchange", {
        detail: {
          selectedItems: [...this.selectedItems]
        }
      })
    );
  }

  get optionBoxClass() {
    return `slds-visual-picker slds-visual-picker_${this.size}`;
  }
}
