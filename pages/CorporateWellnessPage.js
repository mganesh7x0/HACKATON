export class CorporateWellnessPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder("Name").first();
    this.orgInput = page.getByPlaceholder("Organization Name").first();
    this.phoneInput = page.getByPlaceholder("Contact Number").first();
    this.emailInput = page.locator('#officialEmailId').first();
    this.orgSizeSelect = page.locator('#organizationSize').first();
    this.interestSelect = page.locator('#interestedIn').first();
    this.scheduleButton=page.getByRole('button', { name: 'Schedule a demo' })
  }

  async goto() {
    try {
      await this.page.goto('https://www.practo.com/plus/corporate', { waitUntil: 'domcontentloaded' });

    } catch (error) {
      console.error('Error navigating to the page:');
    }
  }
 
  async fillInvalidDetails() {
    try {
      await this.nameInput.fill('');
      await this.orgInput.fill('FakeOrg');
      await this.phoneInput.fill('123');
      await this.emailInput.fill('invalid@');
    } catch (error) {
      console.error('Error filling invalid details:');
    }
  }

  async submitForm() {
    try {
      await this.scheduleButton.click();
    } catch (error) {
      console.error('Error submitting the form:');
    }
  }

  async fillValidDetails() {
    try {
      await this.nameInput.type('Kiran');
      await this.orgInput.type('KiranCorp Pvt Ltd');
      await this.emailInput.fill('Kiran@techcorp.com');
      await this.orgSizeSelect.click();
      await this.orgSizeSelect.selectOption({ label: '1001-5000' });
      await this.interestSelect.selectOption({ label: 'Taking a demo' });
      // await this.page.pause();
    } catch (error) {
      console.error('Error filling valid details:');
    }
  }
  async dropSelect() {
    await this.orgSizeSelect.selectOption({ label: '1001-5000' });
    await this.interestSelect.selectOption({ label: 'Referring someone' });
  }
 
  async getDropSelectValue() {
    const sizeValue = await this.orgSizeSelect.inputValue();
    const interestValue = await this.interestSelect.inputValue();
    return { sizeValue, interestValue };
  }
}
